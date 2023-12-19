import { DocumentData } from "firebase/firestore";

//  Gross Profit Margin
export const calculateTotalGrossProfit = (
  transactions: DocumentData[],
  startDate: Date,
  endDate: Date
): number => {
  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.date >= startDate && transaction.date <= endDate
  );

  const totalRevenue = filteredTransactions.reduce(
    (sum, transaction) =>
      sum + transaction.quantitySold * transaction.sellingPrice,
    0
  );

  const totalCostOfGoodsSold = filteredTransactions.reduce(
    (sum, transaction) =>
      sum + transaction.quantitySold * transaction.costPerItem,
    0
  );

  return totalRevenue - totalCostOfGoodsSold;
};
