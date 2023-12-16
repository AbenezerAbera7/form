import db from "../auth/useAuthentication";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  setDoc,
  doc,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  DocumentData,
} from "firebase/firestore";

export const handleGetProducts = async (uid: string) => {
  const productsRef = collection(db, "products", uid, "products");
  const products = await getDocs(productsRef);
  if (products.empty) {
    console.log("No matching documents.");
    return [];
  }
  const productsList = products.docs.map((doc: any) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return productsList;
};

export const handleCreateProduct = async (newProduct: any, uid: string) => {
  try {
    // create a products collection inside products/{uid}
    // if it doesn't exist and add the product to it as a document
    const collectionRef = collection(db, "products", uid, "products");
    const docRef = await addDoc(collectionRef, newProduct);
    return docRef.id;
  } catch (e) {
    console.error("Error adding product: ", e);
    return false;
  }
};

export const handleUpdateProduct = async (updatedProduct: any, uid: string) => {
  try {
    const id = updatedProduct.id;
    const docRef = doc(db, "products", uid, "products", id);
    await updateDoc(docRef, updatedProduct);
    return true;
  } catch (e) {
    console.error("Error updating product: ", e);
    return false;
  }
};

export const handleAddTransaction = async (
  transactionDetails: any,
  uid: string
) => {
  try {
    const docRef = collection(db, "transactions", uid, "transactions");
    await addDoc(docRef, transactionDetails);
    return true;
  } catch (e) {
    console.error("Error adding more stock: ", e);
    return false;
  }
};

export const handleGetTransactions = async (uid: string, productId: any) => {
  try {
    // get all transactions where productId = productId
    // prepare a query
    const q = query(
      collection(db, "transactions", uid, "transactions"),
      where("productID", "==", productId)
    );
    const transactions = await getDocs(q);
    if (transactions.empty) {
      console.log("No matching documents.");
      return [];
    }
    const transactionsList = transactions.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return transactionsList;
  } catch (e) {
    console.error("Error getting transactions: ", e);
    return false;
  }
};

export const handleGetTransactionsLimited = async (
  uid: string,
  num: number
) => {
  try {
    // get transactions limited to "num" sorted by date (latest first)
    // prepare a query
    const q = query(
      collection(db, "transactions", uid, "transactions"),
      orderBy("date", "desc"),
      limit(num)
    );
    const transactions = await getDocs(q);
    if (transactions.empty) {
      console.log("No matching documents.");
      return [];
    }
    const transactionsList = transactions.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return transactionsList;
  } catch (e) {
    console.error("Error getting transactions: ", e);
    return [];
  }
};

export const handleAddtoStock = async (
  uid: string,
  productId: string,
  newStock: any
) => {
  try {
    // add newStock to product/uid/products/productId/stock collection as a document
    const docRef = collection(
      db,
      "products",
      uid,
      "products",
      productId,
      "stock"
    );
    await addDoc(docRef, newStock);
    return true;
  } catch (e) {
    console.error("Error adding more stock: ", e);
    return false;
  }
};

export const handleGetStocks = async (uid: string, productId: string) => {
  try {
    // get all stocks where remainingStock > 0
    // prepare a query
    const q = query(
      collection(db, "products", uid, "products", productId, "stock"),
      where("remainingStock", ">", 0)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return [];
    }
    const stockList = querySnapshot.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return stockList;
  } catch (e) {
    console.error("Error getting stocks: ", e);
    return [];
  }
};

export const handleUpdateRemainingStock = async (
  uid: string,
  productId: string,
  stockId: string,
  newRemainingStock: number
) => {
  try {
    const docRef = doc(
      db,
      "products",
      uid,
      "products",
      productId,
      "stock",
      stockId
    );
    await updateDoc(docRef, { remainingStock: newRemainingStock });
    return true;
  } catch (e) {
    console.error("Error updating remaining stock: ", e);
    return false;
  }
};

export const getRemainingStock = async (uid: string, productId: string) => {
  try {
    // get all stocks where remainingStock > 0
    // prepare a query
    const q = query(
      collection(db, "products", uid, "products", productId, "stock"),
      where("remainingStock", ">", 0)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return [];
    }
    const stockList = querySnapshot.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return stockList;
  } catch (e) {
    console.error("Error getting remaining stock: ", e);
    return [];
  }
};

// handle get all transaction
export const handleGetAllTransactions = async (uid: string) => {
  try {
    const q = query(
      collection(db, "transactions", uid, "transactions"),
      limit(5)
    );
    let transactions = await getDocs(q);
    if (transactions.empty) {
      return [];
    }
    let transactionsList = transactions.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return transactionsList;
  } catch (e) {
    console.error("Error getting transactions: ", e);
    return [];
  }
};

// handle get transaction logs by their product id
export const handleGetTransactionsByProductId = async (
  uid: string,
  productId: any
) => {
  try {
    const q = query(
      collection(db, "transactions", uid, "transactions"),
      where("productID", "==", productId)
    );
    const transactions = await getDocs(q);
    if (transactions.empty) {
      console.log("No matching documents. by types");
      return [];
    }
    const transactionsList = transactions.docs.map((doc: any) => {
      const data = doc.data();
      return {
        date: data.date,
        productID: data.productID,
        quantity: data.quantity,
        cost: data.purchasePrice || 0,
        id: doc.id,
      };
    });
    return transactionsList;
  } catch (e) {
    console.error("Error getting transactions: ", e);
    return [];
  }
};
