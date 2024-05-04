import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const NavLinks = [
  {
    title: "Daily",
    link: "/reports/dailyreport",
  },
  {
    title: "Monthly",
    link: "/reports/monthlyreport",
  },
  {
    title: "Yearly",
    link: "/reports/yearlyreport",
  },
];

function Navbar({ NavLinks }) {
  return (
    <div>
      <div className={styles.header}>
        {NavLinks.map((item, index) => (
          <NavLink key={index} to={item.link}>
            <span className={styles.monthly}>{item.title}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
