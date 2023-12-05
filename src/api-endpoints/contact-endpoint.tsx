import db from "../auth/useAuthentication";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

export const handleGetContacts = async (uid: string, type: string) => {
  const contactsRef = collection(db, "contacts", uid, type);
  const contacts = await getDocs(contactsRef);
  if (contacts.empty) {
    console.log("No matching documents.");
    return [];
  }
  const contactList = contacts.docs.map((doc: any) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return contactList;
};

export const handleCreateContact = async (
  newContact: any,
  uid: string,
  type: string
) => {
  try {
    const collectionRef = collection(db, "contacts", uid, type);
    const docRef = await addDoc(collectionRef, newContact);
    return true;
  } catch (e) {
    console.error("Error adding contact: ", e);
    return false;
  }
};

export const handleUpdateContact = async (
  updatedContact: any,
  uid: string,
  type: string
) => {
  try {
    const id = updatedContact.id;
    const docRef = doc(db, "contacts", uid, type, id);
    await updateDoc(docRef, updatedContact);
    return true;
  } catch (e) {
    console.error("Error updating contact: ", e);
    return false;
  }
};
