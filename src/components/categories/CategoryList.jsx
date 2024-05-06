import useGetCategories from "../../hooks/useGetCategories";
import styles from "./CategoryList.module.css";

function CategoryList({ categories }) {
  const { deleteCategory } = useGetCategories();

  const handleDeleteCategory = (categoryId) => deleteCategory(categoryId);

  return (
    <div className={styles.categorylist}>
      {categories.map((category, index) => (
        <div key={index} className={styles.addcategory}>
          <img
            src={`../../../assets/categoryicons/${category.categoryImageName}.svg`}
            onError={(e) => {
              e.target.src = "../../../assets/categoryicons/others.svg";
            }}
            alt={category.categoryTitle}
          />
          <span className={styles.title}>{category.categoryTitle}</span>
          <button
            className={styles.deleteButton}
            onClick={() => handleDeleteCategory(category.id)}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}

export default CategoryList;
