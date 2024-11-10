import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ImagePicker from "react-native-image-picker";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [snapDuration, setSnapDuration] = useState(10);
  const [isChoosingDuration, setIsChoosingDuration] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get("https://mysnapchat.epidoc.eu/user", {
          headers,
        });
        if (response.status === 200) {
          setUsers(response.data.data);
          fetchSnapDuration();
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const toggleUserSelection = (userId) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
    setSnapDuration(10);
  };

  const isUserSelected = (userId) => {
    return selectedUsers.includes(userId);
  };

  const handleUserPress = (userId) => {
    toggleUserSelection(userId);
  };

  const fetchSnapDuration = async () => {
    try {
      const response = await axios.get(
        "https://mysnapchat.epidoc.eu/docs/#/%2Fsnap/post_snap"
      );
      if (response.status === 200) {
        setSnapDuration(response.data.duration);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item: user }) => {
    const isSelected = isUserSelected(user._id);

    return (
      <TouchableOpacity onPress={() => handleUserPress(user._id)}>
        <View style={[styles.userItem, isSelected && styles.selectedUserItem]}>
          <Text
            style={[styles.username, isSelected && styles.selectedUsername]}
          >
            {user.username}
          </Text>
          {isSelected && (
            <View style={styles.checkIconContainer}>
              <View style={styles.checkCircle}>
                <Icon
                  name="check"
                  size={20}
                  color="white"
                  style={styles.checkIcon}
                />
              </View>
            </View>
          )}
          {isSelected && (
            <View style={styles.buttonContainer}>
              {isChoosingDuration ? (
                <View style={styles.durationButtonContainer}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((duration) => (
                    <TouchableOpacity
                      key={duration}
                      style={[
                        styles.durationButton,
                        duration === snapDuration &&
                          styles.selectedDurationButton,
                      ]}
                      onPress={() => setSnapDuration(duration)}
                    >
                      <Text style={styles.durationButtonText}>{duration}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.chooseDurationButton}
                  onPress={() => setIsChoosingDuration(true)}
                >
                  <Text style={styles.chooseDurationButtonText}>
                    Choose Duration
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const handleSend = async () => {
    console.log("Utilisateurs sélectionnés :");
    selectedUsers.forEach(async (userId) => {
      console.log(`Utilisateur ${userId} - Durée : ${snapDuration} secondes`);

      try {
        const token = await AsyncStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.post(
          "https://mysnapchat.epidoc.eu/snap",
          {
            to: userId,
            image: "image", // Remplacez par la chaîne Base64 complète de l'image
            duration: snapDuration,
          },
          { headers }
        );

        console.log(response.data); // Afficher la réponse de l'API dans la console
      } catch (error) {
        console.error(
          "Erreur lors de l'envoi de la durée à l'API :",
          error.response
        );
      }
    });
  };

  const selectImageAndEncodeToBase64 = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 360,
      maxHeight: 640,
    };
  
    ImagePicker.launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log("Sélection de l'image annulée");
      } else if (response.error) {
        console.log("Erreur lors de la sélection de l'image :", response.error);
      } else if (response.assets && response.assets.length > 0) {
        const base64Image = response.assets[0].base64;
        try {
          const token = await AsyncStorage.getItem("token");
          const headers = {
            Authorization: `Bearer ${token}`,
          };
  
          const response = await axios.post(
            "https://mysnapchat.epidoc.eu/snap",
            {
              to: userId,
              image: base64Image,
              duration: snapDuration,
            },
            { headers }
          );
  
          console.log(response.data); // Afficher la réponse de l'API dans la console
        } catch (error) {
          console.error(
            "Erreur lors de l'envoi de la durée à l'API :",
            error.response
          );
        }
      }
    });
  };
  

  const renderSendButton = () => {
    if (selectedUsers.length > 0) {
      return (
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(user) => user._id}
      />
      {renderSendButton()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: "80%",
    justifyContent: "center",
    alignContent: "center",
    marginLeft: "10%",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: "white",
    marginTop: "5%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  selectedUserItem: {
    backgroundColor: "#f8ff6b",
  },
  username: {
    color: "white",
    marginLeft: 10,
  },
  selectedUsername: {
    color: "black",
  },
  checkIconContainer: {
    marginLeft: "auto",
  },
  checkCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  checkIcon: {
    marginLeft: 1,
    color: "#f8ff6b",
  },
  buttonContainer: {
    flexDirection: "column",
    marginLeft: "auto",
    position: "absolute",
  },
  durationButtonContainer: {
    flexDirection: "column",
    marginTop: 5,
    left: 180,
  },
  durationButton: {
    backgroundColor: "white",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  selectedDurationButton: {
    backgroundColor: "#f8ff6b",
  },
  durationButtonText: {
    color: "black",
    fontSize: 16,
  },
  chooseDurationButton: {
    backgroundColor: "#f8ff6b",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    marginLeft: 10,
  },
  chooseDurationButtonText: {
    color: "black",
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#f8ff6b",
    width: "100%",
    height: "10%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginBottom: -35,
  },
  sendButtonText: {
    color: "black",
    fontSize: 26,
  },
});

export default UsersList;
