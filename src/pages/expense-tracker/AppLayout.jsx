import Hero from "../../components/dashboard/Hero";

import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <>
      <div className={styles.container}>
        <Hero />
      </div>
    </>
  );
}

export default AppLayout;
