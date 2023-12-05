import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { colors } from "../../../../config/global";
const { width, height } = Dimensions.get("window");

export const OnboardingStyles = StyleSheet.create({
  background: {
    marginTop: height * 0.1,
    marginHorizontal: width * 0.03,
    alignItems: "center",
  },
  MainText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  formContainer: {
    marginTop: height * 0.05,
    // marginHorizontal: width * 0.1,
    width: width,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: height * 0.04,
    width: width * 0.5,
  },
  image: {
    height: height * 0.2,
    width: height * 0.2,
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
    width: width * 0.8,
    marginHorizontal: width * 0.1,
  },
  submitButtonContainer: {
    marginTop: height * 0.05,
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
