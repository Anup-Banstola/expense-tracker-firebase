import { useState, useEffect } from "react";

import styles from "./Hero.module.css";
import History from "./History.jsx";

const BASE_URL = "http://localhost:9000";

function Hero() {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncomes, setTotalIncomes] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesResponse = await fetch(`${BASE_URL}/expenses`);
        const expensesData = await expensesResponse.json();

        const incomesResponse = await fetch(`${BASE_URL}/incomes`);
        const incomesData = await incomesResponse.json();

        const totalExpensesAmount = expensesData.reduce((acc, expense) => {
          return acc + parseFloat(expense.transactionAmount);
        }, 0);
        setTotalExpenses(totalExpensesAmount);

        const totalIncomesAmount = incomesData.reduce((acc, income) => {
          return acc + parseFloat(income.transactionAmount);
        }, 0);
        setTotalIncomes(totalIncomesAmount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const formattedTotalBalance = parseFloat(
    totalIncomes - totalExpenses
  ).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  const formattedTotalIncomes = parseFloat(totalIncomes).toLocaleString(
    "en-IN",
    {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }
  );

  const formattedTotalExpenses = parseFloat(totalExpenses).toLocaleString(
    "en-IN",
    {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }
  );

  return (
    <>
      <main className={styles.hero}>
        <h2 className={styles.dash}>Dashboard</h2>

        <div className={styles.amounts}>
          <div className={styles.balance}>
            <h2>Total Balance</h2>
            <p className={styles.bal}>Rs.{formattedTotalBalance}</p>
          </div>
          <div className={styles.income}>
            <h2>Total Incomes</h2>
            <p className={styles.inc}>Rs.{formattedTotalIncomes}</p>
          </div>
          <div className={styles.expense}>
            <h2>Total Expenses</h2>
            <p className={styles.exp}>Rs.{formattedTotalExpenses}</p>
          </div>
        </div>

        <p className={styles.overview}>Overview</p>

        <History />
      </main>
    </>
  );
}

export default Hero;
