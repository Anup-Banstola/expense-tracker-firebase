import { Line } from "react-chartjs-2";
import styles from "./Chart.module.css";

const BASE_URL = "http://localhost:9000";

import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  ArcElement,
} from "chart.js";
import { useState } from "react";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,

  Legend,
  ArcElement
);

function Chart() {
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [sortedMonths, setSortedMonths] = useState([]);

  useState(() => {
    const fetchData = async () => {
      try {
        const expensesResponse = await fetch(`${BASE_URL}/expenses`);
        const expensesData = await expensesResponse.json();

        const incomesResponse = await fetch(`${BASE_URL}/incomes`);
        const incomesData = await incomesResponse.json();

        const expenseMonths = expensesData.map((transaction) =>
          new Date(transaction.date).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })
        );

        const incomeMonths = incomesData.map((transaction) =>
          new Date(transaction.date).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })
        );
        const allMonthsSet = new Set([...expenseMonths, ...incomeMonths]);

        const sortedMonths = Array.from(allMonthsSet).sort((a, b) => {
          const [monthA, yearA] = a.split(" ");
          const [monthB, yearB] = b.split(" ");

          // Compare years first
          if (yearA !== yearB) {
            return yearA - yearB;
          }

          // If years are equal, compare months
          const monthOrder = {
            Jan: 1,
            Feb: 2,
            Mar: 3,
            Apr: 4,
            May: 5,
            Jun: 6,
            Jul: 7,
            Aug: 8,
            Sep: 9,
            Oct: 10,
            Nov: 11,
            Dec: 12,
          };
          return monthOrder[monthA] - monthOrder[monthB];
        });
        setSortedMonths(sortedMonths);
        setExpenseData(expensesData);
        setIncomeData(incomesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Initialize data objects for expenses and incomes
  const expensesByMonth = {};
  const incomesByMonth = {};

  // Populate data objects with summed amounts for each month
  expenseData.forEach((expense) => {
    const month = new Date(expense.date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
    expensesByMonth[month] =
      (expensesByMonth[month] || 0) + parseFloat(expense.transactionAmount);
  });

  incomeData.forEach((income) => {
    const month = new Date(income.date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
    incomesByMonth[month] =
      (incomesByMonth[month] || 0) + parseFloat(income.transactionAmount);
  });

  // Create dataset for expenses
  const expensesData = sortedMonths.map((month) => expensesByMonth[month] || 0);

  // Create dataset for incomes
  const incomesData = sortedMonths.map((month) => incomesByMonth[month] || 0);

  const data = {
    labels: sortedMonths,

    datasets: [
      {
        label: "Expenses",
        data: expensesData,
        borderColor: "rgba(254,37,37)",
        backgroundColor: "rgba(254,37,37,0.2)",

        cubicInterpolationMode: "monotone",
      },
      {
        label: "Incomes",
        data: incomesData,
        borderColor: "rgba(20, 128, 76)",
        backgroundColor: "rgba(20, 128, 76,0.2)",
        cubicInterpolationMode: "monotone",
      },
    ],
  };
  return (
    <div className={styles.chartContainer}>
      <Line data={data} className={styles.chart} />
    </div>
  );
}
export default Chart;
