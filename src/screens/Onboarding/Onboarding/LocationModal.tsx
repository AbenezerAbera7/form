import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import Modal from "react-native-modal";
import { LocationModalContext } from "../../../context/LocationContext";
import { locationModalStyles } from "./styles/locationModal";
import { UserContext } from "../../../context/UserContext";
import { addBusinessDetails } from "../../../api-endpoints/user-endpoint";
import { colors } from "../../../config/global";
const { height, width } = Dimensions.get("window");
const LocationModal = () => {
  const { locationModalVisible, setLocationModalVisible } =
    useContext(LocationModalContext);

  const [values, setValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { businessDetails, user, setBusinessDetails, setShowOnboarding } =
    useContext(UserContext);

  const InputFieldKeys: { [key: string]: string } = {
    BuildingName: "Building Name",
    floor: "Floor #",
    description: "Description",
  };
  const onChangeText = (text: string, key: string) => {
    setValues({ ...values, [key]: text });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setBusinessDetails({
      ...businessDetails,
      ...values,
      showOnboarding: false,
      balance: 0,
    });
    const result = await addBusinessDetails(
      businessDetails,
      user ? user.uid : ""
    );
    if (result) {
      setLocationModalVisible(false);
      setShowOnboarding(false);
    }
    setIsLoading(false);
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
        style={locationModalStyles.textInput}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => onChangeText(text, key)}
        keyboardType={isNumericInput ? "phone-pad" : "default"}
      />
    );
  };

  return (
    <Modal
      isVisible={locationModalVisible}
      style={{
        width: width * 0.8,
        marginLeft: "auto",
        marginRight: "auto",
        alignItems: "center",
        justifyContent: "center",
      }}
      onBackdropPress={() => {
        setLocationModalVisible(false);
        setIsLoading(false);
      }}
    >
      <View style={locationModalStyles.formContainer}>
        <Text style={locationModalStyles.formTitle}>
          Now, let's add some final touches
        </Text>
        {Object.keys(InputFieldKeys).map((key) => {
          return renderTextInput(
            InputFieldKeys[key],
            values[key as keyof typeof values],
            onChangeText,
            key === "PhoneNumber",
            key
          );
        })}
        <Text style={locationModalStyles.subText}>
          Adding these details ensures we're on the same page and helps
          customers find you easily
        </Text>
        <View style={locationModalStyles.submitButtonContainer}>
          {!isLoading ? (
            <TouchableOpacity
              style={locationModalStyles.submitButton}
              onPress={() => {
                handleSubmit();
              }}
            >
              <Text style={locationModalStyles.submitButtonText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <ActivityIndicator size="small" color={colors.primary} />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default LocationModal;
