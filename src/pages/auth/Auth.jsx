import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import { useEffect, useState } from "react";
import Loader from "../../components/reports/daily/Loader";

export const Auth = () => {
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setloading(false);
      if (user) {
        navigate("/dashboard");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    console.log(results);

    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      email: results.user.email,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));

    navigate("/dashboard");
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.signin}>
      <p className={styles.sign}>Sign in with Google to continue</p>
      <div onClick={signInWithGoogle} className={styles.btn}>
        <span className={styles.signIn}> Sign in with Google</span>
        <span className={styles.googleimg}>
          <img src="googleimg.png" height={30} />
        </span>
      </div>
    </div>
  );
};
