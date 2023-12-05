import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../../config/global";
const { width, height } = Dimensions.get("window");
export const welcomeStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: height,
    width: width,
  },
  scrollContainer: {
    flex: 1,
  },
  logo: {
    position: "absolute",
    top: 0,
    // borderWidth: 1,
    resizeMode: "contain",
    height: height * 0.8,
    width: width * 0.8,
    // marginTop: height * 0.1,
  },
  logoContainer: {
    // borderWidth: 1,
    height: height * 0.8,
    // width: width,
    alignItems: "center",
  },
  loginButtonContainer: {
    // width: width * 0.8,
    // borderWidth: 1,
    marginTop: height * 0.1,
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: width * 0.7,
    backgroundColor: colors.primary,
    borderRadius: 30,
  },
  loginButtonText: {
    color: "white",
  },

  signupButtonContainer: {},
  signupButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: width * 0.7,
    backgroundColor: "white",
    borderRadius: 30,
    marginTop: 7,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  signupButtonText: {
    color: colors.primary,
  },
  welcomeText: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: "grey",
    marginTop: height * 0.05,
  },
  buttonsContainer: {
    // position: "absolute",
    // bottom: height * 0.4,
    width: "100%",
    alignItems: "center",
    // marginTop: height * 0.05,
    borderTopEndRadius: 60,
    borderTopStartRadius: 60,
    flex: 1.5,
    // marginTop: -height * 0.1,
    backgroundColor: "white",
    marginBottom: -height * 0.1,
  },
});
