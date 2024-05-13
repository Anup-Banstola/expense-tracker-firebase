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
    <div className={styles.container}>
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
        <table className={styles.expenseTable}>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Category</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td>{formatAmount(expense.transactionAmount)}</td>
                <td>{expense.categoryName}</td>
                <td>{expense.description}</td>
                <td>{expense.date}</td>
                <td>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
