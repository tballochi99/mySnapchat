import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "./src/screens/RegisterScreen";
import LoginScreen from "./src/screens/LoginScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import LogoutScreen from "./src/screens/LogoutScreen";
import CameraController from "./src/screens/CameraController";
import GalleryScreen from "./src/screens/GalleryScreen";
import UsersListScreen from "./src/screens/UsersListScreen";

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Logout" component={LogoutScreen} />
      <Stack.Screen name="Camera" component={CameraController} />
      <Stack.Screen name="Gallery" component={GalleryScreen} />
      <Stack.Screen name="UsersList" component={UsersListScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;
