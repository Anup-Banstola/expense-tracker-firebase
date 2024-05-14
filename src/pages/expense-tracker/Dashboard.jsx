import { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import History from "../../components/dashboard/History.jsx";
import { useGetTransactions } from "../../hooks/useGetTransactions.js";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config.js";
import { useNavigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo.js";
import Modal from "../../components/dashboard/Modal.jsx";

function Dashboard() {
  const { incomes, expenses } = useGetTransactions();
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncomes, setTotalIncomes] = useState(0);
  const navigate = useNavigate();
  const { name, profilePhoto, email, userID } = useGetUserInfo();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const totalExpensesAmount = expenses.reduce((acc, expense) => {
      return acc + parseFloat(expense.transactionAmount);
    }, 0);
    setTotalExpenses(totalExpensesAmount);

    const totalIncomesAmount = incomes.reduce((acc, income) => {
      return acc + parseFloat(income.transactionAmount);
    }, 0);
    setTotalIncomes(totalIncomesAmount);
  }, [incomes, expenses]);

  function formatAmount(amount) {
    return new Intl.NumberFormat("en-NP", {
      style: "currency",
      currency: "NPR",
    }).format(amount);
  }

  // const signUserOut = async () => {
  //   try {
  //     await signOut(auth);
  //     localStorage.clear();
  //     navigate("/");
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const handleProfileClick = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <main className={styles.hero}>
        <div className={styles.header}>
          <h2>Welcome, {name}!</h2>
          <div className={styles.profile}>
            <img
              src={profilePhoto || "assets/icons/profile.svg"}
              alt="Profile"
              className={styles.photo}
              onClick={handleProfileClick}
            />

            {/* <button className={styles.signout} onClick={signUserOut}>
              Sign Out
            </button> */}
          </div>
        </div>

        {isModalOpen && (
          <Modal onClose={handleCloseModal}>
            <h3>User Information</h3>

            <p>UserID: {userID}</p>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <span
              onClick={handleCloseModal}
              className={`${styles.closebtn} ${styles.close}`}
            >
              Close
            </span>
          </Modal>
        )}
        <div className={styles.amounts}>
          <div className={styles.balance}>
            <h2>Total Balance</h2>
            <p className={styles.bal}>
              {formatAmount(totalIncomes - totalExpenses)}
            </p>
          </div>
          <div className={styles.income}>
            <h2>Total Incomes</h2>
            <p className={styles.inc}>{formatAmount(totalIncomes)}</p>
          </div>
          <div className={styles.expense}>
            <h2>Total Expenses</h2>
            <p className={styles.exp}>{formatAmount(totalExpenses)}</p>
          </div>
        </div>

        <p className={styles.overview}>Overview</p>

        <History />
      </main>
    </>
  );
}

export default Dashboard;
