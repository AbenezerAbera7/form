import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const ITRDetailedViewStyles = StyleSheet.create({
  background: {
    marginTop: height * 0.05,
  },
});
