import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../config/global";
import { statCardStyles } from "../styles/statCardStyles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const StatCard = (props: {
  title: string;
  amount: string;
  currency: string;
  iconName: string;
}) => {
  type materialIconName = keyof typeof Ionicons.glyphMap;

  return (
    <TouchableOpacity style={statCardStyles.background}>
      <View style={{ flex: 1 }}>
        <Text style={statCardStyles.title}>{props.title}</Text>
        <Text style={statCardStyles.amount}>
          {props.amount} {props.currency}
        </Text>
      </View>
      <Icon
        name={props.iconName as materialIconName}
        size={35}
        color={colors.primary}
        style={statCardStyles.icon}
      />
    </TouchableOpacity>
  );
};

export default StatCard;
