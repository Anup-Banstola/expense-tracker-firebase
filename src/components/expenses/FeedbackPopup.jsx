import React from "react";
import styles from "./FeedbackPopup.module.css";

function FeedbackPopup({ message, onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <p>{message}</p>
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
}

export default FeedbackPopup;
