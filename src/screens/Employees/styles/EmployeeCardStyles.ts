import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../config/global";
const { width, height } = Dimensions.get("window");
export const EmployeeCardStyles = StyleSheet.create({
  background: {
    flexDirection: "row",
    width: "95%",
    // backgroundColor: "white",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    // marginVertical: 10,
    alignSelf: "center",
    height: 75,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
  },
  icon: {
    marginRight: 20,
    color: colors.primary,
  },
});
