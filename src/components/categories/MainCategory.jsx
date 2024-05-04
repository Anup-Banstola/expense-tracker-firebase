import { useState, useEffect } from "react";
import styles from "./MainCategory.module.css";

import AddCategoryPopup from "./AddCategoryPopup";

import CategoryList from "./CategoryList";

const BASE_URL = "http://localhost:9000";

function MainCategory() {
  const [showPopup, setShowPopup] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await fetch(`${BASE_URL}/categories`);
        const categoriesData = await categoriesResponse.json();
        console.log(categoriesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const togglePopup = () => setShowPopup(!showPopup);

  const handleAddCategory = (newCategory) => {
    const isExistingCategory = categories.some(
      (category) => category.categoryTitle === newCategory.categoryTitle
    );
    if (!isExistingCategory) {
      setCategories([...categories, newCategory]);
      setShowPopup(false);
    } else {
      alert("Category already exists");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <header className={styles.categoryheader}>
          <h2>Categories</h2>
          <button onClick={togglePopup} className={styles.addCategory}>
            Add new category
          </button>
        </header>
        <main>
          {showPopup && (
            <AddCategoryPopup
              onClose={togglePopup}
              onAddCategory={handleAddCategory}
            />
          )}
          <CategoryList categories={categories} />
        </main>
      </div>
    </>
  );
}

export default MainCategory;
