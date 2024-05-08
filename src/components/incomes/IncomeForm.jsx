import { useState } from "react";
import styles from "./IncomeForm.module.css";

function IncomeForm({ onSubmit, initialData = {}, isEditing = false }) {
  const [transactionAmount, setTransactionAmount] = useState(
    initialData.transactionAmount || ""
  );
  const [categoryName, setCategoryName] = useState(
    initialData.categoryName || ""
  );
  const [date, setDate] = useState(initialData.date || "");
  const [description, setDescription] = useState(initialData.description || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transactionData = {
      type: "income",
      transactionAmount: parseFloat(transactionAmount),
      categoryName,
      date,
      description,
    };
    await onSubmit(transactionData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.amount}>
        <label htmlFor="amount">Income Amount: </label>
        <input
          type="number"
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
        <textarea
          id="description"
          placeholder="Add description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.descriptionfield}
          required
        />
      </div>

      <button type="submit" className={styles.save}>
        {isEditing ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default IncomeForm;
