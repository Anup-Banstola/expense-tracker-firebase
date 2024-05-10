import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar({ tabs }) {
  console.log(tabs);
  return (
    <div>
      <div className={styles.header}>
        {tabs.map((item, index) => (
          <span className={styles.monthly} key={index}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
