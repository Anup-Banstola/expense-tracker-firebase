import styles from "./Modal.module.css";

const Modal = ({ onClose, children }) => {
  return (
    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
};

export default Modal;
