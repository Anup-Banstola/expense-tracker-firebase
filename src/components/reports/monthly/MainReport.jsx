import Navbar from "../daily/Navbar";
import MonthlyStatistics from "./MonthlyStatistics";
import styles from "./MainReport.module.css";
import MonthlyDoughNutChart from "./MonthlyDoughNutChart";

const NavLinks = [
  {
    title: "Daily",
    link: "/reports/dailyreport",
  },
  {
    title: "Monthly",
    link: "/reports/monthlyreport",
  },
  {
    title: "Yearly",
    link: "/reports/yearlyreport",
  },
];

function MainReport() {
  return (
    <div className={styles.monthlyreport}>
      <h2 style={{ padding: "10px" }}>Reports</h2>
      <Navbar NavLinks={NavLinks} />
      <MonthlyStatistics />
      <MonthlyDoughNutChart />
    </div>
  );
}

export default MainReport;
