import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { colors } from "../../../config/global";

const { width, height } = Dimensions.get("window");
export const performanceCardStyles = StyleSheet.create({
  background: {
    marginTop: 8,
    // height: 200,
    // marginHorizontal: width * 0.03,
    marginLeft: width * 0.03,
    marginRight: width * 0.03,
    // paddingTop: height * 0.16,
    borderRadius: 20,
    // padding: 10,
    // justifyContent: "center",
    overflow: "scroll",

    backgroundColor: colors.white,
    width: width * 0.94,
    borderWidth: 1,
    borderColor: colors.primary,
    // shadowOpacity: 1,
    // shadowRadius: 15,
    // elevation: 20,
  },
  tooltip: {
    backgroundColor: "#007EE5",
    borderRadius: 20,
    padding: 10,
    // marginBottom: height * 0.05,
    alignItems: "center",
    justifyContent: "center",
  },
});
