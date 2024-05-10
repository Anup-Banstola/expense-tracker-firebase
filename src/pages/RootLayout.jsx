import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import styles from "./RootLayout.module.css";

const RootLayout = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
