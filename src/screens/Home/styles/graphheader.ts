import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { colors, fonts } from "../../../config/global";
const { width, height } = Dimensions.get("window");

export const graphHeaderStyles = StyleSheet.create({
  MainText: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontFamily: fonts.primary,
    color: colors.complementary,
  },
  background: {
    flexDirection: "row",
    marginBottom: height * 0.02,
  },
  text: {
    fontWeight: "bold",
  },
});
