import "react-native-gesture-handler";
import React, { useContext, useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";

const API_URL = "https://mysnapchat.epidoc.eu/user";

const Stack = createStackNavigator();

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigation = useNavigation();

  const handleRegister = () => {
    axios
      .post(API_URL, {
        username,
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.status == 200) {
          Alert.alert("Super !", "Enregistrement réussi");
        } else {
          Alert.alert(
            "Erreur de connexion",
            response?.data?.data ?? "proutland 1"
          );
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert(
          "Erreur de connexion",
          error.response?.data?.data ?? "proutland 1"
        );
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require("./assets/snaplogo.png")} style={styles.image} />

      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />

      <Text style={styles.text}>Already have an account?</Text>
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8ff6b",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    color: "white",
  },
  image: {
    position: "absolute",
    width: 210,
    height: 250,
    top: 40,
    left: 90,
  },
});

export default RegisterScreen;
