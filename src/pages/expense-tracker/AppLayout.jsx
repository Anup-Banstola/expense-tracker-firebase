import Hero from "../../components/dashboard/Hero";
import Sidebar from "../../components/dashboard/Sidebar";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <>
      <div className={styles.container}>
        <Sidebar />
        <Hero />
      </div>
    </>
  );
}

export default AppLayout;
