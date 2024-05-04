import MainCategory from "../../components/categories/MainCategory";
import Sidebar from "../../components/dashboard/Sidebar";
import styles from "./Categories.module.css";

function Categories() {
  return (
    <div className={styles.catagories}>
      <Sidebar />
      <MainCategory />
    </div>
  );
}

export default Categories;
