import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { colors } from "../../../config/global";

const { width, height } = Dimensions.get("window");

export const sellProductStockCardStyles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: colors.white,
    // width: "90%",
    height: 100,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 10,
    flexDirection: "row",
  },
});
