import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// Screens
import WelcomeScreen from "../screens/Onboarding/Welcome/WelcomeScreen";
import SignUpScreen from "../screens/Onboarding/SignUp/SignUpScreen";
import SignInScreen from "../screens/Onboarding/SignIn/SignInScreen";
import { LoginProvider } from "../context/LoginContext";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <NavigationContainer>
      <LoginProvider>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
        </Stack.Navigator>
      </LoginProvider>
    </NavigationContainer>
  );
};

export default AuthStack;
