import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useContext, useState } from "react";
import { signInScreenStyles } from "./styles/signinscreen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { LoginContext } from "../../../context/LoginContext";
import { colors } from "../../../config/global";
const { height, width } = Dimensions.get("window");
const InputFieldList = ["Email", "Password"];

const auth = getAuth();

const SignInScreen = () => {
  const { setRenderSignup, isLoading, setIsLoading } = useContext(LoginContext);
  const [inputValues, setInputValues] = useState({
    Email: "",
    Password: "",
    error: "",
  });

  const handleSignIn = async () => {
    setIsLoading(true);
    setInputValues({
      ...inputValues,
      error: "",
    });
    if (inputValues.Email === "" || inputValues.Password === "") {
      setInputValues({
        ...inputValues,
        error: "Please fill in all fields",
      });
      setIsLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(
        auth,
        inputValues.Email,
        inputValues.Password
      );
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      setInputValues({
        ...inputValues,
        error: error.message,
      });
    }
  };

  const renderInputFields = (
    inputFieldList: string[],
    inputValues: { [key: string]: string }
  ) => {
    return inputFieldList.map((inputField) => {
      return (
        <TextInput
          key={inputField}
          placeholder={inputField}
          style={signInScreenStyles.textInput}
          onChangeText={(text) => {
            onChangeText(text, inputField);
          }}
          value={inputValues[inputField]}
          secureTextEntry={inputField === "Password" ? true : false}
        />
      );
    });
  };

  const onChangeText = (text: string, key: string) => {
    setInputValues({
      ...inputValues,
      [key]: text,
    });
  };
  return (
    <KeyboardAwareScrollView
      extraScrollHeight={height * 0.1}
      enableOnAndroid={true}
      style={signInScreenStyles.container}
    >
      <Text style={signInScreenStyles.headerText}>Welcome Back</Text>

      {/*Input Form  */}
      <View style={signInScreenStyles.formContainer}>
        {renderInputFields(InputFieldList, inputValues)}
        {/* Forgot Password */}
        <View style={signInScreenStyles.forgotPasswordContainer}>
          <Text style={signInScreenStyles.forgotPasswordText}>
            Forgot password?
          </Text>
        </View>
      </View>

      {/*Sign In Button  */}
      <View style={signInScreenStyles.loginButtonContainer}>
        {!isLoading ? (
          <TouchableOpacity
            style={signInScreenStyles.loginButton}
            onPress={() => {
              handleSignIn();
            }}
          >
            <Text style={signInScreenStyles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        ) : (
          <ActivityIndicator size="small" color={colors.primary} />
        )}
      </View>

      {/* Alternate Login Methods */}
      <View>
        <View>
          <Text style={signInScreenStyles.alternateLoginText}>
            Or login with
          </Text>
        </View>
        <View style={signInScreenStyles.alternateLoginIcons}>
          <TouchableOpacity
            style={signInScreenStyles.alternateLoginIconContainer}
          >
            <Image
              style={signInScreenStyles.alternateLoginIcon}
              source={require("../../../assets/images/google.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={signInScreenStyles.alternateLoginIconContainer}
          >
            <Image
              style={signInScreenStyles.alternateLoginIcon}
              source={require("../../../assets/images/facebook.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={signInScreenStyles.alternateLoginIconContainer}
          >
            <Image
              style={signInScreenStyles.alternateLoginIcon}
              source={require("../../../assets/images/twitter.png")}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "baseline",
          }}
        >
          <Text style={signInScreenStyles.alternateLoginText}>
            Need an account?
          </Text>
          <TouchableOpacity
            onPress={() => {
              setRenderSignup(true);
            }}
          >
            <Text style={signInScreenStyles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Error Message */}
      <View style={signInScreenStyles.errorMessageContainer}>
        <Text style={signInScreenStyles.errorMessage}>{inputValues.error}</Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignInScreen;
