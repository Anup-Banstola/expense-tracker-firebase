import Chart from "react-apexcharts";
import styles from "./MonthlyDoughNutChart.module.css";
import { useEffect, useState } from "react";
import { useGetTransactions } from "../../../hooks/useGetTransactions";
import useGetCategories from "../../../hooks/useGetCategories";

function formatAmount(amount) {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
  }).format(amount);
}

function MonthlyDoughNutChart({ selectedMonth }) {
  const { incomes, expenses } = useGetTransactions();
  const [monthlyExpenses, setMonthlyExpenses] = useState({});
  const [monthlyIncomes, setMonthlyIncomes] = useState({});

  const { categories } = useGetCategories();

  const formattedSelectedMonth = selectedMonth.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    const aggregateTransactionsByMonth = (transactions) => {
      const monthlyData = {};
      transactions.forEach((transaction) => {
        const month = new Date(transaction.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        });
        if (!monthlyData[month]) {
          monthlyData[month] = {};
        }
        const category = transaction.categoryName;
        if (!monthlyData[month][category]) {
          monthlyData[month][category] = 0;
        }
        monthlyData[month][category] += Number(transaction.transactionAmount);
      });
      return monthlyData;
    };

    setMonthlyExpenses(aggregateTransactionsByMonth(expenses));
    setMonthlyIncomes(aggregateTransactionsByMonth(incomes));
    console.log(monthlyExpenses);
    const monthlyTransactions = [
      monthlyExpenses[formattedSelectedMonth],
      monthlyIncomes[formattedSelectedMonth],
    ];

    console.log(monthlyTransactions);
  }, [expenses, incomes]);

  const getCategoryColors = () => {
    const categoryColors = [];
    categories.forEach((category) => {
      categoryColors.push(category.categoryColor);
    });
    return categoryColors;
  };

  console.log(getCategoryColors());

  const hasTransactions =
    Object.keys(monthlyExpenses[formattedSelectedMonth] || {}).length > 0 ||
    Object.keys(monthlyIncomes[formattedSelectedMonth] || {}).length > 0;

  if (!hasTransactions) return null;

  return (
    <>
      <div className={styles.monthlyreport}>
        {monthlyExpenses[formattedSelectedMonth] &&
          Object.keys(monthlyExpenses[formattedSelectedMonth]).length > 0 && (
            <div className={styles.monthlychart}>
              <h3 className={styles.chart}>
                Expenses - {formattedSelectedMonth}
              </h3>

              <Chart
                type="donut"
                width={450}
                height={350}
                series={Object.values(monthlyExpenses[formattedSelectedMonth])}
                options={{
                  labels: Object.keys(monthlyExpenses[formattedSelectedMonth]),
                  colors: Object.values(getCategoryColors()),

                  plotOptions: {
                    pie: {
                      donut: {
                        labels: {
                          show: true,
                          total: {
                            show: true,

                            fontSize: 16,
                            // color: "#432454",
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
        {monthlyIncomes[formattedSelectedMonth] &&
          Object.keys(monthlyIncomes[formattedSelectedMonth]).length > 0 && (
            <div className={styles.monthlychart}>
              <h3 className={styles.chart}>
                Incomes - {formattedSelectedMonth}
              </h3>

              <Chart
                type="donut"
                width={450}
                height={350}
                series={Object.values(monthlyIncomes[formattedSelectedMonth])}
                options={{
                  labels: Object.keys(monthlyIncomes[formattedSelectedMonth]),
                  colors: Object.values(getCategoryColors()),

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

export default MonthlyDoughNutChart;
