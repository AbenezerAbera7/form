import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { colors } from "../../../config/global";
const { width, height } = Dimensions.get("window");

export const homeScreenStyles = StyleSheet.create({
  background: {
    height: height,
    backgroundColor: colors.background,
  },
});
