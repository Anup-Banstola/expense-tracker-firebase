import Sidebar from "../../components/dashboard/Sidebar";
import MainReport from "../../components/reports/daily/MainReport";
import styles from "./DailyReport.module.css";

function DailyReport() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <MainReport />
    </div>
  );
}

export default DailyReport;
