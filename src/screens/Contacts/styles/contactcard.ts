import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const contactCardStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: width * 0.009,
    height: height * 0.1,
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#bcc0c4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  companyName: {
    color: "grey",
    fontSize: 13,
  },
  name: {
    fontWeight: "bold",
    fontSize: 15,
  },
});
