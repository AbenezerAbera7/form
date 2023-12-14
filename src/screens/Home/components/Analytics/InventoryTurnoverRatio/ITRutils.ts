import { DocumentData } from "firebase/firestore";

   /*  
    Function to calculate Total Inventory Sold.
    Within a specified time range [Dec 5 - Dec 10]
    **args or **parameters
            -startDate: The start date of the transaction
            -endDate: The end date of the transaction
            -productData: array containing the product data of each transaction
    **returns
            -totalCostOfInventorySold: The total cost of inventory sold within the specified time range
 */

export const calculateTotalInventorySold = (
  startDate: string,
  endDate: string,
  productId: string,
  productData: DocumentData[]
) => {
  const startDateTimestamp = new Date(startDate).getTime();
  const endDateTimestamp = new Date(endDate).getTime();

  const totalCostOfInventorySold = productData.reduce(
    (total: number, product: DocumentData) => {
      const transactionDate = product.date instanceof Date ? product.date.getTime() : 0;

      if (productId === product.productID && transactionDate >= startDateTimestamp && transactionDate <= endDateTimestamp) {
        total += product.quantity * product.purchasePrice; 
      }

      return total;
    },
    0
  );

  return totalCostOfInventorySold;
};
            /*  
    Function to calculate Average Inventory Cost.
    Within a specified time range [Dec 5 - Dec 10]
    **arg or **paramaters
            -startDate: The start date of the transaction
            -endDate: The end date of the transaction
            -productId: The product's ID

    **return averageInventoryCost: The average inventory cost of the transaction
 */
    export const calculateAverageInventoryValue = (
      startDate: string,
      endDate: string,
      productId: string,
      buyingTransactionLog: DocumentData[]
    ) => {
      // Convert dates to timestamps
      const startDateTimestamp = new Date(startDate).getTime();
      const endDateTimestamp = new Date(endDate).getTime();
    
      // Filter transactions for the specific product and date range
      const relevantTransactions = buyingTransactionLog.filter((transaction) => {
        const transactionTimestamp = transaction.date instanceof Date ? transaction.date.getTime() : 0;
        return (
          transaction.productID === productId &&
          transactionTimestamp >= startDateTimestamp &&
          transactionTimestamp <= endDateTimestamp
        );
      });
    
      
      if (relevantTransactions.length === 0) {
        return null;
      }
    
      // Sort transactions by date
      relevantTransactions.sort((a, b) => a.date.getTime() - b.date.getTime());
    
      // Calculate inventory value at the beginning and end of the period
      const inventoryValueAtStart = relevantTransactions[0].quantity * relevantTransactions[0].purchasePrice;
      const inventoryValueAtEnd = relevantTransactions[relevantTransactions.length - 1].quantity * relevantTransactions[relevantTransactions.length - 1].purchasePrice;
    
      // Calculate average inventory value
      const averageInventoryValue = (inventoryValueAtStart + inventoryValueAtEnd) / 2;
    
      return averageInventoryValue;
      };

  

  // Calculate the inventory turnover ratio
  export const calculateInventoryTurnoverRatio = (
    totalCostOfInventorySold: number,
    averageInventoryCost: number | null
  ) => {
    
    if (averageInventoryCost === null || averageInventoryCost === 0) {
      return null;
    }
  
    const inventoryTurnoverRatio = totalCostOfInventorySold / averageInventoryCost;
  
    return inventoryTurnoverRatio;
  };
   

  