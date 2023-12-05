import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { transactionsCardStyles } from "../styles/transactionsCard";
import Transaction from "./Transaction";

const TransactionsCard = () => {
  return (
    <View style={transactionsCardStyles.background}>
      <Text style={transactionsCardStyles.title}>Transactions</Text>
      <ScrollView style={{ marginTop: 10 }}>
        <Transaction name="Nike Air Force 1" sign="-" amount="500" />
        <Transaction name="Nike Blazer" sign="+" amount="1000" />
        <Transaction name="Nike Air Max 270" sign="-" amount="200" />
        <Transaction name="Nike Air Max 90" sign="+" amount="100" />
        <Transaction name="Nike Huarache" sign="-" amount="500" />
        <Transaction name="Nike React" sign="+" amount="1000" />
      </ScrollView>
      <TouchableOpacity style={transactionsCardStyles.button}>
        <Text style={transactionsCardStyles.buttonText}>
          View all transactions
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TransactionsCard;
