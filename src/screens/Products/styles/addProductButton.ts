import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { colors } from "../../../config/global";
const { width, height } = Dimensions.get("window");

export const addProductButtonStyles = StyleSheet.create({
  mainButton: {
    backgroundColor: colors.complementary,
    width: 60,
    height: 60,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    marginTop: 20,
    position: "absolute",
    right: 0,
    top: height * 0.65,
  },
});
