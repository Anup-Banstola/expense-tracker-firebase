import React from "react";
import styles from "./TabNavItem.module.css";

const TabNavItem = ({ id, title, activeTab, handleTabChange }) => {
  const handleClick = () => {
    handleTabChange(id);
  };
  return (
    <div>
      <li
        onClick={handleClick}
        className={`${activeTab === id ? styles.active : ""}`}
      >
        {title}
      </li>
    </div>
  );
};

export default TabNavItem;

// TabNavItem.js
// import React from "react";

// const TabNavItem = ({ title, onClick, isActive }) => {
//   return (
//     <div onClick={onClick} className={isActive ? "active" : ""}>
//       {title}
//     </div>
//   );
// };

// export default TabNavItem;
