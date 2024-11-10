import "react-native-gesture-handler";
import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet, Text, Image } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await axios.put("https://mysnapchat.epidoc.eu/user", {
        email,
        password,
      });
      console.log(response.data);
      if (
        response &&
        response.status === 200 &&
        response.data &&
        response.data.data &&
        response.data.data.token
      ) {
        const token = response.data.data.token;
        await AsyncStorage.setItem("token", token);
        navigation.navigate("Welcome");
      } else {
        Alert.alert(
          "Erreur de connexion",
          response?.data?.data ?? "proutland 1"
        );
      }
    } catch (error) {
      Alert.alert(
        "Erreur de connexion",
        error.response?.data?.data ?? "proutland 2"
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

      <Image source={require("./assets/snaplogo.png")} style={styles.image} />

      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.text}>Don't have an account?</Text>
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
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
  },
  text: {
    marginTop: 10,
  },
  image: {
    position: "absolute",
    width: 210,
    height: 250,
    top: 50,
    left: 90,
  },
});

export default LoginScreen;
