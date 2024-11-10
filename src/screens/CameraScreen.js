import React, { useEffect, useState, useRef } from "react";
import {
  Alert,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import {
  Camera,
  CameraType,
  requestCameraPermissionsAsync,
  requestMicrophonePermissionsAsync,
  getCameraPermissionsAsync,
  getMicrophonePermissionsAsync,
} from "expo-camera";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

const CameraScreen = () => {
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState("off");
  const [pictureUri, setPictureUri] = useState("");
  const [sendButtonVisible, setSendButtonVisible] = useState(false);
  const cameraRef = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    await requestCameraPermissionsAsync();
    await requestMicrophonePermissionsAsync();
  };

  const getPermissions = async () => {
    const cameraPermission = await getCameraPermissionsAsync();
    const microphonePermission = await getMicrophonePermissionsAsync();

    return cameraPermission.granted && microphonePermission.granted;
  };

  const switchFlashMode = () => {
    setFlashMode(flashMode === "off" ? "on" : "off");
  };

  const switchType = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };

  const takePicture = async () => {
    const { uri, width, height } = await cameraRef?.current.takePictureAsync();
    setPictureUri(uri);
    setSendButtonVisible(true);
  };

  const handleSend = () => {
    navigation.navigate("UsersList"); 
  };

  if (!getPermissions) {
    return Alert.alert("Echec Required", [{ text: "Ok chien" }]);
  }

  return (
    <View style={styles.container}>
      {!pictureUri ? (
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={type}
          flashMode={flashMode}
        />
      ) : (
        <Image style={styles.picture} source={{ uri: pictureUri }} />
      )}
      {!pictureUri && (
        <View style={styles.controlsContainer}>
          <Feather name="refresh-ccw" size={40} onPress={switchType} />
          <TouchableOpacity
            style={styles.takePictureButton}
            onPress={takePicture}
          />
          <Feather
            name={flashMode === "off" ? "zap-off" : "zap"}
            size={40}
            onPress={switchFlashMode}
          />
        </View>
      )}
      {pictureUri && sendButtonVisible && (
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Feather name="send" size={40} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  picture: {
    flex: 1,
    resizeMode: "cover",
  },
  controlsContainer: {
    backgroundColor: "#f8ff6b",
    alignItems: "center",
    justifyContent: "space-evenly",
    margin: "auto",
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
  },
  takePictureButton: {
    backgroundColor: "white",
    width: 80,
    height: 80,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
  },
  sendButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#f8ff6b",
    borderRadius: 20,
    padding: 10,
  },
});

export default CameraScreen;
