import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { colors } from "../../../config/global";
const { width, height } = Dimensions.get("window");

export const transactionStyles = StyleSheet.create({
  background: {
    borderBottomWidth: 1,
    borderBottomColor: "#e8e5e5",
    paddingBottom: height * 0.01,
    marginHorizontal: width * 0.05,
    marginTop: 2,
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    width: width * 0.85,
  },
  name: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "left",
    fontSize: 13,
  },
  amount: {
    fontWeight: "bold",
    color: "white",
    textAlign: "right",
  },
  amountContainer: {
    backgroundColor: colors.complementary,
    borderRadius: 10,
    padding: 5,
    height: 25,
  },
});
