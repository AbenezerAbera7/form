import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { colors } from "../../../config/global";
const { width, height } = Dimensions.get("window");

export const transactionStyles = StyleSheet.create({
  background: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    paddingBottom: height * 0.01,
    marginHorizontal: width * 0.05,
    marginTop: 5,
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    width: width * 0.85,
  },
  name: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "left",
    fontSize: 15,
  },
  amount: {
    fontWeight: "bold",
    color: "white",
    textAlign: "right",
  },
  amountContainer: {
    backgroundColor: colors.complementary,
    borderRadius: 10,
    padding: 6,
    height: 30,
  },
});
