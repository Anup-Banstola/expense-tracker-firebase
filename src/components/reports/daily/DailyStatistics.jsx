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
  const [dailyExpenses, setDailyExpenses] = useState({});
  const [dailyIncomes, setDailyIncomes] = useState({});
  const [highestTransaction, setHighestTransaction] = useState(null);
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    const filterTransactionsByDate = (transactions, date) => {
      if (!date) return [];

      const selectedDateString = date.toLocaleDateString("en-US");

      return transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date).toLocaleDateString(
          "en-US"
        );
        return transactionDate === selectedDateString;
      });
    };

    const filteredIncomes = filterTransactionsByDate(incomes, selectedDate);
    const filteredExpenses = filterTransactionsByDate(expenses, selectedDate);

    const expensesByDay = filteredExpenses.reduce((acc, expense) => {
      const date = expense.date;
      const amount = parseFloat(expense.transactionAmount);
      acc[date] = acc[date] ? acc[date] + amount : amount;
      return acc;
    }, {});

    const incomesByDay = filteredIncomes.reduce((acc, income) => {
      const date = income.date;
      const amount = parseFloat(income.transactionAmount);
      acc[date] = acc[date] ? acc[date] + amount : amount;
      return acc;
    }, {});

    setDailyExpenses(expensesByDay);
    setDailyIncomes(incomesByDay);

    const allTransactions = [...filteredExpenses, ...filteredIncomes];
    if (allTransactions.length > 0) {
      const highest = allTransactions.reduce((max, transaction) => {
        const amount = parseFloat(transaction.transactionAmount);
        return amount > parseFloat(max.transactionAmount) ? transaction : max;
      }, allTransactions[0]);
      setHighestTransaction(highest);
    } else {
      setHighestTransaction(null);
    }

    if (filteredIncomes.length === 0 && filteredExpenses.length === 0) {
      setRemarks("No transactions recorded yet.");
    } else if (Object.keys(dailyIncomes).length === 0) {
      setRemarks("No income recorded for today.");
    } else if (Object.keys(dailyExpenses).length === 0) {
      setRemarks("No expenses recorded for today.");
    } else if (highestTransaction) {
      const formattedAmount = formatAmount(
        highestTransaction.transactionAmount
      );
      setRemarks(
        `Highest transaction amount recorded on ${selectedDate.toDateString()} is ${formattedAmount}`
      );
    }
  }, [incomes, expenses, remarks, selectedDate]);

  return (
    selectedDate && (
      <div className={styles.dailyreport}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <h3>Daily Transactions:</h3>
            {Object.keys(dailyExpenses).length > 0 && (
              <>
                <h3>Expenses</h3>
                <div>
                  {Object.entries(dailyExpenses).map(([date, total]) => (
                    <div className={styles.transactiondata} key={date}>
                      <span>
                        Date:<span className={styles.date}>{date}</span>
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

            {Object.keys(dailyIncomes).length > 0 && (
              <>
                <div>
                  <h3>Incomes</h3>
                  {Object.entries(dailyIncomes).map(([date, total]) => (
                    <div key={date} className={styles.transactiondata}>
                      <span>
                        Date: <span className={styles.date}>{date}</span>
                      </span>
                      <span>
                        Total Incomes:{" "}
                        <span className={styles.incomes}>
                          {formatAmount(total)}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {highestTransaction && (
              <>
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
                      <span className={styles.date}>
                        {highestTransaction.date}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div>
              <h3>Remarks</h3>
              <div className={styles.remarks}>{remarks}</div>
            </div>
          </>
        )}
      </div>
    )
  );
}

export default DailyStatistics;
