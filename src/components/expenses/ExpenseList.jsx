import styles from "./ExpenseList.module.css";
import useDeleteTransaction from "../../hooks/useDeleteTransaction";

function formatAmount(amount) {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
  }).format(amount);
}

function ExpenseList({ expenses }) {
  const { deleteTransaction } = useDeleteTransaction();
  const handleDeleteExpense = async (transactionId) => {
    try {
      await deleteTransaction("expenses", transactionId);
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };
  return (
    <div className={styles.expenseitem}>
      {expenses &&
        expenses.map((expense, index) => (
          <div key={index} className={styles.expenselist}>
            <div className={styles.transaction}>
              <div>
                Amount:{" "}
                <span className={styles.amount}>
                  {formatAmount(expense.transactionAmount)}
                </span>
              </div>
              <div className={styles.category}>
                Category:{" "}
                <span className={styles.catagory}>{expense.categoryName}</span>
              </div>
              <div className={styles.description}>
                Description:
                <div className={styles.wraptext}>{expense.description}</div>
              </div>
            </div>
            <div className={styles.date}>
              <span
                className={styles.deletebtn}
                onClick={() => handleDeleteExpense(expense.id)}
              >
                X
              </span>
              <div>
                Date: <span className={styles.dates}>{expense.date}</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ExpenseList;
