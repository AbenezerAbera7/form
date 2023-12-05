import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { commonStyles } from "../../styles/common";

const InventoryScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  return (
    <View style={commonStyles.exampleCenter}>
      <Text>InventoryScreen</Text>
    </View>
  );
};

export default InventoryScreen;
