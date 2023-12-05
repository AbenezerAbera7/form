import { View, Text } from "react-native";
import React from "react";
import { homeNameCardStyles } from "../styles/homenamecard";
import FAB from "./FAB";
const HomeNameCard = (props: { Name: string }) => {
  return (
    <View style={homeNameCardStyles.background}>
      <Text style={homeNameCardStyles.MainText}>Hey there, {props.Name}</Text>
      <Text style={homeNameCardStyles.Subtext}>👋 Check out what's new</Text>
    </View>
  );
};

export default HomeNameCard;
