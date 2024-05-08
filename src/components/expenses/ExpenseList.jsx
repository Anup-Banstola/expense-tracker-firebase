import { useState } from "react";
import useDeleteTransaction from "../../hooks/useDeleteTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import EditExpensePopup from "../expenses/EditExpensePopup";
import styles from "./ExpenseList.module.css";
function formatAmount(amount) {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
  }).format(amount);
}

function ExpenseList({ expenses }) {
  const { deleteTransaction } = useDeleteTransaction();
  const { loading } = useGetTransactions();
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  const handleDeleteExpense = async (transactionId) => {
    try {
      await deleteTransaction("expenses", transactionId);
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleEditExpense = (transaction) => {
    setTransactionToEdit(transaction);
    setShowEditPopup(true);
  };
  const closeEditPopup = () => {
    setShowEditPopup(false);
  };

  return (
    <div className={styles.expenseitem}>
      {loading ? (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
          <p>Loading expenses...</p>
        </div>
      ) : expenses.length === 0 ? (
        <div className={styles.noExpenses}>
          <p>No expenses recorded yet.</p>
        </div>
      ) : (
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
              <div className={styles.edit}>
                <div className={styles.btns}>
                  <img
                    src="assets/icons/edit.svg"
                    className={styles.editbtn}
                    onClick={() => handleEditExpense(expense)}
                    title="Edit"
                  />

                  <img
                    src="assets/icons/delete.svg"
                    className={styles.delbtn}
                    onClick={() => handleDeleteExpense(expense.id)}
                    title="Delete"
                  />
                </div>
              </div>
              <div>
                Date: <span className={styles.dates}>{expense.date}</span>
              </div>
            </div>
          </div>
        ))
      )}
      {showEditPopup && transactionToEdit && (
        <EditExpensePopup
          onClose={closeEditPopup}
          transaction={transactionToEdit}
        />
      )}
    </div>
  );
}

export default ExpenseList;
