import { View, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { performanceCardStyles } from "../../../styles/ITR";
import { LineChart, BarChart } from "react-native-gifted-charts";
import GraphHeader from "../../GraphHeader";
import TopPicksCard from "../../TopPicksCard";
import { topPickCardStyles } from "../../../styles/topPickCard";
import { colors } from "../../../../../config/global";

// Inventory Turnover Ratio
const ITR = (props: any) => {
  const navigation = useNavigation();
  var shoeNames = [
    "Nike Air Force 1",
    "Nike Air Max",
    "Nike Blazer",
    "Nike Air Max 270",
    "Nike Air Max 90",
    "Nike Air Max 95",
    "Nike Blazer",
    // "Nike Air Max 270",
    // "Nike Air Max 90",
    // "Nike Air Max 95",
  ];
  const data1: any = [
    { value: 0 },
    { value: 0.2 },
    { value: 0.18 },
    { value: 0.4 },
    { value: 0.36 },
    { value: 0.6 },
    // { value: 0.18 },
    // { value: 0.4 },
    // { value: 0.36 },
    // { value: 0.6 },
  ];

  for (var i = 0; i < data1.length; i++) {
    const value = data1[i].value;
    data1[i] = {
      ...data1[i],
      label: shoeNames[i],
      topLabelComponent: () => {
        <Text style={{ color: "#0B7C4E", fontSize: 18 }}>{value}</Text>;
      },
      sideColor: colors.complementary,
      topColor: colors.complementary,
    };
  }

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
    <View
      style={{
        ...performanceCardStyles.background,
      }}
    >
      {/* Header */}
      <GraphHeader title="Inventory Turnover Ratio" />
      {/* Graph */}

      <BarChart
        data={data1}
        frontColor={colors.complementary}
        hideYAxisText
        showLine
        maxValue={1}
        // isThreeD
        side={"right"}
        lineBehindBars
        dashWidth={0}
        onPress={(value: any) => {
          props.navigation.navigate("ITRDetailedView", { item: value });
        }}
        renderTooltip={(value: any) => {
          return (
            <View style={performanceCardStyles.tooltip}>
              <Text style={{ fontSize: 18 }}>{value.label}</Text>
              <Text style={{ marginBottom: 30, fontSize: 18 }}>
                {value.value}
              </Text>
            </View>
          );
        }}
        leftShiftForTooltip={60}
      />
    </View>
  );
};

export default ITR;
