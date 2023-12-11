import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { colors } from "../../../../config/global";
const { width, height } = Dimensions.get("window");
export const signInScreenStyles = StyleSheet.create({
  container: {},
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: colors.primary,
    marginTop: height * 0.03,
  },
  formContainer: {
    marginTop: height * 0.02,
    marginHorizontal: width * 0.1,
    width: width * 0.8,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 30,
    paddingLeft: 20,
    marginBottom: 10,
  },
  loginButtonContainer: {
    marginTop: height * 0.02,
    alignItems: "center",
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: width * 0.4,
    backgroundColor: colors.primary,
    borderRadius: 30,
  },
  loginButtonText: {
    color: "white",
  },
  forgotPasswordContainer: {
    marginTop: height * 0.01,
    alignItems: "flex-end",
  },
  forgotPasswordText: {
    color: colors.primary,
  },
  errorMessageContainer: {
    marginTop: height * 0.02,
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
  },
  alternateLoginText: {
    textAlign: "center",
    marginTop: height * 0.01,
  },
  alternateLoginIcons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: height * 0.02,
    // marginBottom: height * 0.02,
  },
  alternateLoginIconContainer: {
    marginHorizontal: width * 0.05,
  },
  alternateLoginIcon: {
    width: 40,
    height: 40,
    marginVertical: 20,
  },
  signUpText: {
    textAlign: "center",
    textDecorationLine: "underline",
    color: colors.primary,
    fontWeight: "bold",
    marginLeft: 5,
  },
  employeeLoginText: {
    textAlign: "center",
    textDecorationLine: "underline",
    color: colors.primary,
    fontWeight: "bold",
    marginLeft: 5,
  },
});
