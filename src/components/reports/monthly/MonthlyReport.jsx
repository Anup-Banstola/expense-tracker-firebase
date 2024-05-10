import MonthlyStatistics from "./MonthlyStatistics";
import styles from "./MonthlyReport.module.css";
import MonthlyDoughNutChart from "./MonthlyDoughNutChart";

function MonthlyReport() {
  return (
    <div className={styles.monthlyreport}>
      <h2 style={{ padding: "10px" }}>Monthly Report</h2>

      <MonthlyStatistics />
      <MonthlyDoughNutChart />
    </div>
  );
}

export default MonthlyReport;
