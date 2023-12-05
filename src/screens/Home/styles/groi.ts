import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const groiStyles = StyleSheet.create({
  background: {
    marginTop: height * 0.03,
    // height: height,
    marginLeft: width * 0.03,
    marginRight: width * 0.03,
    // paddingTop: height * 0.16,
    borderRadius: 20,
    padding: 10,
    overflow: "hidden",
    backgroundColor: "white",
    width: width * 0.94,
  },
});
