import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { colors } from "../../../config/global";

const { width, height } = Dimensions.get("window");

export const actionsStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    paddingLeft: 20,
  },
  bottomSheetTitle: {
    fontSize: 24,
    fontWeight: "500",
  },
});
