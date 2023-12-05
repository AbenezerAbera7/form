import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { fonts } from "../../../config/global";
const { width, height } = Dimensions.get("window");

export const homeNameCardStyles = StyleSheet.create({
  MainText: {
    fontWeight: "bold",
    fontSize: 20,
    // height: height * 0.08,
    textAlign: "left",
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
    // backgroundColor: "#47B298",
    // flex: 1,
    marginLeft: width * 0.03,
    color: "black",
    fontFamily: fonts.primary,
  },
  Subtext: {
    fontWeight: "bold",
    color: "grey",
    marginLeft: width * 0.03,
    // marginTop: height * 0.01,
    fontFamily: fonts.primary,
  },
  background: {
    // position: "absolute",
    // borderRadius: 20,
    marginTop: height * 0.07,
    // marginHorizontal: width * 0.02,
    // // color: "#47B298",
    // backgroundColor: "#47B298",
    width: "100%",
  },
  flex: {
    flexDirection: "row",
  },
  fab: {
    marginRight: width * 0.03,
  },
});
