import { useState } from "react";
import styles from "./IncomeForm.module.css";
import useGetCategories from "../../hooks/useGetCategories";

function IncomeForm({ onSubmit, initialData = {}, isEditing = false }) {
  const { categories } = useGetCategories();
  console.log(categories);
  const categoryTitles = categories.map((item) => item.categoryTitle);

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
        <label htmlFor="amount" className={styles.label}>
          Transaction Amount:
        </label>
        <input
          type="number"
          placeholder="Transaction Amount"
          id="amount"
          value={transactionAmount}
          onChange={(e) => setTransactionAmount(e.target.value)}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="category" className={styles.label}>
          Category
        </label>
        <select
          id="category"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className={styles.input}
          required
        >
          <option value="">Select a category</option>
          {categoryTitles.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.row}>
        <label htmlFor="date" className={styles.label}>
          Date:
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="description" className={styles.label}>
          Add description:
        </label>
        <textarea
          id="description"
          placeholder="Add description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
          required
        />
      </div>

      <button type="submit" className={styles.button}>
        {isEditing ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default IncomeForm;
