import styles from "./Button.module.css";

function Button({ className, children }) {
  return (
    <button className={`${styles.btn} ${styles[className]}`}>{children}</button>
  );
}

export default Button;
