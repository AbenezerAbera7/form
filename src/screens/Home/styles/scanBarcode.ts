import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
export const scanBarcodeStyles = StyleSheet.create({
  background: {},
  camera: {
    height: height,
    width: width,
  },
  cancel: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
});
