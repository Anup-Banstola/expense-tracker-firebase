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
    <div className={styles.incomeitem}>
      {loading ? (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
          <p>Loading incomes...</p>
        </div>
      ) : incomes.length === 0 ? (
        <p className={styles.noIncomes}>No incomes recorded yet. </p>
      ) : (
        incomes.map((income, index) => (
          <div key={index} className={styles.incomelist}>
            <div className={styles.income}>
              <div>
                Income Amount:{" "}
                <span className={styles.incamount}>
                  {formatAmount(income.transactionAmount)}
                </span>
              </div>
              <div>
                Category:{" "}
                <span className={styles.catagory}>{income.categoryName}</span>
              </div>
              <div className={styles.description}>
                <span>Description:</span>
                <div className={styles.wraptext}>{income.description}</div>
              </div>
            </div>
            <div className={styles.date}>
              <div className={styles.edit}>
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
              </div>
              <div>
                Date: <span className={styles.dates}>{income.date}</span>
              </div>
            </div>
          </div>
        ))
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
