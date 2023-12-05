import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { colors } from "../../../../config/global";
const { width, height } = Dimensions.get("window");

export const signupScreenStyles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: colors.primary,
  },
  headerTextContainer: {
    marginTop: height * 0.05,
    alignItems: "center",
  },
  formContainer: {
    marginTop: height * 0.07,
    marginHorizontal: width * 0.1,
    width: width * 0.8,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: height * 0.02,
    width: width * 0.5,
  },
  image: {
    height: height * 0.2,
    width: height * 0.2,
    // resizeMode: "contain",
    borderRadius: height * 0.1,
  },
  addImageIconContainer: {
    position: "absolute",
    bottom: 10,
    right: 40,
    backgroundColor: "white",
    borderRadius: height * 0.1,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 30,
    paddingLeft: 20,
    marginBottom: 10,
    // width: width * 0.8,
  },
  signUpButtonContainer: {
    marginTop: height * 0.01,
  },
  signUpButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: width * 0.5,
    backgroundColor: colors.primary,
    borderRadius: 30,
  },
  signUpButtonText: {
    color: "white",
  },
  errorMessageContainer: {
    marginTop: height * 0.004,
  },
  errorMessage: {
    color: "red",
  },
});
