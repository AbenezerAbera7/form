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

export const handleGetEmployees = async (uid: string) => {
  const employeesRef = collection(db, "employees", uid, "employees");
  const employees = await getDocs(employeesRef);
  if (employees.empty) {
    console.log("No matching documents.");
    return [];
  }
  const employeesList = employees.docs.map((doc: any) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return employeesList;
};

export const handleCreateEmployee = async (newEmployee: any, uid: string) => {
  try {
    const collectionRef = collection(db, "employees", uid, "employees");
    const docRef = await addDoc(collectionRef, newEmployee);
    // return the id of the newly created employee
    return docRef.id;
  } catch (e) {
    console.error("Error adding employee: ", e);
    return false;
  }
};

export const handleUpdateEmployee = async (
  updatedEmployee: any,
  uid: string
) => {
  try {
    const id = updatedEmployee.id;
    const docRef = doc(db, "employees", uid, "employees", id);
    await updateDoc(docRef, updatedEmployee);
    return true;
  } catch (e) {
    console.error("Error updating employee: ", e);
    return false;
  }
};

export const handleUpdatePermissions = async (
  updatedPermissions: any,
  uid: string,
  employeeId: string
) => {
  // updatedPermissions is an array of strings
  // change evployees/uid/employees/employeeId/permissions to updatedPermissions
  try {
    const docRef = doc(db, "employees", uid, "employees", employeeId);
    await updateDoc(docRef, updatedPermissions, { merge: true });
    return true;
  } catch (e) {
    console.error("Error updating permissions: ", e);
    return false;
  }
};

export const handleVerifySignupCode = async (
  employeeId: string,
  adminID: string
) => {
  // if employees/adminID/employees/employeeId exists, return the object else return false

  try {
    const docRef = doc(db, "employees", adminID, "employees", employeeId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return data;
    } else {
      console.log("No such document!");
      return false;
    }
  } catch (e) {
    console.error("Error getting employee: ", e);
    return false;
  }
};
