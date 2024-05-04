import { useEffect, useState } from "react";
import styles from "./MonthlyStatistics.module.css";

const BASE_URL = "http://localhost:9000";

function formatAmount(amount) {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
  }).format(amount);
}

function MonthlyStatistics() {
  const [monthlyExpenses, setMonthlyExpenses] = useState({});
  const [monthlyIncomes, setMonthlyIncomes] = useState({});

  const [highestTransaction, setHighestTransaction] = useState(null);
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesResponse = await fetch(`${BASE_URL}/expenses`);
        const expensesData = await expensesResponse.json();

        const incomesResponse = await fetch(`${BASE_URL}/incomes`);
        const incomesData = await incomesResponse.json();

        const expensesByMonth = expensesData.reduce((acc, expense) => {
          const date = new Date(expense.date);
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          const key = `${year}-${month}`;
          const amount = parseFloat(expense.transactionAmount);
          acc[key] = acc[key] ? acc[key] + amount : amount;
          return acc;
        }, {});
        setMonthlyExpenses(expensesByMonth);
        console.log(monthlyExpenses);
        console.log(Object.entries(monthlyExpenses));

        const incomesByMonth = incomesData.reduce((acc, income) => {
          const date = new Date(income.date);
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          const key = `${year}-${month}`;
          const amount = parseFloat(income.transactionAmount);
          acc[key] = acc[key] ? acc[key] + amount : amount;
          return acc;
        }, {});
        setMonthlyIncomes(incomesByMonth);

        const allTransactions = [...expensesData, ...incomesData];
        if (allTransactions.length > 0) {
          const highest = allTransactions.reduce((max, transaction) => {
            const amount = parseFloat(transaction.transactionAmount);
            return amount > parseFloat(max.transactionAmount)
              ? transaction
              : max;
          }, allTransactions[0]);
          setHighestTransaction(highest);
        }

        if (incomesData.length === 0 && expensesData.length === 0) {
          setRemarks("No transactions recorded yet.");
        } else if (Object.keys(monthlyIncomes).length === 0) {
          setRemarks("No income recorded for this month.");
        } else if (Object.keys(monthlyExpenses).length === 0) {
          setRemarks("No expenses recorded for today.");
        } else if (highestTransaction) {
          setRemarks(
            `Highest transaction amount recorded in ${
              highestTransaction.date
            } ==> ${formatAmount(highestTransaction.transactionAmount)}`
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [remarks]);

  return (
    <div className={styles.monthly}>
      <h3>Monthly Transactions:</h3>
      <h3>Expenses</h3>
      <div>
        {Object.entries(monthlyExpenses).map(([month, total]) => (
          <div key={month} className={styles.transactiondata}>
            <span>
              Date:<span className={styles.date}>{month}</span>
            </span>
            <span>
              Total Expenses:
              <span className={styles.expenses}>{formatAmount(total)}</span>
            </span>
          </div>
        ))}
      </div>
      <div>
        <h3>Incomes</h3>
        {Object.entries(monthlyIncomes).map(([month, total]) => (
          <div key={month} className={styles.transactiondata}>
            <span>
              Date: <span className={styles.date}>{month}</span>
            </span>
            <span>
              Total Incomes:
              <span className={styles.incomes}>{formatAmount(total)}</span>
            </span>
          </div>
        ))}
      </div>
      <div>
        <h3>Highest Transaction</h3>
        {highestTransaction && (
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
        )}
      </div>
      <div>
        <h3>Remarks</h3>
        <div className={styles.remarks}>{remarks}</div>
      </div>
    </div>
  );
}

export default MonthlyStatistics;
