import { useEffect, useState } from "react";
import styles from "./MainExpense.module.css";
import AddExpensePopup from "../../components/expenses/AddExpensePopup";
import ExpenseList from "../../components/expenses/ExpenseList";
import { useGetTransactions } from "../../hooks/useGetTransactions";

function formatAmount(amount) {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
  }).format(amount);
}

function MainExpense() {
  const { incomes, expenses } = useGetTransactions();

  const [showPopup, setShowPopup] = useState(false);
  const [accountBalance, setAccountBalance] = useState(0);

  useEffect(() => {
    const totalExpenses = expenses.reduce(
      (total, expense) => total + parseFloat(expense.transactionAmount),
      0
    );

    const totalIncomes = incomes.reduce(
      (total, income) => total + parseFloat(income.transactionAmount),
      0
    );
    const balance = totalIncomes - totalExpenses;
    setAccountBalance(balance);
  }, [incomes, expenses]);

  const togglePopup = () => setShowPopup(!showPopup);

  return (
    <>
      <div className={styles.container}>
        <header className={styles.expenseheader}>
          <h2>Expenses</h2>

          <button onClick={togglePopup} className={styles.addexpense}>
            Add new expense
          </button>
        </header>
        <main className={styles.main}>
          {showPopup && <AddExpensePopup onClose={togglePopup} />}
          <ExpenseList expenses={expenses} />

          <div className={styles.balance}>
            Current Balance:{formatAmount(accountBalance)}
          </div>
        </main>
      </div>
    </>
  );
}

export default MainExpense;
