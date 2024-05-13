import MonthlyStatistics from "./MonthlyStatistics";
import styles from "./MonthlyReport.module.css";
import MonthlyDoughNutChart from "./MonthlyDoughNutChart";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function MonthlyReport() {
  const [selectedMonth, setSelectedMonth] = useState();
  const handleMonthChange = (date) => {
    setSelectedMonth(date);
  };

  return (
    <div className={styles.monthlyreport}>
      <div className={styles.datepicker}>
        <h2 style={{ padding: "10px" }}>Monthly Report</h2>
        <div className={styles.selectmonth}>
          <ReactDatePicker
            selected={selectedMonth}
            onChange={handleMonthChange}
            dateFormat={"MM/yyyy"}
            showMonthYearPicker
            className={styles.monthpicker}
            placeholderText="Select month"
          />
        </div>
      </div>

      {selectedMonth && (
        <>
          <MonthlyStatistics selectedMonth={selectedMonth} />
          <MonthlyDoughNutChart selectedMonth={selectedMonth} />
        </>
      )}
    </div>
  );
}

export default MonthlyReport;
