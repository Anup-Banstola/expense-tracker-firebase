import { useState } from "react";
import styles from "./AddIncomePopup.module.css";
import { useAddTransaction } from "../../hooks/useAddTransaction";

function AddIncomePopup({ onClose }) {
  const { addTransaction, loading, error } = useAddTransaction();
  const [transactionAmount, setTransactionAmount] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newIncome = {
      type: "income",
      transactionAmount: parseFloat(transactionAmount),
      categoryName,
      date,
      description,
    };
    addTransaction(newIncome);

    setTransactionAmount("");
    setCategoryName("");
    setDate("");
    setDescription("");

    onClose();
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.popup}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.amount}>
            <label htmlFor="amount">Income Amount: </label>
            <input
              type="text"
              placeholder="Income Amount"
              id="amount"
              value={transactionAmount}
              onChange={(e) => setTransactionAmount(e.target.value)}
              className={styles.incomefield}
            />
          </div>
          <div className={styles.selectcategory}>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className={styles.inputfield}
              required
            >
              <option value="">Select a category</option>
              <option value="salary">Salary</option>
              <option value="rent">Rent</option>
              <option value="bankaccount">Bank account</option>
              <option value="gift">Gift</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className={styles.date}>
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={styles.inputfield}
              required
            />
          </div>
          <div className={styles.description}>
            <label htmlFor="description">Add description:</label>
            <input
              id="description"
              placeholder="Add description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.descriptionfield}
              required
            />
          </div>

          <button type="submit" className={styles.save}>
            {loading ? "Saving..." : "Save"}
          </button>
          {error && <p>Error: {error.message}</p>}
        </form>
      </div>
    </>
  );
}

export default AddIncomePopup;
