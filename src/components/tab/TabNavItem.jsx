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
