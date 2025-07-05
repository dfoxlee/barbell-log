import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect } from "react";

import styles from "./Landing.module.css";

export default function Landing() {
   const { token } = useAuthContext();
   const navigate = useNavigate();

   useEffect(() => {
      if (token) {
         navigate("/home");
      }
   }, [token, navigate]);

   return (
      <div>
         <div className={styles.heroWrapper}>
            <div className={styles.heroTextWrapper}>
               <h1 className={styles.heroTitle}>Barbell Log</h1>
               <h3 className={styles.heroSubTitle}>
                  Ditch the Clutter, Keep the Gains. Simple, Ad-Free Fitness at
                  your fingertips.
               </h3>
               <div className={styles.heroLinkWrapper}>
                  <Link className={styles.heroLoginLink} to="/auth/login">
                     Login
                  </Link>
                  <Link className={styles.heroSignUpLink} to="/auth/sign-up">
                     Sign Up
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
}
