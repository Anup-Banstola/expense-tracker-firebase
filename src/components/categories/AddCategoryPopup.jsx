import { useState } from "react";
import styles from "./AddCategoryPopup.module.css";
import { useAddCategory } from "../../hooks/useAddCategory";

function AddCategoryPopup({ onClose, categories }) {
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryColor, setCategoryColor] = useState("");
  const { addCategory } = useAddCategory();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      onClose();
    } catch (error) {
      console.error("Error adding category:", error);
    }
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
              placeholder="Category Title"
              id="title"
              value={categoryTitle}
              onChange={(e) => setCategoryTitle(e.target.value)}
              className={styles.titlefield}
              maxLength={25}
            />
          </div>
          <div className={styles.image}>
            <label htmlFor="image">Category Color:</label>
            <input
              type="color"
              value={categoryColor}
              onChange={(e) => setCategoryColor(e.target.value)}
              className={styles.imagefield}
            />
          </div>

          <button type="submit" className={styles.addcategory}>
            + Add Category
          </button>
        </form>
      </div>
    </>
  );
}

export default AddCategoryPopup;
