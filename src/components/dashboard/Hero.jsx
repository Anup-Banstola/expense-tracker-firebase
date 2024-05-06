import { useState, useEffect } from "react";

import styles from "./Hero.module.css";
import History from "./History.jsx";
import { useGetTransactions } from "../../hooks/useGetTransactions.js";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config.jsx";
import { useNavigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo.js";
import Modal from "./Modal.jsx";

function Hero() {
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

  const formattedTotalBalance = parseFloat(
    totalIncomes - totalExpenses
  ).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  const formattedTotalIncomes = parseFloat(totalIncomes).toLocaleString(
    "en-IN",
    {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }
  );

  const formattedTotalExpenses = parseFloat(totalExpenses).toLocaleString(
    "en-IN",
    {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }
  );
  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

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
          <h2>Dashboard</h2>
          <div className={styles.profile}>
            <img
              src={profilePhoto || "profile.png"}
              alt="Profile"
              className={styles.photo}
              onClick={handleProfileClick}
            />

            <button className={styles.signout} onClick={signUserOut}>
              Sign Out
            </button>
          </div>
        </div>

        {isModalOpen && (
          <Modal onClose={handleCloseModal}>
            <h3>User Information</h3>
            <p>UserID: {userID}</p>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <button onClick={handleCloseModal} className={styles.close}>
              Close
            </button>
          </Modal>
        )}
        <div className={styles.amounts}>
          <div className={styles.balance}>
            <h2>Total Balance</h2>
            <p className={styles.bal}>Rs.{formattedTotalBalance}</p>
          </div>
          <div className={styles.income}>
            <h2>Total Incomes</h2>
            <p className={styles.inc}>Rs.{formattedTotalIncomes}</p>
          </div>
          <div className={styles.expense}>
            <h2>Total Expenses</h2>
            <p className={styles.exp}>Rs.{formattedTotalExpenses}</p>
          </div>
        </div>

        <p className={styles.overview}>Overview</p>

        <History />
      </main>
    </>
  );
}

export default Hero;
