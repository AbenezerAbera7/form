import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { transactionStyles } from "../styles/transaction";

const Transaction = (props: { name: string; sign: string; amount: string }) => {
  const { name, sign, amount } = props;
  return (
    <TouchableOpacity style={transactionStyles.background}>
      <Text numberOfLines={1} style={transactionStyles.name}>
        {name}
      </Text>
      <View style={transactionStyles.amountContainer}>
        <Text style={transactionStyles.amount}>{sign + " " + amount} </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Transaction;
