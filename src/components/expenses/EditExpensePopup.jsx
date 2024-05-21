import { useEditTransaction } from "../../hooks/useEditTransaction";
import styles from "./EditExpensePopup.module.css";
import ExpenseForm from "./ExpenseForm";

function EditExpensePopup({ onClose, transaction }) {
  const { editTransaction } = useEditTransaction();

  const handleSubmit = async (transactionData) => {
    await editTransaction("expenses", transaction.id, transactionData);
    onClose();
  };
  console.log(transaction);
  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.popup}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <ExpenseForm
          onSubmit={handleSubmit}
          initialData={transaction}
          isEditing={true}
          onClose={onClose}
        />
      </div>
    </>
  );
}

export default EditExpensePopup;
