import { groupBy, sortBy } from "lodash";
import { View, Text } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import ProductITRTimeLineChart from "./LineChart";
import { useNavigation } from "@react-navigation/native";
import { ITRDetailedViewStyles } from "../../../styles/ITRDetailedView";
import {
  calculateAverageInventoryValue,
  calculateInventoryTurnoverRatio,
  calculateTotalInventorySold,
} from "./ITRutils";
import { handleGetTransactionsByProductId } from "../../../../../api-endpoints/product-endpoint";
import { UserContext } from "../../../../../context/UserContext";

const ITRDetailedView = (props: any) => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const { uid } = user;
  const item = props.route.params.item;

  console.log("item", item);
  const [dataForChart, setDataForChart] = useState<
    { date: string; itr: number }[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const productTransactions = await handleGetTransactionsByProductId(
          uid,
          item.productID
        );
        const transactionsByDate = groupBy(productTransactions, "date");

        const data = [];

        for (const [date, dateTransactions] of Object.entries(
          transactionsByDate
        )) {
          const totalCostOfInventorySold = calculateTotalInventorySold(
            date,
            date,
            item.productID,
            dateTransactions
          );
          const averageInventoryValue = calculateAverageInventoryValue(
            date,
            date,
            item.productID,
            dateTransactions
          );
          const itr = calculateInventoryTurnoverRatio(
            totalCostOfInventorySold,
            averageInventoryValue
          );

          data.push({
            date,
            itr: itr ? itr : 0,
          });
        }

        const sortedData = sortBy(data, "date");
        setDataForChart(sortedData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const data = {
    labels: dataForChart.map((item) => item.date),
    datasets: [
      {
        data: dataForChart.map((item) => (item.itr !== null ? item.itr : 0)),
      },
    ],
  };
  if (isLoading) {
    return <Text>Loading...</Text>; // or your custom loading component
  }
  return (
    <View style={ITRDetailedViewStyles.background}>
      <Text>{item.label}</Text>
      <ProductITRTimeLineChart data={data} />
    </View>
  );
};

export default ITRDetailedView;
