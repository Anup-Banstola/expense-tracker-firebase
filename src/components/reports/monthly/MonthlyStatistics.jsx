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
  const [monthlyExpenses, setMonthlyExpenses] = useState({});
  const [monthlyIncomes, setMonthlyIncomes] = useState({});

  const [highestTransaction, setHighestTransaction] = useState(null);
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    const expensesByMonth = expenses.reduce((acc, expense) => {
      const date = new Date(expense.date);
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const key = `${month}/${year}`;
      const amount = parseFloat(expense.transactionAmount);
      if (month === String(selectedMonth.getMonth() + 1).padStart(2, "0")) {
        acc[key] = acc[key] ? acc[key] + amount : amount;
      }

      return acc;
    }, {});

    const incomesByMonth = incomes.reduce((acc, income) => {
      const date = new Date(income.date);
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const key = `${month}/${year}`;
      const amount = parseFloat(income.transactionAmount);
      if (month === String(selectedMonth.getMonth() + 1).padStart(2, "0")) {
        acc[key] = acc[key] ? acc[key] + amount : amount;
      }

      return acc;
    }, {});
    setMonthlyExpenses(expensesByMonth);
    setMonthlyIncomes(incomesByMonth);

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
      const highest = transactionsForSelectedMonth.reduce(
        (max, transaction) => {
          const amount = parseFloat(transaction.transactionAmount);
          return amount > parseFloat(max.transactionAmount) ? transaction : max;
        },
        transactionsForSelectedMonth[0]
      );
      setHighestTransaction(highest);
    } else {
      setHighestTransaction(null);
    }

    if (transactionsForSelectedMonth.length === 0) {
      setRemarks("No transactions recorded for this month.");
    } else if (Object.keys(monthlyIncomes).length === 0) {
      setRemarks("No income recorded for this month.");
    } else if (Object.keys(monthlyExpenses).length === 0) {
      setRemarks("No expenses recorded for this month.");
    } else if (highestTransaction) {
      setRemarks(
        `Highest transaction amount recorded in ${
          highestTransaction.date
        } ==> ${formatAmount(highestTransaction.transactionAmount)}`
      );
    }
  }, [expenses, incomes, remarks, selectedMonth]);

  return (
    <div className={styles.monthly}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h3>Monthly Transactions:</h3>
          {Object.keys(monthlyExpenses).length > 0 && (
            <>
              <h3>Expenses</h3>
              <div>
                {Object.entries(monthlyExpenses).map(([month, total]) => (
                  <div key={month} className={styles.transactiondata}>
                    <span>
                      Date:<span className={styles.date}>{month}</span>
                    </span>
                    <span>
                      Total Expenses:
                      <span className={styles.expenses}>
                        {formatAmount(total)}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
          {Object.keys(monthlyIncomes).length > 0 && (
            <div>
              <h3>Incomes</h3>
              {Object.entries(monthlyIncomes).map(([month, total]) => (
                <div key={month} className={styles.transactiondata}>
                  <span>
                    Date: <span className={styles.date}>{month}</span>
                  </span>
                  <span>
                    Total Incomes:
                    <span className={styles.incomes}>
                      {formatAmount(total)}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          )}

          {highestTransaction && (
            <div>
              <h3>Highest Transaction</h3>

              <div className={styles.transaction}>
                <div>
                  Amount:
                  <span className={styles.tranamount}>
                    {formatAmount(highestTransaction.transactionAmount)}
                  </span>
                </div>
                <div>
                  Category:
                  <span className={styles.category}>
                    {highestTransaction.categoryName}
                  </span>
                </div>
                <div>
                  Date:
                  <span className={styles.date}>{highestTransaction.date}</span>
                </div>
              </div>
            </div>
          )}
          <div>
            <h3>Remarks</h3>
            <div className={styles.remarks}>{remarks}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default MonthlyStatistics;
