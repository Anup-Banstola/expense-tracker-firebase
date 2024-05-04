import Navbar from "../daily/Navbar";
import DoughNutChart from "./DoughNutChart";
import YearlyStatistics from "./YearlyStatistics";
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
    <div className={styles.yearlyreport}>
      <h2 style={{ padding: "10px" }}>Reports</h2>
      <Navbar NavLinks={NavLinks} />
      <YearlyStatistics />
      <DoughNutChart />
    </div>
  );
}

export default MainReport;
