import { DocumentData } from "firebase/firestore";
const transactions: DocumentData[] = [
  {
    date: new Date("2023-12-13T12:28:52Z"),
    dateString: "Wed Dec 13 2023",
    expiry: "14/2027",
    product: "Abeny product four",
    productID: "TeeL4XDeVP2yjuPVLtbs",
    production: "14/2023",
    purchasePrice: 200,
    quantity: 125,
    sellingPrice: 250,
    type: "purchase",
  },
  {
    date: new Date("2023-12-14T12:28:52Z"), // December 14, 2023 at 12:28:52 PM UTC+3
    dateString: "Thu Dec 14 2023",
    expiry: "14/2027",
    product: "Abeny product four",
    productID: "TeeL4XDeVP2yjuPVLtbs",
    production: "14/2023",
    purchasePrice: 200,
    quantity: 100,
    sellingPrice: 250,
    type: "sell",
  },
  {
    date: new Date("2023-12-15T12:28:52Z"), // December 15, 2023 at 12:28:52 PM UTC+3
    dateString: "Fri Dec 15 2023",
    expiry: "14/2027",
    product: "Abeny product four",
    productID: "TeeL4XDeVP2yjuPVLtbs",
    production: "14/2023",
    purchasePrice: 200,
    quantity: 150,
    sellingPrice: 250,
    type: "purchase",
  },
  //    another product tranctions
  {
    date: new Date("2023-12-14T12:28:52Z"), // December 14, 2023 at 12:28:52 PM UTC+3
    dateString: "Thu Dec 14 2023",
    expiry: "14/2027",
    product: "Abeny product four",
    productID: "TeeL4XDeVP2yjuPVLtb3",
    production: "14/2023",
    purchasePrice: 200,
    quantity: 100,
    sellingPrice: 250,
    type: "sell",
  },
  {
    date: new Date("2023-12-15T12:28:52Z"), // December 15, 2023 at 12:28:52 PM UTC+3
    dateString: "Fri Dec 15 2023",
    expiry: "14/2027",
    product: "Abeny product four",
    productID: "TeeL4XDeVP2yjuPVLtb3",
    production: "14/2023",
    purchasePrice: 200,
    quantity: 150,
    sellingPrice: 250,
    type: "purchase",
  },
];

export const fetchTransactions = (): Promise<DocumentData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(transactions);
    }, 1000);
  });
};
