import useGetCategories from "../../hooks/useGetCategories";
import styles from "./CategoryList.module.css";

function CategoryList({ categories }) {
  const { deleteCategory } = useGetCategories();

  const handleDeleteCategory = (categoryId) => deleteCategory(categoryId);
  console.log(categories);

  return (
    <div className={styles.categorylist}>
      {categories.map((category, index) => (
        <div key={index} className={styles.addcategory}>
          {category.categoryColor && (
            <div
              className={styles.colorIndicator}
              style={{ backgroundColor: category.categoryColor }}
            ></div>
          )}

          <span className={styles.title}>{category.categoryTitle}</span>
          <img
            src="assets/icons/delete.svg"
            className={styles.delbtn}
            onClick={() => handleDeleteCategory(category.id)}
            title="Delete"
          />
        </div>
      ))}
    </div>
  );
}

export default CategoryList;
