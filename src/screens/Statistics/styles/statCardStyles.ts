import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../config/global";
const { width, height } = Dimensions.get("window");
export const statCardStyles = StyleSheet.create({
  background: {
    flexDirection: "row",
    width: "95%",
    backgroundColor: "white",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: "center",
    shadowOpacity: 0.2,
    elevation: 10,
    shadowRadius: 6,
    // shadowColor: colors.primary,
  },
  icon: { marginRight: 20 },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
  amount: {
    fontSize: 24,
    marginTop: 5,
  },
});
