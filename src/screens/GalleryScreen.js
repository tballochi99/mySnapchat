import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImageManipulator from "expo-image-manipulator";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

const GalleryScreen = () => {
  const [selectImage, setSelectImage] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const handleImagePicker = async () => {
    let options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    };

    try {
      const result = await ImagePicker.launchImageLibraryAsync(options);
      if (!result.cancelled) {
        const processedImage = await ImageManipulator.manipulateAsync(
          result.uri,
          [],
          { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
        );
        setSelectImage(processedImage.uri);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const navigation = useNavigation();

  const handleSend = () => {
    navigation.navigate("UsersList");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {selectImage !== "" ? (
        <Image
          style={{ flex: 1 }}
          resizeMode="contain"
          source={{ uri: selectImage }}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Feather name="image" size={50} color="black" />
        </View>
      )}

      {selectImage !== "" && (
        <TouchableOpacity
          onPress={handleSend}
          style={{
            position: "absolute",
            bottom: 34,
            right: 60,
            backgroundColor: "#f8ff6b",
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,

            padding: 10,
          }}
        >
          <Feather name="send" size={30} color="black" />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={handleImagePicker}
        style={{
          marginTop: 20,
          height: 50,
          width: "55%",
          backgroundColor: "#f8ff6b",
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 60,
        }}
      >
        <Text>Gallery</Text>
      </TouchableOpacity>

      <View>
        {users.map((user) => (
          <Text key={user.id}>{user.username}</Text>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default GalleryScreen;
