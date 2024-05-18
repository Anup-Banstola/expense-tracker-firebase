import { useState } from "react";
import useDeleteTransaction from "../../hooks/useDeleteTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import styles from "./IncomeList.module.css";
import EditIncomePopup from "./EditIncomePopup";
import FeedbackPopup from "../expenses/FeedbackPopup";

function formatAmount(amount) {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
  }).format(amount);
}

function IncomeList({ incomes }) {
  const { deleteTransaction } = useDeleteTransaction();
  const { loading } = useGetTransactions();
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleDeleteIncome = async (transactionId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    if (!isConfirmed) {
      return;
    }
    try {
      await deleteTransaction("incomes", transactionId);
      setFeedbackMessage("Income transaction deleted successfully.");
      setIsError(false);
      setTimeout(() => setFeedbackMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting income:", error);
      setFeedbackMessage("Error deleting income. Please try again.");
      setIsError(true);
      setTimeout(() => setFeedbackMessage(""), 3000);
    }
  };

  const handleEditIncome = (transaction) => {
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
          <p>Loading incomes...</p>
        </div>
      ) : incomes.length === 0 ? (
        <p className={styles.noIncomes}>No incomes recorded yet. </p>
      ) : (
        <table className={styles.incomeTable}>
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
            {incomes.map((income, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{formatAmount(income.transactionAmount)}</td>
                <td>{income.categoryName}</td>
                <td className={styles.description}>{income.description}</td>
                <td>{income.date}</td>
                <td>
                  <div className={styles.btns}>
                    <img
                      src="assets/icons/edit.svg"
                      className={styles.editbtn}
                      onClick={() => handleEditIncome(income)}
                      title="Edit"
                    />
                    <img
                      src="assets/icons/delete.svg"
                      className={styles.delbtn}
                      onClick={() => handleDeleteIncome(income.id)}
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
        <EditIncomePopup
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

export default IncomeList;
