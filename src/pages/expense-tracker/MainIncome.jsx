import { useState } from "react";
import styles from "./MainIncome.module.css";
import AddIncomePopup from "../../components/incomes/AddIncomePopup";
import IncomeList from "../../components/incomes/IncomeList";
import { useGetTransactions } from "../../hooks/useGetTransactions";

function MainIncome() {
  const { incomes } = useGetTransactions();
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => setShowPopup(!showPopup);

  return (
    <>
      <div className={styles.container}>
        <header className={styles.incomeheader}>
          <h2>Incomes</h2>

          <button className={styles.addincome} onClick={togglePopup}>
            Add New Income
          </button>
        </header>
        <main className={styles.main}>
          {showPopup && <AddIncomePopup onClose={togglePopup} />}
          <IncomeList incomes={incomes} />
        </main>
      </div>
    </>
  );
}

export default MainIncome;
