import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

export const Auth = () => {
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/dashboard");
  };
  return (
    <div className={styles.signin}>
      <p className={styles.sign}>Sign In With Google to Continue</p>
      <button onClick={signInWithGoogle} className={styles.btn}>
        Sign In With Google
      </button>
    </div>
  );
};
