import React from "react";
import styles from "./TabContent.module.css";
const TabContent = ({ id, activeTab, children }) => {
  return activeTab === id ? (
    <div className={styles.tabcontent}>{children}</div>
  ) : null;
};

export default TabContent;
