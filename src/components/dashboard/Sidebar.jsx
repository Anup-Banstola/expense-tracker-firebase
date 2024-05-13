import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faBars,
  faChartPie,
  faHome,
  faListAlt,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 480);
    if (window.innerWidth <= 480) {
      setIsCollapsed(true);
    }
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

  return (
    <>
      {/* <div className={styles.sidebar}>
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
      </div> */}
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
      </div>
    </>
  );
}

export default Sidebar;
