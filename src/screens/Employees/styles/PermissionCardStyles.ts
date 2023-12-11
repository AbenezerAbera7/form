import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../config/global";
const { width, height } = Dimensions.get("window");
export const PermissionCardStyles = StyleSheet.create({
  background: {
    flexDirection: "row",
    width: "80%",
    marginLeft: 20,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    paddingBottom: 10,
    alignItems: "center",
  },
  text: {
    flex: 1,
  },
  button: {},
});
