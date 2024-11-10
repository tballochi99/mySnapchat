import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "@expo/vector-icons/Feather";

function WelcomeScreen({ navigation }) {
  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.navigate("Login");
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>
        Want to share something with your friends ?
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Camera")}
      >
        <Feather
          name="camera"
          size={50}
          color="white"
          style={styles.buttonCamera}
        />
      </TouchableOpacity>
      <Text style={styles.OR}>OR</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Gallery")}
      >
        <Feather
          name="image"
          size={50}
          color="white"
          style={styles.buttonGallery}
        />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.leaveBTN]} onPress={handleLogout}>
        <Text style={styles.buttonText}>You really want to leave us😔?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faff94",
  },

  Text: {
    justifyContent: "center",
    position: "absolute",
    fontSize: 14,
    left: 55,
    top: 370,
  },

  buttonCamera: {
    color: "white",
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "black",
    padding: 10,
    position: "absolute",
    top: 420,
    left: 50,
  },

  OR: {
    justifyContent: "center",
    position: "absolute",
    left: 165,
    top: 435,
    fontSize: 36,
  },

  buttonGallery: {
    color: "black",
    backgroundColor: "#f8ff6b",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    position: "absolute",
    top: 420,
    right: 50,
  },
  leaveBTN: {
    position: "absolute",
    fontStyle: "italic",
    bottom: 10,
    left: 75,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    alignSelf: "stretch",
    alignItems: "center",
  },

  image: {
    position: "absolute",
    top: 250,
    left: 90,
  },
});

export default WelcomeScreen;
