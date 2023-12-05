import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { settingsCardStyles } from "../styles/SettingCardStyle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
interface SettingCardProps {
  title: string;
  iconName: string;
  route?: string;
}

const SettingCard = ({ title, iconName, route }: SettingCardProps) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={settingsCardStyles.background}
      onPress={() => {
        if (route) {
          navigation.navigate(route as never);
        }
      }}
    >
      <View style={settingsCardStyles.titleContainer}>
        <Icon name={iconName} size={30} style={settingsCardStyles.icon} />
        <Text style={settingsCardStyles.title}>{title}</Text>
      </View>
      <Icon name="greater-than" size={17} color={"grey"} />
    </TouchableOpacity>
  );
};

export default SettingCard;
