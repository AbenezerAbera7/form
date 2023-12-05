import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { colors } from "../../../config/global";

const { width, height } = Dimensions.get("window");

export const sellProductStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "85%",
    backgroundColor: "white",
    alignItems: "center",
    alignSelf: "center",
    padding: 5,
    borderRadius: 10,
    marginVertical: 10,
  },
  searchIcon: {
    marginRight: 10,
    color: colors.primary,
    paddingLeft: 10,
  },
  amountInput: {
    fontSize: 16,
    width: "70%",
    backgroundColor: "white",
    height: 30,
    // marginLeft: 10,
    borderRadius: 10,
    paddingLeft: 10,
  },
  amountText: {
    marginRight: 10,
  },
  paymentMethodTitle: {
    marginTop: 20,
    marginLeft: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
  customerInput: {
    fontSize: 16,
    width: "70%",
    backgroundColor: "white",
    height: 30,
    // marginLeft: 10,
    borderRadius: 10,
    paddingLeft: 10,
  },
  submitButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: width * 0.5,
    backgroundColor: colors.primary,
    borderRadius: 30,
    marginTop: 20,
    alignSelf: "center",
  },
  submitButtonText: {
    color: "white",
  },
});
