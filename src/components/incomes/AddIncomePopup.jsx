import styles from "./AddIncomePopup.module.css";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import IncomeForm from "./IncomeForm";

function AddIncomePopup({ onClose }) {
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
        <IncomeForm onSubmit={handleSubmit} />
      </div>
    </>
  );
}

export default AddIncomePopup;
