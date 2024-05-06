import useDeleteTransaction from "../../hooks/useDeleteTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import styles from "./IncomeList.module.css";

function formatAmount(amount) {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
  }).format(amount);
}

function IncomeList({ incomes }) {
  const { deleteTransaction } = useDeleteTransaction();
  const { loading } = useGetTransactions();
  console.log(loading);
  const handleDeleteIncome = async (transactionId) => {
    try {
      await deleteTransaction("incomes", transactionId);
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };
  return (
    <div className={styles.incomeitem}>
      {loading ? (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
          <p>Loading incomes...</p>
        </div>
      ) : incomes.length === 0 ? (
        <p className={styles.noIncomes}>No incomes recorded yet. </p>
      ) : (
        incomes.map((income, index) => (
          <div key={index} className={styles.incomelist}>
            <div className={styles.income}>
              <div>
                Income Amount:{" "}
                <span className={styles.incamount}>
                  {formatAmount(income.transactionAmount)}
                </span>
              </div>
              <div>
                Category:{" "}
                <span className={styles.catagory}>{income.categoryName}</span>
              </div>
              <div className={styles.description}>
                Description:
                <div className={styles.wraptext}>{income.description}</div>
              </div>
            </div>
            <div>
              <span
                className={styles.deletebtn}
                onClick={() => handleDeleteIncome(income.id)}
              >
                X
              </span>
              <div className={styles.date}>Date: {income.date}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default IncomeList;
