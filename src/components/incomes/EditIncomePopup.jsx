import { useEditTransaction } from "../../hooks/useEditTransaction";
import styles from "./EditIncomePopup.module.css";
import IncomeForm from "./IncomeForm";

function EditIncomePopup({ onClose, transaction }) {
  const { editTransaction } = useEditTransaction();

  const handleSubmit = async (transactionData) => {
    await editTransaction("incomes", transaction.id, transactionData);

    onClose();
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.popup}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <IncomeForm
          onSubmit={handleSubmit}
          initialData={transaction}
          isEditing={true}
          onClose={onClose}
        />
      </div>
    </>
  );
}

export default EditIncomePopup;
