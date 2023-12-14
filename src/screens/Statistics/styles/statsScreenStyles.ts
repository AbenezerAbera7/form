import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../config/global";
const { width, height } = Dimensions.get("window");
export const statsScreenStyles = StyleSheet.create({
  background: {
    height: height,
    width: width,
    backgroundColor: colors.white,
    paddingTop: 20,
  },
  statsContainer: {
    width: width,
    height: height * 0.78,
    marginBottom: 60,
  },
});
