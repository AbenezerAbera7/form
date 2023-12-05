import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../config/global";
const { width, height } = Dimensions.get("window");
export const settingsScreenStyles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background,
  },
  logoutText: {
    color: "white",
    alignSelf: "center",
  },
  logoutButton: {
    alignSelf: "center",
    backgroundColor: colors.complementary,
    width: "30%",
    height: 40,
    borderRadius: 10,
    // padding: 10,
    // marginTop: 20,
    justifyContent: "center",
    marginTop: 20,
  },
});
