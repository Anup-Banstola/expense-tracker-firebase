import Sidebar from "../../components/dashboard/Sidebar";
import MainReport from "../../components/reports/yearly/YearlyReport";

import styles from "./YearlyReport.module.css";

function Yearlyreport() {
  return (
    <div className={styles.container}>
      {/* <Sidebar /> */}
      <MainReport />
    </div>
  );
}

export default Yearlyreport;
