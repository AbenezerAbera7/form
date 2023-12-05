import { View, Text } from "react-native";
import React from "react";
import { screenIntroCardStyles } from "../screens/Home/styles/screenintrocard";

// takes in title and color as props
const ScreenIntroCard = (props: { title: string; color: string }) => {
  return (
    <View
      style={{
        ...screenIntroCardStyles.background,
        backgroundColor: props.color,
      }}
    >
      <Text style={screenIntroCardStyles.text}>{props.title}</Text>
    </View>
  );
};

export default ScreenIntroCard;
