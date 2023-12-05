import React, { useEffect, useState, useCallback } from "react";
import { useAuthentication } from "./auth/useAuthentication";
import UserStack from "./navigation/UserStack";
import AuthStack from "./navigation/AuthStack";
import OnboardingScreen from "./screens/Onboarding/Onboarding/OnboardingScreen";
import { LogBox, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
LogBox.ignoreAllLogs();

SplashScreen.preventAutoHideAsync();

const Main = () => {
  const [fontsLoaded, fontError] = useFonts({
    HelveticaNeue: require("./assets/fonts/HelveticaNeueUltraLight.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);
  const user = useAuthentication();

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={{ height: "100%", width: "100%" }} onLayout={onLayoutRootView}>
      {user ? <UserStack /> : <AuthStack />}
    </View>
  );
};

export default Main;
