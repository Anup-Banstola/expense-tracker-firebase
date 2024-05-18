import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faHome,
  faListAlt,
  faMoneyBill,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";

function Sidebar() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { navigate } = useNavigate();

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 550);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const sidebarLinks = [
    {
      link: "/dashboard",
      icon: faHome,
      title: "Dashboard",
    },
    {
      link: "/categories",
      icon: faListAlt,
      title: "Categories",
    },
    {
      link: "/expenses",
      icon: faMoneyBill,
      title: "Expenses",
    },
    {
      link: "/incomes",
      icon: faMoneyBill,
      title: "Incomes",
    },
    {
      link: "/reports",
      icon: faChartPie,
      title: "Reports",
    },
  ];

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className={styles.sidebar}>
        <NavLink to="/dashboard" className={styles.headlink}>
          <div className={styles.logoContainer}>
            <img
              src="/assets/icons/logo.svg"
              alt="Logo"
              className={styles.logo}
              title="Expense tracker"
            />
            {!isSmallScreen && (
              <h2 className={styles.title}>Expense Tracker</h2>
            )}
          </div>
        </NavLink>

        {sidebarLinks.map((link, index) => (
          <div className={styles.nav} key={index}>
            <NavLink to={link.link} className={styles.link} title={link.title}>
              <FontAwesomeIcon icon={link.icon} className={styles.icon} />
              <span className={styles.text}>{link.title}</span>
            </NavLink>
          </div>
        ))}

        <div className={styles.signoutContainer}>
          {!isSmallScreen ? (
            <span className={styles.signout} onClick={signUserOut}>
              Sign Out
            </span>
          ) : (
            <FontAwesomeIcon
              icon={faSignOut}
              className={styles.logoutbtn}
              title="Sign Out"
              onClick={signUserOut}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
