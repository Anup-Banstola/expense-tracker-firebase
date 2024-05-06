//Displaying yearly incomes and expenses in combined chart

// import Chart from "react-apexcharts";
// import styles from "./DoughNutChart.module.css";

// function DoughNutChart() {
//   const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || "[]";
//   const storedIncomes = JSON.parse(localStorage.getItem("incomes")) || "[]";

//   const allTransactions = [...storedExpenses, ...storedIncomes];

//   const aggregateTransactionsByYear = (transactions) => {
//     const yearlyData = {};
//     transactions.forEach((transaction) => {
//       const year = new Date(transaction.date).getFullYear();
//       if (!yearlyData[year]) {
//         yearlyData[year] = {};
//       }
//       console.log(yearlyData[year]);
//       const category = transaction.categoryName;
//       console.log(category);
//       if (!yearlyData[year][category]) {
//         yearlyData[year][category] = 0;
//       }
//       console.log(yearlyData[year][category]);
//       yearlyData[year][category] += Number(transaction.transactionAmount);
//     });
//     return yearlyData;
//   };

//   const yearlyData = aggregateTransactionsByYear(allTransactions);

//   const years = Object.keys(yearlyData);
//   console.log(years);

//   return (
//     <div className={styles.yearly}>
//       {years.map((year) => (
//         <div key={year}>
//           <h3 className={styles.chart}>Donut Chart - {year}</h3>
//           <div className={styles.daily}>
//             {yearlyData[year] && Object.keys(yearlyData[year]).length > 0 ? (
//               <Chart
//                 type="donut"
//                 width={450}
//                 height={350}
//                 series={Object.values(yearlyData[year])}
//                 options={{
//                   labels: Object.keys(yearlyData[year]),
//                   title: {
//                     text: "Yearly Report",
//                   },
//                   subtitle: {
//                     text: `Year: ${year}`,
//                   },
//                   plotOptions: {
//                     pie: {
//                       donut: {
//                         labels: {
//                           show: true,
//                           total: {
//                             show: true,
//                             fontSize: 16,
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
//               <p>No data available for {year}</p>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default DoughNutChart;

//Displaying yearly incomes and expenses in separate charts
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import styles from "./DoughNutChart.module.css";
import { useGetTransactions } from "../../../hooks/useGetTransactions";

function DoughNutChart() {
  const { incomes, expenses } = useGetTransactions();
  const [yearlyExpenses, setYearlyExpenses] = useState({});
  const [yearlyIncomes, setYearlyIncomes] = useState({});

  function formatAmount(amount) {
    return new Intl.NumberFormat("en-NP", {
      style: "currency",
      currency: "NPR",
    }).format(amount);
  }

  useEffect(() => {
    setYearlyExpenses(aggregateTransactionsByYear(expenses));
    setYearlyIncomes(aggregateTransactionsByYear(incomes));
  }, [incomes, expenses]);

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

  const expenseYears = Object.keys(yearlyExpenses);
  const incomeYears = Object.keys(yearlyIncomes);
  const years = [...new Set([...expenseYears, ...incomeYears])];
  console.log(years);
  const hasYears = years.length > 0;

  return (
    <>
      {hasYears && (
        <div className={styles.yearly}>
          {years.map((year, index) => (
            <div key={index} className={styles.yearlychart}>
              <h3 className={styles.chart}>Expenses - {year}</h3>
              <div className={styles.daily}>
                {yearlyExpenses[year] &&
                Object.keys(yearlyExpenses[year]).length > 0 ? (
                  <Chart
                    type="donut"
                    width={450}
                    height={350}
                    series={Object.values(yearlyExpenses[year])}
                    options={{
                      labels: Object.keys(yearlyExpenses[year]),
                      title: {
                        text: "Yearly Expenses Report",
                      },
                      subtitle: {
                        text: `Year: ${year}`,
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
                  <p>No data available for expenses in {year}</p>
                )}
              </div>
              <h3 className={styles.chart}>Incomes - {year}</h3>
              <div className={styles.daily}>
                {yearlyIncomes[year] &&
                Object.keys(yearlyIncomes[year]).length > 0 ? (
                  <Chart
                    type="donut"
                    width={450}
                    height={350}
                    series={Object.values(yearlyIncomes[year])}
                    options={{
                      labels: Object.keys(yearlyIncomes[year]),
                      title: {
                        text: "Yearly Incomes Report",
                      },
                      subtitle: {
                        text: `Year: ${year}`,
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
                  <p>No data available for incomes in {year}</p>
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
