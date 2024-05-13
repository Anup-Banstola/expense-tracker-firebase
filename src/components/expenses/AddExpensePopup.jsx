import styles from "./AddExpensePopup.module.css";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import ExpenseForm from "./ExpenseForm";

function AddExpensePopup({ onClose }) {
  const { addTransaction } = useAddTransaction();

  const handleSubmit = async (transactionData) => {
    await addTransaction(transactionData);
    onClose();
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.popup}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <ExpenseForm onSubmit={handleSubmit} className={styles.expenseform} />
      </div>
    </>
  );
}

export default AddExpensePopup;
