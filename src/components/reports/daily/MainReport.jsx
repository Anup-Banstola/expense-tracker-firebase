import DailyStatistics from "./DailyStatistics";
import DailyDoughNutChart from "./DoughNutChart";
import Navbar from "./Navbar";
import styles from "./MainReport.module.css";

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
    <div className={styles.dailyreport}>
      <h2 style={{ padding: "10px" }}>Reports</h2>
      <Navbar NavLinks={NavLinks} />
      <DailyStatistics />
      <DailyDoughNutChart />
    </div>
  );
}

export default MainReport;
