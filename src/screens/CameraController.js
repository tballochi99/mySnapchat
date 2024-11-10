import React, { useState } from "react";
import { CameraType } from "expo-camera";
import CameraScreen from "./CameraScreen";

const WelcomeScreen = () => {
  const [flashMode, setFlashMode] = useState("off");
  const [type, setType] = useState(CameraType.back);

  const switchFlashMode = () => {
    setFlashMode(flashMode === "off" ? "on" : "off");
  };

  const switchType = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };
  return <CameraScreen />;
};

export default WelcomeScreen;
