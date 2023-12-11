import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { EmployeeCardStyles } from "../styles/EmployeeCardStyles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
interface EmployeeCardProps {
  FirstName: string;
  LastName: string;
  phone: string;
  id: string;
  permissions: string[];
}

const EmployeeCard = ({
  FirstName,
  LastName,
  phone,
  id,
  permissions,
}: EmployeeCardProps) => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      style={EmployeeCardStyles.background}
      onPress={() => {
        navigation.navigate("EmployeeDetails", {
          FirstName: FirstName,
          LastName: LastName,
          phone: phone,
          id: id,
          permissions: permissions,
        });
      }}
    >
      <View style={EmployeeCardStyles.titleContainer}>
        <Icon name={"account"} size={30} style={EmployeeCardStyles.icon} />
        <Text style={EmployeeCardStyles.title}>
          {FirstName} {LastName}
        </Text>
      </View>
      <Icon name="greater-than" size={17} color={"grey"} />
    </TouchableOpacity>
  );
};

export default EmployeeCard;
