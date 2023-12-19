import { DocumentData } from "firebase/firestore";

export const fetchTransactionLogFromFirebase = async (): Promise<
  DocumentData[]
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const transactionLog: DocumentData[] = [
        {
          date: "2023-12-07T16:04:19Z",
          expiry: "",
          product: "Trial product",
          productID: "YFmCGobYqdZmrwzeo7p5",
          production: "",
          purchasePrice: 200,
          quantity: 46,
          sellingPrice: 480,
          type: "purchase",
        },
        {
          date: "2023-12-08T12:30:00Z",
          expiry: "",
          product: "Another Product",
          productID: "abc123",
          production: "",
          purchasePrice: 150,
          quantity: 30,
          sellingPrice: 300,
          type: "purchase",
        },
        {
          date: "2023-12-09T09:15:00Z",
          expiry: "",
          product: "Yet Another Product",
          productID: "xyz789",
          production: "",
          purchasePrice: 180,
          quantity: 25,
          sellingPrice: 400,
          type: "purchase",
        },
      ];

      resolve(transactionLog);
    }, 1000);
  });
};

// const filterType = "purchase";
