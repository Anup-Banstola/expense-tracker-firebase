// import { useEffect, useState } from "react";

import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../config/firebase-config";

export const useEditTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const editTransaction = async (
    collectionName,
    transactionId,
    updatedData
  ) => {
    setLoading(true);
    try {
      const transactionCollectionRef = doc(db, collectionName, transactionId);
      await updateDoc(transactionCollectionRef, updatedData);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  return { editTransaction, loading, error };
};
