import { DocumentData } from "firebase/firestore";

export const calculateTotalInventorySold = (
  startDate: string,
  endDate: string,
  productId: string,
  transactions: any[]
) => {
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return transactions
      .filter(
        (transaction) =>
          transaction.productID === productId && transaction.type === "sell"
      )
      .filter((transaction) => {
        const transactionDate = transaction.date.toDate();
        return transactionDate >= start && transactionDate <= end;
      })
      .reduce(
        (total, transaction) =>
          total + transaction.quantity * transaction.sellingPrice,
        0
      );
  } catch (error) {
    console.error(error);
  }
};

export const calculateAverageInventoryValue = (
  startDate: string,
  endDate: string,
  productId: string,
  buyingTransactionLog: DocumentData[]
) => {
  try {
    const startDateTimestamp = new Date(startDate).getTime();
    const endDateTimestamp = new Date(endDate).getTime();

    // Filter transactions for the specific product and date range
    const relevantTransactions = buyingTransactionLog.filter((transaction) => {
      const transactionTimestamp = transaction.date.toDate().getTime();
      return (
        transaction.productID === productId &&
        transactionTimestamp >= startDateTimestamp &&
        transactionTimestamp <= endDateTimestamp
      );
    });

    if (relevantTransactions.length === 0) {
      return 0;
    }

    const inventoryValueAtStart =
      relevantTransactions[0].quantity * relevantTransactions[0].purchasePrice;
    const inventoryValueAtEnd =
      relevantTransactions[relevantTransactions.length - 1].quantity *
      relevantTransactions[relevantTransactions.length - 1].purchasePrice;
    // Calculate average inventory value
    const averageInventoryValue =
      (inventoryValueAtStart + inventoryValueAtEnd) / 2;

    return averageInventoryValue;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

// Calculate the inventory turnover ratio
export const calculateInventoryTurnoverRatio = (
  totalCostOfInventorySold: number,
  averageInventoryCost: number | null
) => {
  try {
    if (averageInventoryCost === null || averageInventoryCost === 0) {
      return null;
    }

    const inventoryTurnoverRatio =
      totalCostOfInventorySold / averageInventoryCost;

    return inventoryTurnoverRatio;
  } catch (error) {
    console.error(error);
  }
};

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
