import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../config/global";

const Notifications = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Notifications",
      headerBackTitle: "Home",
      headerStyle: {
        backgroundColor: colors.background,
      },
    });
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    ></View>
  );
};

export default Notifications;
