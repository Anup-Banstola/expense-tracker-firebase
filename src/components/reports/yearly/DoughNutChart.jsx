import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import styles from "./DoughNutChart.module.css";
import { useGetTransactions } from "../../../hooks/useGetTransactions";
import useGetCategories from "../../../hooks/useGetCategories";

function formatAmount(amount) {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
  }).format(amount);
}

function DoughNutChart({ selectedYear }) {
  const { incomes, expenses } = useGetTransactions();
  const { categories } = useGetCategories();
  const [yearlyExpenses, setYearlyExpenses] = useState({});
  const [yearlyIncomes, setYearlyIncomes] = useState({});

  const formattedSelectedYear = selectedYear.getFullYear();

  useEffect(() => {
    const aggregateTransactionsByYear = (transactions) => {
      const yearlyData = {};
      transactions.forEach((transaction) => {
        const year = new Date(transaction.date).getFullYear();
        if (!yearlyData[year]) {
          yearlyData[year] = {};
        }
        const category = transaction.categoryName;
        if (!yearlyData[year][category]) {
          yearlyData[year][category] = 0;
        }
        yearlyData[year][category] += Number(transaction.transactionAmount);
      });
      return yearlyData;
    };

    setYearlyExpenses(aggregateTransactionsByYear(expenses));
    setYearlyIncomes(aggregateTransactionsByYear(incomes));
  }, [incomes, expenses]);

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const getCategoryColors = () => {
    const categoryColors = {};
    categories.forEach((category) => {
      if (!categoryColors[category.categoryTitle]) {
        categoryColors[category.categoryTitle] =
          category.categoryColor || getRandomColor();
      }
    });
    return categoryColors;
  };
  const categoryColors = getCategoryColors();

  const hasTransactions =
    Object.keys(yearlyExpenses[formattedSelectedYear] || {}).length > 0 ||
    Object.keys(yearlyIncomes[formattedSelectedYear] || {}).length > 0;

  if (!hasTransactions) return null;

  return (
    <>
      <div className={styles.yearly}>
        {yearlyExpenses[formattedSelectedYear] &&
          Object.keys(yearlyExpenses[formattedSelectedYear]).length > 0 && (
            <div className={styles.yearlychart}>
              <h3 className={styles.chart}>
                Expenses - {formattedSelectedYear}
              </h3>

              <Chart
                type="donut"
                width={450}
                height={350}
                series={Object.values(yearlyExpenses[formattedSelectedYear])}
                options={{
                  labels: Object.keys(yearlyExpenses[formattedSelectedYear]),
                  colors: Object.keys(
                    yearlyExpenses[formattedSelectedYear]
                  ).map((category) => categoryColors[category]),

                  plotOptions: {
                    pie: {
                      donut: {
                        labels: {
                          show: false,
                        },
                      },
                    },
                  },
                  dataLabels: {
                    enabled: true,
                  },
                  legend: {
                    position: "bottom",
                  },
                  responsive: [
                    {
                      breakpoint: 600,
                      options: {
                        chart: {
                          width: "100%",
                          height: "450",
                        },
                        legend: {
                          position: "bottom",
                        },
                      },
                    },
                  ],
                  tooltip: {
                    enabled: true,
                    y: {
                      formatter: function (val) {
                        return formatAmount(val.toFixed(2));
                      },
                    },
                  },
                }}
              />
            </div>
          )}
        {yearlyIncomes[formattedSelectedYear] &&
          Object.keys(yearlyIncomes[formattedSelectedYear]).length > 0 && (
            <div className={styles.yearlychart}>
              <h3 className={styles.chart}>
                Incomes - {formattedSelectedYear}
              </h3>

              <Chart
                type="donut"
                width={450}
                height={350}
                series={Object.values(yearlyIncomes[formattedSelectedYear])}
                options={{
                  labels: Object.keys(yearlyIncomes[formattedSelectedYear]),
                  colors: Object.keys(yearlyIncomes[formattedSelectedYear]).map(
                    (category) => categoryColors[category]
                  ),

                  plotOptions: {
                    pie: {
                      donut: {
                        labels: {
                          show: false,
                        },
                      },
                    },
                  },
                  dataLabels: {
                    enabled: true,
                  },
                  legend: {
                    position: "bottom",
                  },
                  responsive: [
                    {
                      breakpoint: 600,
                      options: {
                        chart: {
                          width: "100%",
                          height: "450",
                        },
                        legend: {
                          position: "bottom",
                        },
                      },
                    },
                  ],
                  tooltip: {
                    enabled: true,
                    y: {
                      formatter: function (val) {
                        return formatAmount(val.toFixed(2));
                      },
                    },
                  },
                }}
              />
            </div>
          )}
      </div>
    </>
  );
}

export default DoughNutChart;
