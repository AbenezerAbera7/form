import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { colors } from "../../../config/global";

const { width, height } = Dimensions.get("window");
export const performanceCardStyles = StyleSheet.create({
  background: {
    marginTop: height * 0.03,
    height: 300,
    // marginHorizontal: width * 0.03,
    marginLeft: width * 0.03,
    marginRight: width * 0.03,
    // paddingTop: height * 0.16,
    borderRadius: 20,
    padding: 10,
    // justifyContent: "center",
    overflow: "hidden",
    backgroundColor: colors.white,
    width: width * 0.94,
    borderColor: colors.white,
    // shadowOpacity: 0.4,
    // shadowRadius: 8,
    // elevation: 20,
  },
  tooltip: {
    // backgroundColor: "#007EE5",
    // borderRadius: 20,
    // padding: 10,
    // // marginBottom: height * 0.05,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
