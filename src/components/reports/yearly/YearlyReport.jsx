import Navbar from "../daily/Navbar";
import DoughNutChart from "./DoughNutChart";
import YearlyStatistics from "./YearlyStatistics";
import styles from "./YearlyReport.module.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

function YearlyReport() {
  const [selectedYear, setSelectedYear] = useState();

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };
  return (
    <div className={styles.yearlyreport}>
      <div className={styles.yearreport}>
        <h2 style={{ padding: "10px" }}>Yearly Report</h2>
        <div className={styles.year}>
          <ReactDatePicker
            selected={selectedYear}
            onChange={handleYearChange}
            dateFormat={"yyyy"}
            showYearPicker
            placeholderText="Select year"
            className={styles.yearpicker}
          />
        </div>
      </div>

      {selectedYear && (
        <>
          <YearlyStatistics selectedYear={selectedYear} />
          <DoughNutChart selectedYear={selectedYear} />
        </>
      )}
    </div>
  );
}

export default YearlyReport;
