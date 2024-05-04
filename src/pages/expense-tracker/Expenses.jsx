import Sidebar from "../../components/dashboard/Sidebar";
import MainExpense from "../../components/expenses/MainExpense";
import styles from "./Expenses.module.css";

function Expenses() {
  return (
    <div className={styles.expenses}>
      <Sidebar />
      <MainExpense />
    </div>
  );
}

export default Expenses;
