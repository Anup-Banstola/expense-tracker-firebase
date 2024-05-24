import { useState } from "react";
import styles from "./AddCategoryPopup.module.css";
import { useAddCategory } from "../../hooks/useAddCategory";

function AddCategoryPopup({ onClose, categories }) {
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryColor, setCategoryColor] = useState("");
  const [colorError, setColorError] = useState(false);
  const { addCategory } = useAddCategory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryColor) {
      setColorError(true);
      return;
    }

    const isExistingCategory = categories.some(
      (category) => category.categoryTitle === categoryTitle
    );
    if (isExistingCategory) {
      alert("Category already exists");
      onClose();
      return;
    }

    try {
      await addCategory({
        categoryTitle,
        categoryColor,
      });
      setCategoryTitle("");
      setCategoryColor("");
      setColorError(false);
      onClose();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleColorChange = (e) => {
    setCategoryColor(e.target.value);
    setColorError(false);
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.popup}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.input}>
            <label htmlFor="title">Category Title:</label>

            <input
              type="text"
              placeholder="Category Name"
              id="title"
              value={categoryTitle}
              onChange={(e) => setCategoryTitle(e.target.value)}
              className={styles.titlefield}
              required
              maxLength={50}
            />
          </div>
          <div className={styles.image}>
            <label htmlFor="image">Category Color:</label>
            <input
              type="color"
              value={categoryColor}
              onChange={handleColorChange}
              className={styles.imagefield}
              required
            />
            {colorError && (
              <p className={styles.error}>Please select a color.</p>
            )}
          </div>

          <button type="submit" className={styles.addcategory}>
            Add Category
          </button>
        </form>
      </div>
    </>
  );
}

export default AddCategoryPopup;
