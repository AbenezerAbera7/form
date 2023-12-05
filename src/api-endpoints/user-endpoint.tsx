import db from "../auth/useAuthentication";
import { setDoc, doc, getDoc } from "firebase/firestore";

export const handleCreateUser = async (newUser: any, uid: string) => {
  try {
    const docRef = doc(db, "users", uid);
    await setDoc(docRef, newUser, { merge: true });
    console.log("Added User ", docRef.id);
    return true;
  } catch (e) {
    console.error("Error adding user: ", e);
    return false;
  }
};

export const addBusinessDetails = async (businessDetails: any, uid: string) => {
  try {
    const docRef = doc(db, "users", uid);
    await setDoc(docRef, { businessDetails: businessDetails }, { merge: true });
    console.log("Added Business Details ", docRef.id);
    // change showOnboarding to false from user/uid
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, { showOnboarding: false }, { merge: true });
    return true;
  } catch (e) {
    console.error("Error adding business details: ", e);
    return false;
  }
};

export const getBusinessDetails = async (uid: string) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.businessDetails;
    } else {
      console.log("No such document!");
      return false;
    }
  } catch (e) {
    console.error("Error getting business details: ", e);
    return false;
  }
};
