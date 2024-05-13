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
  const [yearlyExpenses, setYearlyExpenses] = useState({});
  const [yearlyIncomes, setYearlyIncomes] = useState({});

  const [highestTransaction, setHighestTransaction] = useState(null);
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    const expensesByYear = expenses.reduce((acc, expense) => {
      const date = new Date(expense.date);
      const year = date.getFullYear();
      const amount = parseFloat(expense.transactionAmount);
      console.log(year);
      console.log(selectedYear.getFullYear());
      if (year === selectedYear.getFullYear()) {
        acc[year] = acc[year] ? acc[year] + amount : amount;
      }

      return acc;
    }, {});
    setYearlyExpenses(expensesByYear);

    const incomesByYear = incomes.reduce((acc, income) => {
      const date = new Date(income.date);
      const year = date.getFullYear();
      const amount = parseFloat(income.transactionAmount);
      if (year === selectedYear.getFullYear()) {
        acc[year] = acc[year] ? acc[year] + amount : amount;
      }

      return acc;
    }, {});
    setYearlyIncomes(incomesByYear);

    const transactionsForSelectedYear = [...expenses, ...incomes].filter(
      (transaction) => {
        const date = new Date(transaction.date);
        const year = date.getFullYear();
        return year === selectedYear.getFullYear();
      }
    );

    if (transactionsForSelectedYear.length > 0) {
      const highest = transactionsForSelectedYear.reduce((max, transaction) => {
        const amount = parseFloat(transaction.transactionAmount);
        return amount > parseFloat(max.transactionAmount) ? transaction : max;
      }, transactionsForSelectedYear[0]);
      setHighestTransaction(highest);
    } else {
      setHighestTransaction(null);
    }

    if (
      transactionsForSelectedYear.length === 0 &&
      transactionsForSelectedYear.length === 0
    ) {
      setRemarks("No transactions recorded yet.");
    } else if (Object.keys(yearlyIncomes).length === 0) {
      setRemarks("No income recorded for this year.");
    } else if (Object.keys(yearlyExpenses).length === 0) {
      setRemarks("No expenses recorded for this year.");
    } else if (highestTransaction) {
      setRemarks(
        `Highest transaction amount recorded in ${
          highestTransaction.date
        }  <==>  ${formatAmount(highestTransaction.transactionAmount)}`
      );
    }
  }, [incomes, expenses, remarks, selectedYear]);

  return (
    <div className={styles.yearly}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h3>Yearly Transactions:</h3>
          <>
            {Object.keys(yearlyExpenses).length > 0 && (
              <div>
                <h3>Expenses</h3>
                {Object.entries(yearlyExpenses).map(([year, total]) => (
                  <div className={styles.transactiondata} key={year}>
                    <span>
                      Year:<span className={styles.date}>{year}</span>
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
            )}
            {Object.keys(yearlyIncomes).length > 0 && (
              <div>
                <h3>Incomes</h3>
                {Object.entries(yearlyIncomes).map(([date, total]) => (
                  <div key={date} className={styles.transactiondata}>
                    <span>
                      Year: <span className={styles.date}>{date}</span>
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
            )}

            <div>
              {highestTransaction && (
                <>
                  {" "}
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
                </>
              )}
            </div>
          </>

          <div>
            <h3>Remarks</h3>
            <div className={styles.remarks}>{remarks}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default YearlyStatistics;
