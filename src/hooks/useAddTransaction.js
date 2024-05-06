import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";
import { useState } from "react";

export const useAddTransaction = () => {
  const { userID } = useGetUserInfo();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addTransaction = async ({
    type,
    transactionAmount,
    categoryName,
    date,
    description,
  }) => {
    setLoading(true);
    setError(null);
    try {
      let transactionCollectionRef;
      if (type === "income") {
        transactionCollectionRef = collection(db, "incomes");
      } else if (type === "expense") {
        transactionCollectionRef = collection(db, "expenses");
      } else {
        throw new Error("Invalid transaction type");
      }

      await addDoc(transactionCollectionRef, {
        userID,
        transactionAmount,
        categoryName,
        date,
        description,
        createdAt: serverTimestamp(),
      });
      setLoading(false);
    } catch (error) {
      console.error("Error adding transaction:", error);
      setError(error);
      setLoading(false);
      throw error;
    }
  };

  return { addTransaction, loading, error };
};
