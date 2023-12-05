import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { statsScreenStyles } from "./styles/statsScreenStyles";
import { useNavigation } from "@react-navigation/native";
import StatCard from "./components/StatCard";
import { colors } from "../../config/global";
import { ScrollView } from "react-native-gesture-handler";

const StatsScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Statistics",
      headerStyle: {
        backgroundColor: colors.background,
      },
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 25,
      },
    });
  });

  return (
    <View style={statsScreenStyles.background}>
      <View style={statsScreenStyles.statsContainer}>
        <ScrollView>
          <StatCard
            title="Balance"
            amount="2,720,450"
            currency="ETB"
            iconName="account-cash"
          />
          <StatCard
            title="Today's Customers"
            amount="10"
            currency=""
            iconName="account-multiple-plus-outline"
          />
          <StatCard
            title="Today's Profit"
            amount="5,000"
            currency="ETB"
            iconName="cash-plus"
          />
          <StatCard
            title="Total Customers"
            amount="500"
            currency=""
            iconName="account-multiple-plus-outline"
          />
          <StatCard
            title="Total Orders"
            amount="1,456"
            currency=""
            iconName="check-all"
          />
          <StatCard
            title="Expenses"
            amount="1,456"
            currency=""
            iconName="cash-minus"
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default StatsScreen;
