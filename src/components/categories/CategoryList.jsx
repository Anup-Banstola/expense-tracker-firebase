import styles from "./CategoryList.module.css";

function CategoryList({ categories }) {
  return (
    <div className={styles.categorylist}>
      {categories.map((category, index) => (
        <div key={index} className={styles.addcategory}>
          <img
            src={`../../../assets/categoryicons/${category.categoryImageName}.svg`}
            onError={(e) => {
              e.target.src = "../../../assets/categoryicons/others.svg";
            }}
          />
          <span className={styles.title}>{category.categoryTitle}</span>
        </div>
      ))}
    </div>
  );
}

export default CategoryList;
