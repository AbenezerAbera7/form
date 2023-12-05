import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { colors } from "../../../config/global";
const { width, height } = Dimensions.get("window");

export const contactScreenStyles = StyleSheet.create({
  searchBackground: {
    height: 40,
    borderRadius: 8,
    flexDirection: "row",
    backgroundColor: "white",
    marginHorizontal: 20,
    // marginBottom: 10,
    flex: 1,
    shadowOpacity: 0.2,
    elevation: 20,
    shadowRadius: 8,
    alignItems: "center",
    borderColor: colors.primary,
    borderWidth: 0.7,
  },

  contactList: {
    marginHorizontal: width * 0.01,
    marginBottom: height * 0.2,
  },
  addContactButton: {
    alignItems: "center",
    justifyContent: "center",
    height: width * 0.1,
    width: width * 0.3,
    borderRadius: 10,
    backgroundColor: "#000",
    marginTop: 20,
  },
  addContactText: {
    fontSize: 16,
    fontWeight: "900",
    fontFamily: "System",
    color: "white",
    alignSelf: "center",
  },
  background: {
    width: width,
    height: height,
    backgroundColor: colors.background,
  },
});
