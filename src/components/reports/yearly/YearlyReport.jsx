import Navbar from "../daily/Navbar";
import DoughNutChart from "./DoughNutChart";
import YearlyStatistics from "./YearlyStatistics";
import styles from "./YearlyReport.module.css";

function YearlyReport() {
  return (
    <div className={styles.yearlyreport}>
      <h2 style={{ padding: "10px" }}>Yearly Report</h2>

      <YearlyStatistics />
      <DoughNutChart />
    </div>
  );
}

export default YearlyReport;
