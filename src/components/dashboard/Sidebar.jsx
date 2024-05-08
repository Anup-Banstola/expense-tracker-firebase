import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 480);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const sidebarLinks = [
    {
      link: "/dashboard",
      src: "../../assets/icons/dashboard.svg",
      title: "Dashboard",
      height: "25px",
    },
    {
      link: "/categories",
      src: "../../assets/icons/categories.svg",
      title: "Categories",
      height: "25px",
    },
    {
      link: "/expenses",
      src: "../../assets/icons/expense.svg",
      title: "Expenses",
      height: "25px",
    },
    {
      link: "/incomes",
      src: "../../assets/icons/incomes.svg",
      title: "Incomes",
      height: "25px",
    },
    {
      link: "/reports",
      src: "../../assets/icons/reports.svg",
      title: "Reports",
      height: "25px",
    },
  ];

  return (
    <>
      <div className={styles.sidebar}>
        <NavLink to="/dashboard" className={styles.headlink}>
          <div className={styles.logotitle}>
            <img
              src="../../assets/icons/logo.svg"
              alt="logo"
              title="Expense Tracker"
              className={styles.logo}
            />
            <h2 className={styles.title}>Expense Tracker</h2>
          </div>
        </NavLink>
        {isSmallScreen ? (
          <FontAwesomeIcon
            icon={faHouse}
            className={styles.icon}
            title="MANAGE"
          />
        ) : (
          <p className={styles.mng}>Manage</p>
        )}

        <div className={styles.nav}>
          {sidebarLinks.map((sidebar, index) => (
            <NavLink
              to={sidebar.link}
              key={index}
              className={styles.navel}
              title={sidebar.title}
            >
              <img
                src={sidebar.src}
                alt={sidebar.title}
                height={sidebar.height}
              />

              <span className={styles.text}>{sidebar.title}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
