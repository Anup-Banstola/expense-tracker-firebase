//Displaying daily incomes and expenses in a single chart

// import Chart from "react-apexcharts";
// import styles from "./DoughNutChart.module.css";

// function DoughNutChart() {
//   const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || "[]";
//   const storedIncomes = JSON.parse(localStorage.getItem("incomes")) || "[]";

//   const allTransactions = [...storedExpenses, ...storedIncomes];

//   const aggregateTransactionsByDay = (transactions) => {
//     const dailyData = {};
//     transactions.forEach((transaction) => {
//       const date = new Date(transaction.date).toLocaleDateString();
//       if (!dailyData[date]) {
//         dailyData[date] = {};
//       }
//       const category = transaction.categoryName;
//       if (!dailyData[date][category]) {
//         dailyData[date][category] = 0;
//       }
//       dailyData[date][category] += Number(transaction.transactionAmount);
//     });
//     return dailyData;
//   };

//   const dailyData = aggregateTransactionsByDay(allTransactions);
//   const dates = Object.keys(dailyData);

//   return (
//     <div className={styles.dailyreport}>
//       {dates.map((date) => (
//         <div key={date}>
//           <h3 className={styles.chart}>Donut Chart - {date}</h3>
//           <div className={styles.daily}>
//             {dailyData[date] && Object.keys(dailyData[date]).length > 0 ? (
//               <Chart
//                 type="donut"
//                 width={450}
//                 height={350}
//                 series={Object.values(dailyData[date])}
//                 options={{
//                   labels: Object.keys(dailyData[date]),
//                   title: {
//                     text: "Daily Report",
//                   },
//                   subtitle: {
//                     text: `Date: ${date}`,
//                   },
//                   plotOptions: {
//                     pie: {
//                       donut: {
//                         labels: {
//                           show: true,
//                           total: {
//                             show: true,
//                             fontSize: 25,
//                             color: "#438024",
//                           },
//                         },
//                       },
//                     },
//                   },

//                   dataLabels: {
//                     enabled: true,
//                   },
//                   responsive: [
//                     {
//                       breakpoint: 700,
//                       options: {
//                         chart: {
//                           width: "100%",
//                           height: "250",
//                         },
//                         legend: {
//                           position: "bottom",
//                         },
//                       },
//                     },
//                   ],
//                 }}
//               />
//             ) : (
//               <p>No data available for {date}</p>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
// export default DoughNutChart;

//Displaying daily incomes and expenses charts separately
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

  const getCategoryColors = () => {
    const categoryColors = {};
    categories.forEach((category) => {
      categoryColors[category.categoryName] = category.categoryColor;
    });
    return categoryColors;
  };

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
                  colors: Object.values(getCategoryColors()),

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

export default DoughNutChart;
