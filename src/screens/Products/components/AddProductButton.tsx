import { View, Text, Animated, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { addProductButtonStyles } from "../styles/addProductButton";

const AddProductButton = (props: any) => {
  const navigation = useNavigation<any>();
  return (
    <Animated.View style={addProductButtonStyles.mainButton}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("New-Product");
        }}
      >
        <Ionicons name="add-outline" size={30} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default AddProductButton;
