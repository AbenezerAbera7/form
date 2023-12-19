import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { colors } from "../../../../../config/global";
import { DocumentData } from "firebase/firestore";
import { UserContext } from "../../../../../context/UserContext";
import { handleGetAllTransactions } from "../../../../../api-endpoints/product-endpoint";
import GraphHeader from "../../GraphHeader";
import { performanceCardStyles } from "../../../styles/ITR";
import {
  calculateAverageInventoryValue,
  calculateInventoryTurnoverRatio,
  calculateTotalInventorySold,
} from "./ITRutils";
interface ITRProps {
  navigation: any;
}

const ITR = ({ navigation }: ITRProps) => {
  const { user } = useContext(UserContext);
  const { uid } = user;

  const [isLoading, setIsLoading] = useState(true); // new loading state
  const [dataForChart, setDataForChart] = useState<
    { productId: string; itr: number }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const transactions = await handleGetAllTransactions(uid);
        // const transactions: DocumentData[] = await fetchTransactions();

        const startDate = "2023-12-05";
        const endDate = "2023-12-14";

        const productIds = Array.from(
          new Set(transactions.map((transaction) => transaction.productID))
        );
        const itrByProduct: Record<string, DocumentData | null> = {};

        productIds.forEach((productId) => {
          const totalCostOfInventorySold = calculateTotalInventorySold(
            startDate,
            endDate,
            productId,
            transactions
          );
          const averageInventoryValue = calculateAverageInventoryValue(
            startDate,
            endDate,
            productId,
            transactions
          );
          const itr = calculateInventoryTurnoverRatio(
            totalCostOfInventorySold,
            averageInventoryValue
          );

          const productTransaction = transactions.find(
            (transaction) => transaction.productID === productId
          );
          // console.log(
          //   `Total cost of inventory sold for product ${productId}: ${totalCostOfInventorySold}`
          // );
          // console.log(
          //   `Average inventory value for product ${productId}: ${averageInventoryValue}`
          // );

          if (productTransaction) {
            itrByProduct[productId] = {
              productID: productId,
              itr: itr,
              productName: productTransaction.product,
            };
          }
        });
        // console.log("itrByProduct", itrByProduct);

        setDataForChart(
          Object.entries(itrByProduct).map(([productId, data]) => ({
            productId,
            itr: data?.itr || 0,
          }))
        );
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const dataForChartFormatted = dataForChart.map((item) => ({
    value: item.itr,
    productID: item.productId,
  }));

  const maxValue = Math.max(...dataForChartFormatted.map((item) => item.value));
  return (
    <>
      {isLoading ? (
        <View style={performanceCardStyles.background}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <View style={performanceCardStyles.background}>
          <GraphHeader title="Inventory Turnover Ratio" />

          {dataForChart.length > 0 ? (
            <BarChart
              data={dataForChartFormatted}
              frontColor={colors.complementary}
              hideYAxisText
              showLine
              maxValue={maxValue}
              side={"right"}
              lineBehindBars
              dashWidth={0}
              onPress={(data: any) => {
                navigation.navigate("ITRDetailedView", { item: data });
              }}
              renderTooltip={(value: any) => (
                <View style={performanceCardStyles.tooltip}>
                  <Text style={{ fontSize: 18 }}>{value.label}</Text>
                  <Text style={{ marginBottom: 30, fontSize: 18 }}>
                    {value.value}
                  </Text>
                </View>
              )}
              leftShiftForTooltip={60}
            />
          ) : (
            <Text>No transactions</Text>
          )}
        </View>
      )}
    </>
  );
};
export default ITR;
