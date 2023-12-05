import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import React, { useState, useContext, useRef, useEffect } from "react";
import { welcomeStyles } from "./styles/welcomescreen";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/StackNavigatorParams";
import { StackNavigationProp } from "@react-navigation/stack";
import { Dimensions } from "react-native";
import { set } from "react-native-reanimated";
import SignUpScreen from "../SignUp/SignUpScreen";
import SignInScreen from "../SignIn/SignInScreen";
import { LoginContext } from "../../../context/LoginContext";
const { height, width } = Dimensions.get("window");
const WelcomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { renderSignup, setRenderSignup } = useContext(LoginContext);
  const [isLoginPressed, setIsLoginPressed] = useState(false);
  const [isSignupPressed, setIsSignupPressed] = useState(false);
  const [anyButtonPressed, setAnyButtonPressed] = useState(false);
  const marginTopAnimation = useRef(new Animated.Value(-height * 0.08)).current;
  const opacityAnimation = useRef(new Animated.Value(0.1)).current;

  useEffect(() => {
    if (renderSignup && anyButtonPressed) {
      handleSignupPress();
    } else if (anyButtonPressed) {
      handleLoginPress();
    }
  }, [renderSignup]);

  const handleLoginPress = () => {
    setRenderSignup(false);
    setIsLoginPressed(true);
    setAnyButtonPressed(true);
    Animated.parallel(
      [
        Animated.timing(marginTopAnimation, {
          toValue: -height * 0.4,
          duration: 700,
          useNativeDriver: false,
        }),

        Animated.timing(opacityAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
      ],
      { stopTogether: false }
    ).start();
  };

  const handleSignupPress = () => {
    setRenderSignup(true);
    setIsSignupPressed(true);
    setAnyButtonPressed(true);
    Animated.parallel(
      [
        Animated.timing(marginTopAnimation, {
          toValue: -height * 0.6,
          duration: 1000,
          useNativeDriver: false,
        }),

        Animated.timing(opacityAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
      ],
      { stopTogether: false }
    ).start();
  };

  const handleScreenPress = () => {
    // if (isLoginPressed || isSignupPressed) {
    Animated.parallel(
      [
        Animated.timing(marginTopAnimation, {
          toValue: -height * 0.08,
          duration: 700,
          useNativeDriver: false,
        }),

        Animated.timing(opacityAnimation, {
          toValue: 0.1,
          duration: 100,
          useNativeDriver: false,
        }),
      ],
      { stopTogether: false }
    ).start();
    setRenderSignup(false);
    setIsLoginPressed(false);
    setIsSignupPressed(false);
    setAnyButtonPressed(false);
    // }
  };

  return (
    <View style={welcomeStyles.container}>
      {/* Logo  */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          handleScreenPress();
        }}
      >
        <View style={welcomeStyles.logoContainer}>
          <Image
            style={welcomeStyles.logo}
            source={require("../../../api/DevData/pictures/Keeps.png")}
          />
        </View>
      </TouchableOpacity>

      <Animated.View
        style={[
          welcomeStyles.buttonsContainer,
          { marginTop: marginTopAnimation },
        ]}
      >
        {anyButtonPressed ? (
          !renderSignup ? (
            <Animated.View style={{ opacity: opacityAnimation }}>
              <SignInScreen />
            </Animated.View>
          ) : (
            <Animated.View style={{ opacity: opacityAnimation }}>
              <SignUpScreen />
            </Animated.View>
          )
        ) : (
          // Buttons
          <View>
            {/* Login Button */}
            {/* <Text style={welcomeStyles.welcomeText}>Welcome!</Text> */}
            <View style={welcomeStyles.loginButtonContainer}>
              <TouchableOpacity
                style={welcomeStyles.loginButton}
                onPress={() => {
                  handleLoginPress();
                }}
              >
                <Text style={welcomeStyles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </View>
            {/* Signup Button */}
            <View style={welcomeStyles.signupButtonContainer}>
              <TouchableOpacity
                style={welcomeStyles.signupButton}
                onPress={() => {
                  handleSignupPress();
                }}
              >
                <Text style={welcomeStyles.signupButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Animated.View>
    </View>
  );
};

export default WelcomeScreen;
