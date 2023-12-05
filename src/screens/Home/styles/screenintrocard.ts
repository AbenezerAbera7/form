import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const screenIntroCardStyles = StyleSheet.create({
  background: {
    marginTop: "5%",
    marginHorizontal: "1%",
    borderRadius: 7,
    justifyContent: "center",
    height: height * 0.09,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});
