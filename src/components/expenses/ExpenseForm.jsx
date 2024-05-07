import { useState } from "react";
import styles from "./ExpenseForm.module.css";
useState;

function ExpenseForm({ onSubmit, initialData = {}, isEditing = false }) {
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
        <label htmlFor="amount">Transaction Amount:</label>

        <input
          type="int"
          placeholder="Transaction Amount"
          id="amount"
          value={transactionAmount}
          onChange={(e) => setTransactionAmount(e.target.value)}
          className={styles.expensefield}
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
          <option value="food">Food</option>
          <option value="rent">Rent</option>
          <option value="education">Education</option>
          <option value="medicine">Medicine</option>
          <option value="grocery">Grocery</option>
          <option value="entertainment">Entertainment</option>
          <option value="clothing">Clothing</option>
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
          type="text"
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

export default ExpenseForm;
