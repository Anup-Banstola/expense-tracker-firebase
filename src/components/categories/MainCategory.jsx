import { useState } from "react";
import styles from "./MainCategory.module.css";
import AddCategoryPopup from "./AddCategoryPopup";
import CategoryList from "./CategoryList";
import useGetCategories from "../../hooks/useGetCategories";

function MainCategory() {
  const [showPopup, setShowPopup] = useState(false);

  const { categories, loading, error } = useGetCategories();

  const togglePopup = () => setShowPopup(!showPopup);

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
            <AddCategoryPopup categories={categories} onClose={togglePopup} />
          )}
          {loading ? (
            <div className={styles.loaderContainer}>
              <div className={styles.loader}></div>
              <p>Loading categories...</p>
            </div>
          ) : error ? (
            <p>Error getting categoires:{error.message}</p>
          ) : (
            categories.length > 0 && <CategoryList categories={categories} />
          )}
        </main>
      </div>
    </>
  );
}

export default MainCategory;
