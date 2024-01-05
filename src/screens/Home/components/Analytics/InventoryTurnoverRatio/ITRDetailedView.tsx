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
import { handleGetAllTransactions } from "../../../../../api-endpoints/product-endpoint";
import { UserContext } from "../../../../../context/UserContext";
import { groupBy } from "lodash";

const ITRDetailedView = (props: any) => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const { uid } = user;
  const item = props.route.params.item;
  console.log("item", item);
  const startDate = "2023-07-25";
  const endDate = "2023-12-23";

  const [dataForChart, setDataForChart] = useState<
    { date: string; itr: number }[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const transactions = await handleGetAllTransactions(uid);
        const filteredTransactions = transactions.filter(
          (transaction) => transaction.productID === "TeeL4XDeVP2yjuPVLtb3"
        );
        const groupedTransactions = groupBy(
          filteredTransactions,
          (transaction) => {
            return [transaction.productID, transaction.date.toDate().getDay()];
          }
        );
        console.log("groupedTransactions", groupedTransactions);
        const dataForChart = [];
        for (const group in groupedTransactions) {
          const transactions = groupedTransactions[group];
          if (transactions) {
            console.log(transactions[0].productID);
            const totalInventorySold = calculateTotalInventorySold(
              transactions[0].productID,
              startDate,
              endDate,
              item.productID
            );
            console.log("totalInventorySold", totalInventorySold);

            const averageInventoryValue = calculateAverageInventoryValue(
              transactions[0].productID,
              startDate,
              endDate,
              item.productID
            );
            console.log("averageInventoryValue", averageInventoryValue);

            let itr = calculateInventoryTurnoverRatio(
              totalInventorySold,
              averageInventoryValue
            );
            console.log("itr", itr);

            if (itr === null || itr === undefined) {
              itr = 0;
            }
            dataForChart.push({
              date: groupedTransactions[group][0].date.toString(),
              itr,
            });
          }
        }
        setDataForChart(dataForChart);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
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
