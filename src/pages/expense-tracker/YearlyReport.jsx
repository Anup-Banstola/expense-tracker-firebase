import DoughNutChart from "../../components/reports/yearly/DoughNutChart";
import YearlyStatistics from "../../components/reports/yearly/YearlyStatistics";
import styles from "./YearlyReport.module.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

function YearlyReport() {
  const [selectedYear, setSelectedYear] = useState(new Date());

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };
  return (
    <div className={styles.yearlyreport}>
      <div className={styles.yearreport}>
        <h2 style={{ padding: "20px" }}>Yearly Report</h2>
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
