import { View, Text, Animated, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { addContactButtonStyles } from "../styles/addContactButton";
import { useNavigation } from "@react-navigation/native";

const AddContactButton = (props: { contactType: string }) => {
  const navigation = useNavigation<any>();
  return (
    <Animated.View style={addContactButtonStyles.mainButton}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("New-Contact", {
            contactType: props.contactType,
          });
        }}
      >
        <Ionicons name="add-outline" size={30} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default AddContactButton;
