import DailyStatistics from "../../components/reports/daily/DailyStatistics";
import DailyDoughNutChart from "../../components/reports/daily/DoughNutChart";

import styles from "./DailyReport.module.css";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DailyReport() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <div className={styles.dailyreport}>
      <div className={styles.dayreport}>
        <h2 style={{ padding: "10px" }}>Daily Report</h2>
        <div className={styles.selectday}>
          <ReactDatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            showFullMonthYearPicker
            placeholderText="Select a date"
            className={styles.datepicker}
          />
        </div>
      </div>
      {selectedDate && (
        <>
          <DailyStatistics selectedDate={selectedDate} />
          <DailyDoughNutChart selectedDate={selectedDate} />
        </>
      )}
    </div>
  );
}

export default DailyReport;
