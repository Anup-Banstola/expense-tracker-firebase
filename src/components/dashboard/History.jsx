import { useState, useEffect } from "react";
import Chart from "./Chart.jsx";
import styles from "./History.module.css";
import { useGetTransactions } from "../../hooks/useGetTransactions.js";

function formatAmount(amount) {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
  }).format(amount);
}

function History() {
  const { incomes, expenses } = useGetTransactions();
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    const combinedTransactions = [...expenses, ...incomes];
    combinedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    setTransactionHistory(combinedTransactions);
  }, [incomes, expenses]);

  return (
    <div className={styles.container}>
      <Chart />
      {transactionHistory.length > 0 && (
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
      )}
    </div>
  );
}

export default History;
