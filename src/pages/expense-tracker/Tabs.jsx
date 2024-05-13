import { useState } from "react";
import styles from "./Tabs.module.css";
import TabNavItem from "../../components/tab/TabNavItem";
import TabContent from "../../components/tab/TabContent";
import DailyReport from "./DailyReport";
import MonthlyReport from "./MonthlyReport";
import YearlyReport from "./YearlyReport";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("daily");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className={styles.tabs}>
      <ul className={styles.nav}>
        <TabNavItem
          title="Daily"
          id="daily"
          activeTab={activeTab}
          handleTabChange={handleTabChange}
        />
        <TabNavItem
          title="Monthly"
          id="monthly"
          activeTab={activeTab}
          handleTabChange={handleTabChange}
        />
        <TabNavItem
          title="Yearly"
          id="yearly"
          activeTab={activeTab}
          handleTabChange={handleTabChange}
        />
      </ul>
      <div className={styles.reports}>
        <TabContent id="daily" activeTab={activeTab}>
          <DailyReport />
        </TabContent>
        <TabContent id="monthly" activeTab={activeTab}>
          <MonthlyReport />
        </TabContent>
        <TabContent id="yearly" activeTab={activeTab}>
          <YearlyReport />
        </TabContent>
      </div>
    </div>
  );
};

export default Tabs;
