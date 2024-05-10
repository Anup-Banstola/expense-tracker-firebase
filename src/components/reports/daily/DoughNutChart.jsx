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

function DoughNutChart() {
  const { incomes, expenses } = useGetTransactions();
  const [dailyExpenses, setDailyExpenses] = useState({});
  const [dailyIncomes, setDailyIncomes] = useState({});

  function formatAmount(amount) {
    return new Intl.NumberFormat("en-NP", {
      style: "currency",
      currency: "NPR",
    }).format(amount);
  }

  useEffect(() => {
    setDailyExpenses(aggregateTransactionsByDay(expenses));
    setDailyIncomes(aggregateTransactionsByDay(incomes));
  }, [expenses, incomes]);

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

  const expensesDates = Object.keys(dailyExpenses);
  const incomesDates = Object.keys(dailyIncomes);
  const transactionDates = [...new Set([...expensesDates, ...incomesDates])];
  console.log(transactionDates);
  const hasTransactions = transactionDates.length > 0;

  return (
    <>
      {hasTransactions && (
        <div className={styles.dailyreport}>
          {transactionDates.map((date, index) => (
            <div key={index} className={styles.dailychart}>
              <h3 className={styles.chart}>Expenses - {date}</h3>
              <div className={styles.daily}>
                {dailyExpenses[date] &&
                Object.keys(dailyExpenses[date]).length > 0 ? (
                  <Chart
                    type="donut"
                    width={450}
                    height={350}
                    series={Object.values(dailyExpenses[date])}
                    options={{
                      labels: Object.keys(dailyExpenses[date]),
                      title: {
                        text: "Daily Expenses Report",
                      },
                      subtitle: {
                        text: `Date: ${date}`,
                      },
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
                ) : (
                  <p>No data available for expenses on {date}</p>
                )}
              </div>
              <h3 className={styles.chart}>Incomes - {date}</h3>
              <div className={styles.daily}>
                {dailyIncomes[date] &&
                Object.keys(dailyIncomes[date]).length > 0 ? (
                  <Chart
                    type="donut"
                    width={450}
                    height={350}
                    series={Object.values(dailyIncomes[date])}
                    options={{
                      labels: Object.keys(dailyIncomes[date]),
                      title: {
                        text: "Daily Incomes Report",
                      },
                      subtitle: {
                        text: `Date: ${date}`,
                      },
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
                ) : (
                  <p>No data available for incomes on {date}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default DoughNutChart;
