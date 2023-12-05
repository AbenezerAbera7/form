import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { colors } from "../../../../config/global";
const { width, height } = Dimensions.get("window");

export const getLocationStyles = StyleSheet.create({
  background: {
    height: height,
    width: width,
  },
  mapView: {
    flex: 1,
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
