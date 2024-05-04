import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddTransaction = () => {
  const { userID } = useGetUserInfo();

  const addTransaction = async ({
    type,
    transactionAmount,
    categoryName,
    date,
    description,
  }) => {
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
    } catch (error) {
      console.error("Error adding transaction:", error);
      throw error;
    }
  };

  return { addTransaction };
};
