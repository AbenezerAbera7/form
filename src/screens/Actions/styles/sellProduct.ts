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
    marginTop: 10,
    marginBottom: 5,
    height: 40,
    borderWidth: 1,
    borderColor: colors.primary,
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
    flex: 1,
  },
  submitButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: width * 0.5,
    backgroundColor: colors.complementary,
    borderRadius: 30,
    marginTop: 20,
    alignSelf: "center",
    marginBottom: 50,
  },
  submitButtonText: {
    color: "white",
  },
  searchResultContainer: {
    width: "100%",
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 10,
    padding: 10,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },

  searchResultName: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
  },
  searchResultBarcode: {
    fontSize: 14,
    color: colors.primary,
  },
});
