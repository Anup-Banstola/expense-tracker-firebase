import MonthlyStatistics from "../../components/reports/monthly/MonthlyStatistics";
import styles from "./MonthlyReport.module.css";
import MonthlyDoughNutChart from "../../components/reports/monthly/MonthlyDoughNutChart";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function MonthlyReport() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const handleMonthChange = (date) => {
    setSelectedMonth(date);
  };

  return (
    <div className={styles.monthlyreport}>
      <div className={styles.datepicker}>
        <h2 style={{ padding: "20px" }}>Monthly Report</h2>
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
