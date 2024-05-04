import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../config/firebase-config";

const useDeleteTransaction = () => {
  const [error, setError] = useState();

  const deleteTransaction = async (collectionName, transactionId) => {
    try {
      await deleteDoc(doc(db, collectionName, transactionId));
    } catch (error) {
      console.errror(`Error deleting ${collectionName} transaction:`, error);
      setError(error);
    }
  };
  return { deleteTransaction, error };
};
export default useDeleteTransaction;
