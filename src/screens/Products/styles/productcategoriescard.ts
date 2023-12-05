import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const productCategoriesCardStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 10,
    height: height * 0.15,
    width: width * 0.35,
  },
  image: {},
  text: {},
});
