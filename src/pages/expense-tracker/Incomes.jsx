import Sidebar from "../../components/dashboard/Sidebar";
import MainIncome from "../../components/incomes/MainIncome";
import styles from "./Incomes.module.css";

function Incomes() {
  return (
    <div className={styles.container}>
      {/* <Sidebar /> */}
      <MainIncome />
    </div>
  );
}

export default Incomes;
