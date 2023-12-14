import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { colors } from "../../../../../config/global";

import { DocumentData, Transaction } from "firebase/firestore";
import { UserContext } from "../../../../../context/UserContext";
import { handleGetAllTransactions,  } from "../../../../../api-endpoints/product-endpoint";
import GraphHeader from "../../GraphHeader";
import { performanceCardStyles } from "../../../styles/ITR";
import { calculateAverageInventoryValue, calculateInventoryTurnoverRatio, calculateTotalInventorySold } from "./ITRutils";
 
 interface ITRProps {
    navigation: any;
  
 }

 const ITR = ({navigation}:ITRProps) => {
  //  const navigation = useNavigation();
   const [top5PerformingProducts, setTop5PerformingProducts] = useState<
   { productId: string; itr: number }[]
   >([]);

   const [dataForChart, setDataForChart] = useState< { productId: string; itr: number }[]>([]);
   
   const { user } = useContext(UserContext);
   const { uid } = user;
   useEffect(() => {
    const fetchData = async () => {
      // fetch all transactions
      const transactions = await handleGetAllTransactions(uid);
  
      // Group transactions by product
      const transactionsByProduct = transactions.reduce((acc, transaction) => {
        if (!acc[transaction.productID]) {
          acc[transaction.productID] = [];
        }
        acc[transaction.productID].push(transaction);
        return acc;
      }, {});
  
      console.log("transactionsByProduct", transactionsByProduct);
  
      // Calculate ITR for each product
      const itrByProduct: Record<string, number | null> = {};
  
      for (const productID in transactionsByProduct) {
        const sellingTransactions = transactionsByProduct[productID].filter((transaction: DocumentData) => transaction.type === 'sell');
        const buyingTransactions = transactionsByProduct[productID].filter((transaction: DocumentData) => transaction.type === 'purchase');
        
        if (buyingTransactions.length > 0 && sellingTransactions.length > 0) {
          const totalInventorySold = calculateTotalInventorySold("2023-12-07T16:04:19Z", "2023-12-08T16:04:19Z", productID, sellingTransactions);
          const averageInventoryValue = calculateAverageInventoryValue("2023-12-07T16:04:19Z", "2023-12-08T16:04:19Z", productID,buyingTransactions);
          itrByProduct[productID] = calculateInventoryTurnoverRatio(totalInventorySold, averageInventoryValue);
        }
      }
  
      // Get only top 5 performing products by ITR
      const top5Products = Object.entries(itrByProduct)
        .sort(([, itrA], [, itrB]) => (itrB as number) - (itrA as number))
        .slice(0, 5)
        .map(([productID]) => productID);
  
      const top5ProductsData = top5Products.map(productId => ({
        productId: productId,
        itr: itrByProduct[productId] || 0,
      }));
      
      setDataForChart(top5ProductsData);
    }

    fetchData();
  }, []);

 
const dataForChartFormatted = dataForChart.map(item => ({ value: item.itr }));
console.log("dataForChartFormatted", dataForChartFormatted);
  return (
    <>
      {false ? (
        <View style={performanceCardStyles.background}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <View style={performanceCardStyles.background}>
          <GraphHeader title="Inventory Turnover Ratio" />

          {/* Display the bar chart for the top 5 performing products */}
           {/* Display the bar chart for the top 5 performing products */}
           {dataForChart.length > 0 ? (
  <BarChart
    data={dataForChartFormatted}
    frontColor={colors.complementary}
    hideYAxisText
    showLine
    maxValue={1}
    side={"right"}
    lineBehindBars
    dashWidth={0}
    onPress={(value: any) => {
      navigation.navigate("ProductDetails", { productId: value.label });
    }}
    renderTooltip={(value: any) => (
      <View>
        <Text style={{ fontSize: 18 }}>{value.label}</Text>
        <Text style={{ marginBottom: 30, fontSize: 18 }}>{value.value}</Text>
      </View>
    )}
    leftShiftForTooltip={60}
  />
) : (
  <Text>No transactions</Text>
)}
</View>
  )
}


</>);
}

export default ITR;