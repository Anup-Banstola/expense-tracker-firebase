import { useState } from "react";
import useDeleteTransaction from "../../hooks/useDeleteTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import styles from "./IncomeList.module.css";
import EditIncomePopup from "./EditIncomePopup";

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

  const handleDeleteIncome = async (transactionId) => {
    try {
      await deleteTransaction("incomes", transactionId);
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };

  const handleEditIncome = (transaction) => {
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
          <p>Loading incomes...</p>
        </div>
      ) : incomes.length === 0 ? (
        <p className={styles.noIncomes}>No incomes recorded yet. </p>
      ) : (
        <table className={styles.incomeTable}>
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
            {incomes.map((income, index) => (
              <tr key={index}>
                <td>{formatAmount(income.transactionAmount)}</td>
                <td>{income.categoryName}</td>
                <td>{income.description}</td>
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
    </div>
  );
}

export default IncomeList;
