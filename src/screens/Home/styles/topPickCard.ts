import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { colors } from "../../../config/global";
const { width, height } = Dimensions.get("window");

export const topPickCardStyles = StyleSheet.create({
  background: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    alignContent: "center",
    alignItems: "center",
    marginTop: height * 0.006,
    borderRadius: 20,
  },
  image: {
    width: width * 0.15,
    height: height * 0.08,
    borderRadius: 20,
    margin: width * 0.03,
  },
  text: {},
  value: {
    // push to the right
    marginLeft: width * 0.03,
  },
});
