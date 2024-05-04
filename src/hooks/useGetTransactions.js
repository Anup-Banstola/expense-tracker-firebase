import { useEffect, useState } from "react";
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const { userID } = useGetUserInfo();

  useEffect(() => {
    const incomeCollectionRef = collection(db, "incomes");
    const expenseCollectionRef = collection(db, "expenses");

    if (!userID) return;

    const queryIncomes = query(
      incomeCollectionRef,
      where("userID", "==", userID),
      orderBy("createdAt")
    );
    const queryExpenses = query(
      expenseCollectionRef,
      where("userID", "==", userID),
      orderBy("createdAt")
    );
    const unsubscribeIncomes = onSnapshot(queryIncomes, (snapshot) => {
      const incomeDocs = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setIncomes(incomeDocs);
    });

    const unsubscribeExpenses = onSnapshot(queryExpenses, (snapshot) => {
      const expenseDocs = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setExpenses(expenseDocs);
    });
    return () => {
      unsubscribeIncomes();
      unsubscribeExpenses();
    };
  }, [userID]);

  return { incomes, expenses };
};
