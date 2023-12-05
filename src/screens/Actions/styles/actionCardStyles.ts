import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { colors } from "../../../config/global";

const { width, height } = Dimensions.get("window");

export const actionCardStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
  },
  title: {
    fontSize: 16,
    // fontWeight: "500",
  },
  IconContainer: {
    width: 45,
    height: 45,
    borderRadius: 30,
    backgroundColor: "#eaeaea",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  optionsContainer: {
    paddingHorizontal: 20,
    marginLeft: 45,
  },
  optionText: {},
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
});
