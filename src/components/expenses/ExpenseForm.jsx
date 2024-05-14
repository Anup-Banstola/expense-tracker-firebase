import { useState } from "react";
import styles from "./ExpenseForm.module.css";
import useGetCategories from "../../hooks/useGetCategories";
import useDebounce from "../../hooks/useDebounce";

function ExpenseForm({ onSubmit, initialData = {}, isEditing = false }) {
  const { categories } = useGetCategories();

  const categoryTitles = categories.map((item) => item.categoryTitle);
  console.log(categoryTitles);

  const [transactionAmount, setTransactionAmount] = useState(
    initialData.transactionAmount || ""
  );
  const [categoryName, setCategoryName] = useState(
    initialData.categoryName || ""
  );
  const [date, setDate] = useState(initialData.date || "");
  const [description, setDescription] = useState(initialData.description || "");

  const debouncedTransactionAmount = useDebounce(transactionAmount, 500);
  const debouncedCategoryName = useDebounce(categoryName, 500);
  const debouncedDate = useDebounce(date, 500);
  const debouncedDescription = useDebounce(description, 500);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transactionData = {
      type: "expense",
      transactionAmount: parseFloat(debouncedTransactionAmount),
      debouncedCategoryName,
      debouncedDate,
      debouncedDescription,
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

          {categoryTitles.map((title, index) => (
            <option key={index} value={title}>
              {title}
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
          type="text"
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

export default ExpenseForm;
