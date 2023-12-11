import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { transactionsCardStyles } from "../styles/transactionsCard";
import Transaction from "./Transaction";
import { handleGetTransactionsLimited } from "../../../api-endpoints/product-endpoint";
import { UserContext } from "../../../context/UserContext";

const TransactionsCard = () => {
  const [transactions, setTransactions] = useState<any>([]);
  const { user } = useContext(UserContext);
  useEffect(() => {
    const { uid } = user;
    const getTransactions = async () => {
      setTransactions(await handleGetTransactionsLimited(uid, 7));
    };
    getTransactions();
  }, []);
  return (
    <View style={transactionsCardStyles.background}>
      <Text style={transactionsCardStyles.title}>Transactions</Text>
      <ScrollView style={{ marginTop: 10 }}>
        {transactions.map((transaction: any) => (
          <Transaction
            key={transaction.id}
            name={transaction.product}
            amount={
              transaction.type === "purchase"
                ? "- " + transaction.purchasePrice
                : "+ " + transaction.sellingPrice
            }
          />
        ))}
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
