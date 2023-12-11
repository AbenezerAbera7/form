import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../config/global";
const { width, height } = Dimensions.get("window");
export const EmployeesScreenStyles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
