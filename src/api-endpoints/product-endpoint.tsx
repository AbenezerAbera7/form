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
  uid: string,
  productId: any
) => {
  try {
    const docRef = collection(db, "transactions", uid, productId);
    await addDoc(docRef, transactionDetails);
    return true;
  } catch (e) {
    console.error("Error adding more stock: ", e);
    return false;
  }
};

export const handleGetTransactions = async (uid: string, productId: any) => {
  try {
    const transactionsRef = collection(db, "transactions", uid, productId);
    const transactions = await getDocs(transactionsRef);
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
