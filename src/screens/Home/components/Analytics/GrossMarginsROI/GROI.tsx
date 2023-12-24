import { View, Text } from "react-native";
import React from "react";
import { LineChart } from "react-native-gifted-charts";
import GraphHeader from "../../GraphHeader";
import { groiStyles } from "../../../styles/groi";
import TopPicksCard from "../../TopPicksCard";
import { colors } from "../../../../../config/global";

// Gross Margins Return on Investment

const GROI = () => {
  var shoeNames = [
    "Nike Air Force 1",
    "Nike Air Max",
    "Nike Blazer",
    "Nike Air Max 270",
    "Nike Air Max 90",
    "Nike Air Max 95",
    "Nike Huarache",
    "Nike React",
  ];
  const data1: any = [
    { value: 0 },
    { value: 2 },
    { value: 18 },
    { value: 4 },
    { value: 36 },
    { value: 6 },
    { value: 54 },
    { value: 85 },
  ];
  const data2 = [
    { value: 0 },
    { value: 10 },
    { value: 9 },
    { value: 20 },
    { value: 18 },
    { value: 30 },
    { value: 27 },
    { value: 42 },
  ];
  return (
    <View style={groiStyles.background}>
      <GraphHeader title="Gross Margins Return on Investment" />
      <LineChart
        data={data1}
        data2={data2}
        hideYAxisText
        hideAxesAndRules
        // focusEnabled
        // showDataPointOnFocus
        curved
        dataPointsColor1={colors.complementary}
        dataPointsColor2={colors.primary}
        color1={colors.complementary}
        color2={colors.primary}
        areaChart1
        areaChart2
        animateTogether
        // isAnimated
        animateOnDataChange
        animationDuration={1000}
        startFillColor1={colors.complementary}
        startFillColor2={colors.primary}
        endFillColor1={colors.complementary}
        endFillColor2={colors.primary}
        startOpacity1={1}
        startOpacity2={1}
        endOpacity1={0}
        endOpacity2={0}
        disableScroll
      />
    </View>
  );
};

export default GROI;
