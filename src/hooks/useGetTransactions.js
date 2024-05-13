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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userID } = useGetUserInfo();

  useEffect(() => {
    const getTransactions = async () => {
      setLoading(true);
      try {
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

        const unsubscribeIncomes = onSnapshot(
          queryIncomes,
          (snapshot) => {
            setLoading(true);
            const incomeDocs = snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
              type: "income",
            }));

            setIncomes(incomeDocs);
            setLoading(false);
          },
          (error) => {
            console.error("Error fetching incomes:", error);
            setError(error);
          }
        );
        const unsubscribeExpenses = onSnapshot(
          queryExpenses,
          (snapshot) => {
            setLoading(true);
            const expenseDocs = snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
              type: "expense",
            }));

            setExpenses(expenseDocs);
            setLoading(false);
          },
          (error) => {
            console.error("Error fetching expenses:", error);
            setError(error);
          }
        );

        return () => {
          unsubscribeIncomes();
          unsubscribeExpenses();
        };
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    getTransactions();
  }, [userID]);

  return { incomes, expenses, loading, error };
};
