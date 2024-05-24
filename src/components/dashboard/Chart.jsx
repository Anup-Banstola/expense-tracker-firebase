import { Line } from "react-chartjs-2";
import styles from "./Chart.module.css";

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
import { useState, useEffect } from "react";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { toPadding } from "chart.js/helpers";

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
  const { incomes, expenses } = useGetTransactions();
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [sortedMonths, setSortedMonths] = useState([]);

  useEffect(() => {
    const expenseMonths = expenses.map((transaction) =>
      new Date(transaction.date).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    );

    const incomeMonths = incomes.map((transaction) =>
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
    setExpenseData(expenses);
    setIncomeData(incomes);
  }, [incomes, expenses]);

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
        borderColor: "#9b0a00",
        cubicInterpolationMode: "monotone",
      },
      {
        label: "Incomes",
        data: incomesData,
        borderColor: "#02401c",
        cubicInterpolationMode: "monotone",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          generateLabels: (chart) => {
            const labels = chart.data.datasets.map((dataset, i) => {
              return {
                text: dataset.label,
                fillStyle: dataset.borderColor,
              };
            });
            return labels;
          },
        },
      },
    },
  };

  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.overview}>Overview</h2>
      <Line data={data} options={options} className={styles.chart} />
    </div>
  );
}
export default Chart;
