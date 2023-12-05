import React, { useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../backend/firebase";
import { getFirestore } from "firebase/firestore";
import { UserContext } from "../context/UserContext";
import { doc, getDoc } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export const useAuthentication = () => {
  const { user, setUser, setShowOnboarding } = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (User: any) => {
      if (User) {
        const userDetails = await getUser(User.uid);
        User = { ...User, ...userDetails };
        setUser(User);
        setShowOnboarding(userDetails ? userDetails.showOnboarding : false);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return user;
};

export default db;

export const getUser = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};
