import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { sellProductStockCardStyles } from "../styles/sellProductStockCard";
import { colors } from "../../../config/global";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

interface props {
  stock: any;
}

const SellProductStockCard = ({ stock }: props) => {
  const [amount, setAmount] = useState(0);
  return (
    <View style={sellProductStockCardStyles.container}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>Purchased on </Text>
          <Text style={{}}>{stock.dateString}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>Purchased for Birr </Text>
          <Text style={{}}>{stock.purchasePrice}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>Remaining amount </Text>
          <Text style={{}}>{stock.remainingStock}</Text>
        </View>
      </View>

      <View>
        {/* <Text style={{ fontWeight: "bold" }}>Amount to sell</Text> */}
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            flex: 1,
            // justifyContent: "center",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Enter Amount</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (amount > 0) {
                  setAmount(amount - 1);
                }
              }}
            >
              <Text style={{ fontSize: 40 }}>-</Text>
            </TouchableOpacity>
            <BottomSheetTextInput
              style={{
                backgroundColor: colors.background,
                width: 60,
                height: 30,
                textAlign: "center",
                marginHorizontal: 5,
              }}
              value={amount.toString()}
              keyboardType="numeric"
            />
            <TouchableOpacity
              onPress={() => {
                if (amount < stock.remainingStock) {
                  setAmount(amount + 1);
                }
              }}
            >
              <Text style={{ fontSize: 30 }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SellProductStockCard;
