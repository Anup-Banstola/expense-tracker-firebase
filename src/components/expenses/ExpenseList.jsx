import { useState } from "react";
import useDeleteTransaction from "../../hooks/useDeleteTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import EditExpensePopup from "../expenses/EditExpensePopup";
import styles from "./ExpenseList.module.css";
import FeedbackPopup from "./FeedbackPopup";

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
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleDeleteExpense = async (transactionId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    if (!isConfirmed) {
      return;
    }
    try {
      await deleteTransaction("expenses", transactionId);
      setFeedbackMessage("Expense transaction deleted successfully.");
      setIsError(false);
      setTimeout(() => setFeedbackMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting expense:", error);
      setFeedbackMessage("Error deleting expense. Please try again.");
      setIsError(true);
      setTimeout(() => setFeedbackMessage(""), 3000);
    }
  };

  const handleEditExpense = (transaction) => {
    setTransactionToEdit(transaction);
    setShowEditPopup(true);
  };

  const closeEditPopup = () => {
    setShowEditPopup(false);
  };
  const closeFeedbackPopup = () => {
    setFeedbackMessage("");
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
        <div>
          <table className={styles.expenseTable}>
            <thead>
              <tr>
                <th>SN</th>
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
                  <td>{index + 1}</td>
                  <td>{formatAmount(expense.transactionAmount)}</td>
                  <td className={styles.cataName}>{expense.categoryName}</td>
                  <td className={styles.description}>{expense.description}</td>
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
        </div>
      )}
      {showEditPopup && transactionToEdit && (
        <EditExpensePopup
          onClose={closeEditPopup}
          transaction={transactionToEdit}
        />
      )}
      {feedbackMessage && (
        <FeedbackPopup message={feedbackMessage} onClose={closeFeedbackPopup} />
      )}
    </div>
  );
}

export default ExpenseList;
