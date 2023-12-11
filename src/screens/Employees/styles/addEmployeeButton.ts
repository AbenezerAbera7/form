import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { colors } from "../../../config/global";
const { width, height } = Dimensions.get("window");

export const addEmployeeButtonStyles = StyleSheet.create({
  mainButton: {
    backgroundColor: colors.complementary,
    width: 60,
    height: 60,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 20,
    top: height * 0.68,
  },
});
