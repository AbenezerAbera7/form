import { View, Text } from "react-native";
import React from "react";
import { dailyPerformanceStyles } from "../styles/dailyPerformanceStyles";
import { Ionicons } from "@expo/vector-icons";

const DailyPerformanceCard = () => {
  return (
    <View style={dailyPerformanceStyles.profit}>
      <Text style={dailyPerformanceStyles.profitText}>Today's profit</Text>
      <Text style={dailyPerformanceStyles.amount}>500,000</Text>
      <View style={dailyPerformanceStyles.profitMessage}>
        <Ionicons name="trending-down-outline" size={24} color="red" />
        <Text style={dailyPerformanceStyles.decreaseMessage}>
          5% from yesterday
        </Text>
      </View>
    </View>
  );
};

export default DailyPerformanceCard;
