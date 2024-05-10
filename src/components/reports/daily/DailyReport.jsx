import DailyStatistics from "./DailyStatistics";
import DailyDoughNutChart from "./DoughNutChart";

import styles from "./DailyReport.module.css";
import Tabs from "../../tab/Tabs";

function DailyReport() {
  return (
    <div className={styles.dailyreport}>
      <h2 style={{ padding: "10px" }}>Daily Report</h2>

      <DailyStatistics />
      <DailyDoughNutChart />
    </div>
  );
}

export default DailyReport;
