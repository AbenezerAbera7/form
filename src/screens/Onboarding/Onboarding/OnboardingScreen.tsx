import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { OnboardingStyles } from "./styles/OnboardingStyles";
import { UserContext } from "../../../context/UserContext";
import { Ionicons } from "@expo/vector-icons";
import GetLocationScreen from "./GetLocationScreen";
import { set } from "react-native-reanimated";
import { colors } from "../../../config/global";

const OnboardingScreen = (props: any) => {
  const navigation = useNavigation();
  const { user, setBusinessDetails } = useContext(UserContext);
  const name = user ? user.FirstName : "";
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [GetLocation, setGetLocation] = useState(false);
  const currencies = ["Birr", "Dollar", "Euro", "Yen", "Pound"];

  const InputFieldKeys: { [key: string]: string } = {
    BusinessName: "Business Name",
    BusinessType: "Business Type eg. Retail, Wholesale, etc.",
    PhoneNumber: "Phone Number",
  };

  const [values, setValues] = useState({
    BusinessName: "",
    BusinessType: "",
    PhoneNumber: "",
    Currency: "Birr",
  });
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: "none" },
    });

    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
    };
  }, [navigation]);

  const onChangeText = (text: string, key: string) => {
    setValues({ ...values, [key]: text });
  };

  const renderTextInput = (
    placeholder: string,
    value: string,
    onChangeText: any,
    isNumericInput: boolean,
    key: string
  ) => {
    return (
      <TextInput
        key={key}
        style={OnboardingStyles.textInput}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => onChangeText(text, key)}
        keyboardType={isNumericInput ? "phone-pad" : "default"}
      />
    );
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setBusinessDetails(values);
    setGetLocation(true);
    setIsLoading(false);
  };

  return GetLocation ? (
    <GetLocationScreen />
  ) : (
    <View style={OnboardingStyles.background}>
      <Text style={OnboardingStyles.MainText}>
        Let's get started, {name} 🚀
      </Text>

      <View style={OnboardingStyles.imageContainer}>
        {isImageSelected ? (
          <Image
            style={OnboardingStyles.image}
            source={require("../../../api/DevData/pictures/Elon.png")}
          />
        ) : (
          <Image
            style={OnboardingStyles.image}
            source={require("../../../api/DevData/pictures/Elon.png")}
          />
        )}
        {/* add image icon */}
        <TouchableOpacity style={OnboardingStyles.addImageIconContainer}>
          <Ionicons name="camera-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={OnboardingStyles.formContainer}>
          {Object.keys(InputFieldKeys).map((key) => {
            return renderTextInput(
              InputFieldKeys[key],
              values[key as keyof typeof values],
              onChangeText,
              key === "PhoneNumber",
              key
            );
          })}

          <View style={OnboardingStyles.submitButtonContainer}>
            {!isLoading ? (
              <TouchableOpacity
                style={OnboardingStyles.submitButton}
                onPress={() => {
                  handleSubmit();
                }}
              >
                <Text style={OnboardingStyles.submitButtonText}>Next</Text>
              </TouchableOpacity>
            ) : (
              <ActivityIndicator size="small" color={colors.primary} />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default OnboardingScreen;
