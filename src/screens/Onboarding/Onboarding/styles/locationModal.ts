import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { colors } from "../../../../config/global";
const { width, height } = Dimensions.get("window");

export const locationModalStyles = StyleSheet.create({
  formContainer: {
    marginTop: height * 0.05,
    marginHorizontal: width * 0.1,
    width: width * 0.8,
    height: "auto",
    minHeight: "40%",
    backgroundColor: "#efefef",
    borderRadius: 30,
    padding: 20,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 30,
    paddingLeft: 20,
    marginBottom: 10,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subText: {
    fontSize: 14,
  },
  submitButtonContainer: {
    marginTop: height * 0.01,
    alignItems: "center",
  },
  submitButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: width * 0.5,
    backgroundColor: colors.primary,
    borderRadius: 30,
  },
  submitButtonText: {
    color: "white",
  },
});
