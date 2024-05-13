import { useEffect, useState } from "react";
import styles from "./DailyStatistics.module.css";
import { useGetTransactions } from "../../../hooks/useGetTransactions";
import Loader from "./Loader";

function formatAmount(amount) {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
  }).format(amount);
}

function DailyStatistics({ selectedDate }) {
  const { incomes, expenses, loading } = useGetTransactions();
  const [recentIncomes, setRecentIncomes] = useState([]);
  const [recentExpenses, setRecentExpenses] = useState([]);
  useEffect(() => {
    const transactionsForSelectedDate = [...expenses, ...incomes].filter(
      (transaction) => {
        const transactionDate = new Date(transaction.date).toLocaleDateString(
          "en-US"
        );
        return transactionDate === selectedDate.toLocaleDateString("en-US");
      }
    );
    if (transactionsForSelectedDate.length > 0) {
      const incomeTransactions = transactionsForSelectedDate.filter(
        (transaction) => transaction.type === "income"
      );
      const expenseTransactions = transactionsForSelectedDate.filter(
        (transaction) => transaction.type === "expense"
      );

      incomeTransactions.sort(
        (a, b) => b.transactionAmount - a.transactionAmount
      );
      expenseTransactions.sort(
        (a, b) => b.transactionAmount - a.transactionAmount
      );

      const recentIncomeTransactions = incomeTransactions.slice(0, 5);
      const recentExpenseTransactions = expenseTransactions.slice(0, 5);

      setRecentIncomes(recentIncomeTransactions);
      setRecentExpenses(recentExpenseTransactions);
    } else {
      setRecentIncomes([]);
      setRecentExpenses([]);
    }
  }, [incomes, expenses, selectedDate]);

  return (
    <div className={styles.daily}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h3 className={styles.heading}>Daily Transactions</h3>
          <div className={styles.recentTransactions}>
            <div className={styles.transactionSection}>
              <h4 className={styles.sectionHeading}>Recent Incomes</h4>
              {recentIncomes.length > 0 ? (
                <div className={styles.transactions}>
                  {recentIncomes.map((transaction, index) => (
                    <div key={index} className={styles.transaction}>
                      <span className={styles.transactionAmount}>
                        {formatAmount(transaction.transactionAmount)}
                      </span>
                      <span className={styles.transactionCategory}>
                        {transaction.categoryName}
                      </span>
                      <span className={styles.transactionDate}>
                        {transaction.date}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div>No income transactions recorded for today.</div>
              )}
            </div>
            <div className={styles.transactionSection}>
              <h4 className={styles.sectionHeading}>Recent Expenses</h4>
              {recentExpenses.length > 0 ? (
                <div className={styles.transactions}>
                  {recentExpenses.map((transaction, index) => (
                    <div key={index} className={styles.transaction}>
                      <span className={styles.transactionAmount}>
                        {formatAmount(transaction.transactionAmount)}
                      </span>
                      <span className={styles.transactionCategory}>
                        {transaction.categoryName}
                      </span>
                      <span className={styles.transactionDate}>
                        {transaction.date}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div>No expense transactions recorded for today.</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DailyStatistics;
