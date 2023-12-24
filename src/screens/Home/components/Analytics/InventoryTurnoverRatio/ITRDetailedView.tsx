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

const ITRDetailedView = (props: any) => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const { uid } = user;
  const item = props.route.params.item;

  // console.log("item", item);
  const [dataForChart, setDataForChart] = useState<
    { date: string; itr: number }[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // get data for chart a line graph plotting ITR over time for each product
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
      {/* <ProductITRTimeLineChart data={data} /> */}
    </View>
  );
};

export default ITRDetailedView;
