import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { colors, fonts } from "../../../config/global";
const { width, height } = Dimensions.get("window");

export const transactionsCardStyles = StyleSheet.create({
  background: {
    marginTop: height * 0.03,
    marginHorizontal: width * 0.03,
    backgroundColor: "white",
    borderRadius: 20,
    maxHeight: height * 0.4,
    minHeight: height * 0.2,
    marginBottom: height * 0.1,
  },
  title: {
    textAlign: "center",
    marginTop: height * 0.01,
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: fonts.primary,
    color: colors.primary,
  },
  button: {
    backgroundColor: colors.black,
    borderRadius: 10,
    padding: 10,
    marginBottom: height * 0.02,
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.4,
    alignSelf: "center",
    marginTop: height * 0.02,
  },
  buttonText: {
    color: "white",
  },
});
