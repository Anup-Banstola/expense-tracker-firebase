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

function DoughNutChart({ selectedDate }) {
  const { incomes, expenses } = useGetTransactions();
  const { categories } = useGetCategories();
  const [dailyExpenses, setDailyExpenses] = useState({});
  const [dailyIncomes, setDailyIncomes] = useState({});
  const formattedSelectedDate = selectedDate.toLocaleDateString();

  useEffect(() => {
    const aggregateTransactionsByDay = (transactions) => {
      const dailyData = {};
      transactions.forEach((transaction) => {
        const date = new Date(transaction.date).toLocaleDateString();
        if (!dailyData[date]) {
          dailyData[date] = {};
        }
        const category = transaction.categoryName;
        if (!dailyData[date][category]) {
          dailyData[date][category] = 0;
        }
        dailyData[date][category] += Number(transaction.transactionAmount);
      });
      return dailyData;
    };

    setDailyExpenses(aggregateTransactionsByDay(expenses));
    setDailyIncomes(aggregateTransactionsByDay(incomes));
  }, [expenses, incomes]);

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
    Object.keys(dailyExpenses[formattedSelectedDate] || {}).length > 0 ||
    Object.keys(dailyIncomes[formattedSelectedDate] || {}).length > 0;

  if (!hasTransactions) return null;

  return (
    <>
      <div className={styles.dailyreport}>
        {dailyExpenses[formattedSelectedDate] &&
          Object.keys(dailyExpenses[formattedSelectedDate]).length > 0 && (
            <div className={styles.dailychart}>
              <h3 className={styles.chart}>
                Expenses - {formattedSelectedDate}
              </h3>

              <Chart
                type="donut"
                width={450}
                height={350}
                series={Object.values(dailyExpenses[formattedSelectedDate])}
                options={{
                  labels: Object.keys(dailyExpenses[formattedSelectedDate]),
                  colors: Object.keys(dailyExpenses[formattedSelectedDate]).map(
                    (category) => categoryColors[category]
                  ),

                  plotOptions: {
                    pie: {
                      donut: {
                        labels: {
                          show: true,
                          total: {
                            show: true,
                            fontSize: 25,
                            color: "#438024",
                            formatter: function (w) {
                              return formatAmount(
                                w.globals.seriesTotals
                                  .reduce((a, b) => a + b, 0)
                                  .toFixed(2)
                              );
                            },
                          },
                        },
                      },
                    },
                  },
                  dataLabels: {
                    enabled: true,
                  },
                  responsive: [
                    {
                      breakpoint: 700,
                      options: {
                        chart: {
                          width: "100%",
                          height: "250",
                        },
                        legend: {
                          position: "bottom",
                        },
                      },
                    },
                  ],
                }}
              />
            </div>
          )}
        {dailyIncomes[formattedSelectedDate] &&
          Object.keys(dailyIncomes[formattedSelectedDate]).length > 0 && (
            <div className={styles.dailychart}>
              <h3 className={styles.chart}>
                Incomes - {formattedSelectedDate}
              </h3>

              <Chart
                type="donut"
                width={450}
                height={350}
                series={Object.values(dailyIncomes[formattedSelectedDate])}
                options={{
                  labels: Object.keys(dailyIncomes[formattedSelectedDate]),
                  colors: Object.keys(dailyIncomes[formattedSelectedDate]).map(
                    (category) => categoryColors[category]
                  ),

                  plotOptions: {
                    pie: {
                      donut: {
                        labels: {
                          show: true,
                          total: {
                            show: true,
                            fontSize: 16,
                            color: "#438024",
                            formatter: function (w) {
                              return formatAmount(
                                w.globals.seriesTotals
                                  .reduce((a, b) => a + b, 0)
                                  .toFixed(2)
                              );
                            },
                          },
                        },
                      },
                    },
                  },
                  dataLabels: {
                    enabled: true,
                  },
                  responsive: [
                    {
                      breakpoint: 700,
                      options: {
                        chart: {
                          width: "100%",
                          height: "250",
                        },
                        legend: {
                          position: "bottom",
                        },
                      },
                    },
                  ],
                }}
              />
            </div>
          )}
      </div>
    </>
  );
}

export default DoughNutChart;
