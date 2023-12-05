import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { actionsStyles } from "./styles/actionsScreenStyles";
import ActionCard from "./components/ActionCard";
import { ActionsModalProvider } from "../../context/ActionsContext";
import SellProductModal from "./components/SellProductModal";
import { NavigationContainer } from "@react-navigation/native";

const Actions = () => {
  return (
    <View style={actionsStyles.contentContainer}>
      <ActionsModalProvider>
        <SellProductModal />
        <ScrollView>
          <ActionCard
            iconName="cash-plus"
            Title="Sell a Product"
            action={{
              type: "sell",
            }}
          />
          <ActionCard
            iconName="shopping-outline"
            Title="Add to Stock"
            action={{
              type: "add",
            }}
          />
          <ActionCard iconName="cash-minus" Title="Add Expense" />
          <ActionCard iconName="flag-variant-outline" Title="Flag" />
          <ActionCard iconName="transfer" Title="Transfers" />
          <ActionCard
            iconName="cloud-download-outline"
            Title="Download Reports"
          />
        </ScrollView>
      </ActionsModalProvider>
    </View>
  );
};

export default Actions;
