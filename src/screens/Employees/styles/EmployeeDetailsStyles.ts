import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../config/global";
const { width, height } = Dimensions.get("window");

export const EmployeeDetailsStyles = StyleSheet.create({
  background: {
    backgroundColor: colors.complementary,
    height: height,
    width: width,
  },
  contactContainer: {
    width: width,
    height: height * 0.8,
    // minHeight: height * 0.8,
    backgroundColor: colors.background,
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
    backgroundColor: colors.complementary,
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
  confirmText: {
    color: "white",
    alignSelf: "center",
  },
  confirmButton: {
    alignSelf: "center",
    backgroundColor: colors.complementary,
    width: "30%",
    height: 40,
    borderRadius: 10,
    // padding: 10,
    // marginTop: 20,
    justifyContent: "center",
    marginTop: 20,
  },
});
