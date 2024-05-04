import Sidebar from "../../components/dashboard/Sidebar";
import MainReport from "../../components/reports/monthly/MainReport";

import styles from "./MonthlyReport.module.css";

function Monthlyreport() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <MainReport />
    </div>
  );
}

export default Monthlyreport;
