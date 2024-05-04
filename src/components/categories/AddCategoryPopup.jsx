import { useState } from "react";

import styles from "./AddCategoryPopup.module.css";
function AddCategoryPopup({ onClose, onAddCategory }) {
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryImageName, setCategoryImageName] = useState("");

  const BASE_URL = "http://localhost:9000";

  async function handleSubmit(e) {
    e.preventDefault();

    const newCategory = { categoryTitle, categoryImageName };
    try {
      const response = await fetch(`${BASE_URL}/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCategory),
      });
      if (!response.ok) {
        throw new Error("Failed to add category.");
      }
      onAddCategory(newCategory);
      setCategoryTitle("");
      setCategoryImageName("");
      onClose();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  }

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
            />
          </div>
          <div className={styles.image} htmlFor="image">
            <label>Category Image:</label>
            <input
              type="text"
              placeholder="Image Name"
              value={categoryImageName.toLowerCase()}
              onChange={(e) => setCategoryImageName(e.target.value)}
              className={styles.imagefield}
              required
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
