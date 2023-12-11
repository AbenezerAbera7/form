import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  findNodeHandle,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/StackNavigatorParams";
import { StackNavigationProp } from "@react-navigation/stack";
import { signupScreenStyles } from "./styles/signupscreen";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { signInScreenStyles } from "../SignIn/styles/signinscreen";
import { LoginContext } from "../../../context/LoginContext";
import { handleCreateUser } from "../../../api-endpoints/user-endpoint";
import { UserContext } from "../../../context/UserContext";
import { colors } from "../../../config/global";
import { handleVerifySignupCode } from "../../../api-endpoints/employee-endpoint";

const { height, width } = Dimensions.get("window");
const auth = getAuth();

type AuthValues = {
  signUpCode: string;
  email: string;
  password: string;
  confirmPassword: string;
  error: string;
};

const InputFieldKeys: { [key: string]: string } = {
  signUpCode: "Sign Up Code (Shared by Admin)",
  email: "Email",
  password: "Password",
  confirmPassword: "Confirm Password",
};

const EmployeeSignUpScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { setRenderSignup, setRenderEmployeeSignup } = useContext(LoginContext);
  const { user, setUser } = useContext(UserContext);
  const [authValues, setAuthValues] = useState<AuthValues>({
    signUpCode: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
  });
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const verifySignUpCode = async () => {
    const signUpCode = authValues.signUpCode.split("_");
    if (signUpCode.length !== 2) {
      setAuthValues({
        ...authValues,
        error: "Please enter a valid sign up code",
      });
      return false;
    }
    const employeeId = signUpCode[0];
    const adminId = signUpCode[1];
    const account = await handleVerifySignupCode(employeeId, adminId);

    if (account) {
      return account;
    } else {
      setAuthValues({
        ...authValues,
        error: "Please enter a valid sign up code",
      });
      return false;
    }
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    // check if there are empty fields
    setAuthValues({
      ...authValues,
      error: "",
    });
    if (
      authValues.signUpCode === "" ||
      authValues.password === "" ||
      authValues.confirmPassword === "" ||
      authValues.email === ""
    ) {
      setIsLoading(false);
      setAuthValues({
        ...authValues,
        error: "Please ensure all fields are filled out",
      });
      return;
    }

    // check if password and confirm password match
    if (authValues.password !== authValues.confirmPassword) {
      setIsLoading(false);
      setAuthValues({
        ...authValues,
        error: "Passwords do not match",
      });
      return;
    }

    // check if sign up code is valid
    const account = await verifySignUpCode();
    if (!account) {
      setIsLoading(false);
      return;
    }

    // TODO: create a function to handle more validations

    // sign up user
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        authValues.email,
        authValues.password
      );

      // update user profile
      if (user) {
        const { uid } = user;
        // create user in database
        const newUser = {
          email: authValues.email,
          uid: uid,
          showOnboarding: false,
          isAdmin: false,
          adminId: authValues.signUpCode.split("_")[1],
          employeeId: authValues.signUpCode.split("_")[0],
          FirstName: account.FirstName,
          LastName: account.LastName,
          permissions: account.permissions,
        };
        await handleCreateUser(newUser, uid);
      }
    } catch (error: any) {
      setIsLoading(false);
      setAuthValues({
        ...authValues,
        error: error.message,
      });
    }
    setIsLoading(false);
  };

  const renderTextInput = (
    placeholder: string,
    value: string,
    onChangeText: any,
    secureTextEntry: boolean,
    key: string
  ) => {
    return (
      <TextInput
        key={key}
        style={signupScreenStyles.textInput}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => onChangeText(text, key)}
        secureTextEntry={secureTextEntry}
      />
    );
  };

  const onChangeText = (text: string, key: string) => {
    setAuthValues({
      ...authValues,
      [key]: text,
    });
  };

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={height * 0.1}
      enableOnAndroid={true}
    >
      <View style={signupScreenStyles.container}>
        {/* Create New Account Text */}
        <View style={signupScreenStyles.headerTextContainer}>
          <Text style={signupScreenStyles.headerText}>
            Begin Your Team Membership
          </Text>
        </View>
        {/* Add Image */}
        {/* <View style={signupScreenStyles.imageContainer}>
            {isImageSelected ? (
              <Image
                style={signupScreenStyles.image}
                source={require("../../../api/DevData/pictures/Elon.png")}
              />
            ) : (
              <Image
                style={signupScreenStyles.image}
                source={require("../../../api/DevData/pictures/Elon.png")}
              />
            )}
            <TouchableOpacity style={signupScreenStyles.addImageIconContainer}>
              <Ionicons name="camera-outline" size={24} color="black" />
            </TouchableOpacity>
          </View> */}
        {/* Input Fields */}
        <View style={signupScreenStyles.formContainer}>
          {Object.keys(InputFieldKeys).map((key) => {
            return renderTextInput(
              InputFieldKeys[key],
              authValues[key as keyof AuthValues],
              onChangeText,
              key === "password" || key === "confirmPassword",
              key
            );
          })}
        </View>
        {/* Sign Up Button */}
        <View style={signupScreenStyles.signUpButtonContainer}>
          {!isLoading ? (
            <TouchableOpacity
              style={signupScreenStyles.signUpButton}
              onPress={() => {
                handleSignUp();
              }}
            >
              <Text style={signupScreenStyles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>
          ) : (
            <ActivityIndicator size="small" color={colors.primary} />
          )}
        </View>
        {/* Error Message */}
        <View style={signupScreenStyles.errorMessageContainer}>
          <Text style={signupScreenStyles.errorMessage}>
            {authValues.error}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "baseline",
          }}
        >
          <Text style={signInScreenStyles.alternateLoginText}>
            Already a user?
          </Text>
          <TouchableOpacity
            onPress={() => {
              setRenderEmployeeSignup(false);
              setRenderSignup(false);
            }}
          >
            <Text style={signInScreenStyles.signUpText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default EmployeeSignUpScreen;
