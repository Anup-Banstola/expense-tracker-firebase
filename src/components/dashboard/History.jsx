import { useState, useEffect } from "react";
import Chart from "./Chart.jsx";
import styles from "./History.module.css";

function formatAmount(amount) {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
  }).format(amount);
}

const BASE_URL = "http://localhost:9000";

function History() {
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesResponse = await fetch(`${BASE_URL}/expenses`);
        const expensesData = await expensesResponse.json();

        const incomesResponse = await fetch(`${BASE_URL}/incomes`);
        const incomesData = await incomesResponse.json();

        const combinedTransactions = [...expensesData, ...incomesData];
        combinedTransactions.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setTransactionHistory(combinedTransactions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Chart />

      <div className={styles.recenthistory}>
        <span>Recent History</span>
        <div className={styles.tranhistory}>
          {transactionHistory.slice(0, 3).map((transaction, index) => (
            <div
              key={index}
              className={`${styles.history} ${
                transaction.description.toLowerCase() === "income"
                  ? styles.income
                  : styles.expense
              }`}
            >
              <span className={styles.category}>
                {transaction.categoryName}
              </span>
              <span>{`${formatAmount(transaction.transactionAmount)}`}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default History;
