import { View, Text, Animated, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { addEmployeeButtonStyles } from "../styles/addEmployeeButton";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../../context/UserContext";

const AddEmployeeButton = () => {
  const navigation = useNavigation<any>();
  const { setNewEmployeeModalVisible } = useContext(UserContext);
  return (
    <Animated.View style={addEmployeeButtonStyles.mainButton}>
      <TouchableOpacity
        onPress={() => {
          setNewEmployeeModalVisible(true);
        }}
      >
        <Ionicons name="add-outline" size={30} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default AddEmployeeButton;
