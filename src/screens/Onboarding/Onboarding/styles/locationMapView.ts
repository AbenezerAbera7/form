import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { colors } from "../../../../config/global";
const { width, height } = Dimensions.get("window");

export const locationMapViewStyles = StyleSheet.create({
  mapView: {
    flex: 1,
  },
  background: {
    height: height,
    width: width,
  },
  searchContainer: {
    position: "absolute",
    top: height * 0.08,
    left: 20,
    right: 20,
    zIndex: 1,
  },
  searchBar: {
    backgroundColor: "#cecece",
    borderRadius: 20,
    // height: 50,
    paddingLeft: 20,
  },

  confirmButtonContainer: {
    position: "absolute",
    bottom: height * 0.1,
    left: width * 0.15,
  },
  confirmButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: width * 0.7,
    backgroundColor: colors.primary,
    borderRadius: 30,
  },
  confirmButtonText: {
    color: "white",
  },
});
