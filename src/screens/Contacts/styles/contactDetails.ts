import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { colors } from "../../../config/global";
const { width, height } = Dimensions.get("window");

export const contactDetailStyles = StyleSheet.create({
  background: {
    backgroundColor: colors.primary,
    height: height,
    width: width,
  },
  contactContainer: {
    width: width,
    height: height * 0.7,
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    borderRadius: 40,
  },
  backButton: {},
  header: {
    flexDirection: "row",
    marginTop: 60,
    marginLeft: 20,
    alignItems: "center",
  },
  editButton: {
    position: "absolute",
    right: 20,
  },
  editButtonText: {
    fontSize: 16,
    color: "white",
  },
  imageContainer: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.25,
    backgroundColor: colors.primary,
    alignSelf: "center",
    marginTop: -width * 0.25,
  },
  image: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.25,
    alignSelf: "center",
  },
  nameText: {
    fontSize: 20,
    // fontWeight: "bold",
    // alignSelf: "center",
  },
  nameContainer: {
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  makeContactContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  makeContactButton: {
    marginHorizontal: 30,
    alignItems: "center",
  },
  makeContactText: {
    fontSize: 16,
    color: colors.primary,
  },
  details: {
    marginTop: 30,
  },
});
