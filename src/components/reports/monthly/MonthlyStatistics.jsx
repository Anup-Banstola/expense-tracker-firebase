import { useEffect, useState } from "react";
import styles from "./MonthlyStatistics.module.css";
import { useGetTransactions } from "../../../hooks/useGetTransactions";
import Loader from "../daily/Loader";

function formatAmount(amount) {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
  }).format(amount);
}

function MonthlyStatistics({ selectedMonth }) {
  const { incomes, expenses, loading } = useGetTransactions();

  const [recentIncomes, setRecentIncomes] = useState([]);
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [totalIncomes, setTotalIncomes] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const transactionsForSelectedMonth = [...expenses, ...incomes].filter(
      (transaction) => {
        const date = new Date(transaction.date);
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return (
          `${month}/${year}` ===
          `${String(selectedMonth.getMonth() + 1).padStart(
            2,
            "0"
          )}/${selectedMonth.getFullYear()}`
        );
      }
    );

    if (transactionsForSelectedMonth.length > 0) {
      const incomeTransactions = transactionsForSelectedMonth.filter(
        (transaction) => transaction.type === "income"
      );
      const expenseTransactions = transactionsForSelectedMonth.filter(
        (transaction) => transaction.type === "expense"
      );

      const totalIncomeAmount = incomeTransactions.reduce(
        (acc, transaction) => acc + transaction.transactionAmount,
        0
      );
      const totalExpenseAmount = expenseTransactions.reduce(
        (acc, transaction) => acc + transaction.transactionAmount,
        0
      );

      setTotalIncomes(totalIncomeAmount);
      setTotalExpenses(totalExpenseAmount);

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
  }, [expenses, incomes, selectedMonth]);

  return (
    <div className={styles.monthly}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h3 className={styles.heading}>Monthly Transactions</h3>
          <div className={styles.recentTransactions}>
            <div className={styles.transactionSection}>
              <div className={styles.totalAmount}>
                Total Incomes: {formatAmount(totalIncomes)}
              </div>
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
                  No income transactions have been recorded for this month.
                </div>
              )}
            </div>
            <div className={styles.transactionSection}>
              <div className={styles.totalAmount}>
                Total Expenses: {formatAmount(totalExpenses)}
              </div>
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
                  No expense transactions have been recorded for this month.
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MonthlyStatistics;
