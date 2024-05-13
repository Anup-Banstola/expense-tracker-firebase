import { useEffect, useState } from "react";
import styles from "./YearlyStatistics.module.css";
import { useGetTransactions } from "../../../hooks/useGetTransactions";
import Loader from "../daily/Loader";

function formatAmount(amount) {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
  }).format(amount);
}

function YearlyStatistics({ selectedYear }) {
  const { expenses, incomes, loading } = useGetTransactions();

  const [recentIncomes, setRecentIncomes] = useState([]);
  const [recentExpenses, setRecentExpenses] = useState([]);

  useEffect(() => {
    const transactionsForSelectedYear = [...expenses, ...incomes].filter(
      (transaction) => {
        const date = new Date(transaction.date);
        const year = date.getFullYear();
        return year === selectedYear.getFullYear();
      }
    );

    if (transactionsForSelectedYear.length > 0) {
      const incomeTransactions = transactionsForSelectedYear.filter(
        (transaction) => transaction.type === "income"
      );
      const expenseTransactions = transactionsForSelectedYear.filter(
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
  }, [incomes, expenses, selectedYear]);

  console.log(recentIncomes);

  return (
    <div className={styles.yearly}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h3 className={styles.heading}>Yearly Transactions</h3>
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
                <div>
                  No income transactions have been recorded for this year.
                </div>
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
                <div>
                  No expense transactions have been recorded for this year.
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default YearlyStatistics;
