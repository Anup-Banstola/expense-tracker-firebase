import { useState } from "react";
import styles from "./IncomeForm.module.css";
import useGetCategories from "../../hooks/useGetCategories";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

function IncomeForm({
  onSubmit,
  initialData = {},
  isEditing = false,
  onClose = { onClose },
}) {
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
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const MAX_TRANSACTION_AMOUNT = 9999999999; // Set your maximum limit here

  const handleTransactionAmountChange = (e) => {
    let value = e.target.value;

    // Handle backspace separately to allow clearing the input
    if (e.nativeEvent.inputType === "deleteContentBackward") {
      setTransactionAmount(value);
      return;
    }

    // Check if the value is a valid number (integer or floating point)
    const parsedValue = parseFloat(value);
    const isValidNumber = !isNaN(parsedValue);

    if (isValidNumber) {
      // Adjust the value to the maximum limit if it exceeds
      if (parsedValue > MAX_TRANSACTION_AMOUNT) {
        alert("You excedded the maximum limit");
      } else {
        setTransactionAmount(value);
      }
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        transactionAmount: `Transaction amount must be a valid number less than or equal to ${Number.MAX_SAFE_INTEGER}.`,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseFloat(transactionAmount) === 0) {
      alert("You entered a zero");
      onClose();
      return;
    }

    // Disable the form submission to prevent multiple submissions
    if (isSubmitting) return;
    setIsSubmitting(true);

    const transactionData = {
      type: "income",
      transactionAmount: parseFloat(transactionAmount),
      categoryName,
      date: date ? moment(date).format("YYYY-MM-DD") : "",
      description,
    };
    await onSubmit(transactionData);

    // Re-enable the form submission after the submission is complete
    setIsSubmitting(false);
  };

  const handleDateChange = (date) => {
    if (date) {
      setDate(date);
    } else {
      console.error("Invalid date:", date);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.amount}>
        <label htmlFor="amount" className={styles.label}>
          Transaction Amount:
        </label>

        <input
          type="BigInt"
          placeholder="Transaction Amount"
          id="amount"
          value={transactionAmount}
          onChange={handleTransactionAmountChange}
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
        <ReactDatePicker
          selected={date}
          onChange={handleDateChange}
          placeholderText="Select a date"
          className={styles.datepicker}
          required
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="description" className={styles.label}>
          Add description:
        </label>
        <textarea
          id="description"
          placeholder="Add description upto 100 characters"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
          required
        />
      </div>

      <button type="submit" className={styles.button} disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : isEditing ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default IncomeForm;
