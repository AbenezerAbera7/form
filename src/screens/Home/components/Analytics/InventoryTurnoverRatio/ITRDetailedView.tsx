import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { ITRDetailedViewStyles } from "../../../styles/ITRDetailedView";

const ITRDetailedView = (props: any) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  const item = props.route.params.item;
  return (
    <View style={ITRDetailedViewStyles.background}>
      <Text>{item.label}</Text>
    </View>
  );
};

export default ITRDetailedView;
