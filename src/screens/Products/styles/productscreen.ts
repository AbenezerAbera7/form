import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const productScreenStyles = StyleSheet.create({
  searchBaground: {
    backgroundColor: "#bcc0c4",
    height: height * 0.06,
    marginHorizontal: width * 0.01,
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  productCategories: {
    marginHorizontal: width * 0.01,
    marginTop: 20,
  },
});
