import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../config/global";
const { width, height } = Dimensions.get("window");
export const NewEmployeeStyles = StyleSheet.create({
  input: {
    fontSize: 16,
    width: "70%",
    backgroundColor: "white",
    height: 30,
    // marginLeft: 10,
    borderRadius: 10,
    paddingLeft: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
  },
  text: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
    marginTop: 20,
    marginBottom: 10,
  },
  addText: {
    color: "white",
    alignSelf: "center",
  },
  addButton: {
    alignSelf: "center",
    backgroundColor: colors.complementary,
    width: "30%",
    height: 40,
    borderRadius: 10,
    // padding: 10,
    // marginTop: 20,
    justifyContent: "center",
    marginVertical: 10,
  },
  error: {
    color: "red",
    alignSelf: "center",
    fontSize: 16,
    marginTop: 10,
    // fontWeight: "bold",
  },
});
