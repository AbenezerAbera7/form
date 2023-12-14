import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { colors } from "../../../config/global";
const { width, height } = Dimensions.get("window");

export const groiStyles = StyleSheet.create({
  background: {
    marginTop: 8,
    height: 200,
    marginLeft: width * 0.03,
    marginRight: width * 0.03,
    // paddingTop: height * 0.16,
    borderRadius: 20,
    padding: 10,
    overflow: "hidden",
    backgroundColor: "white",
    width: width * 0.94,
    borderWidth: 1,
    borderColor: colors.primary,
  },
});
