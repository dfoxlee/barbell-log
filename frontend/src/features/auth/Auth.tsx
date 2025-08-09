import { useMemo } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import { useUserStore } from "../../stores/userStore";

import styles from "./Auth.module.css";

export default function Auth() {
   const params = useParams();
   const authTitle = useMemo(() => {
      return !params["auth-type"]
         ? "Sign Up"
         : params["auth-type"] === "login"
         ? "Login"
         : "Sign Up";
   }, [params]);
   const authError = useUserStore((state) => state.authError);

   return (
      <div className={styles.container}>
         <Link to="/" className={`pageTitle ${styles.authTitleLink}`}>
            Barbell Log
         </Link>
         <>
            <h2 className={`pageTitle ${styles.authHeader}`}>{authTitle}</h2>
            <FaUser className={styles.userIcon} />
            {authError ? <p>{authError}</p> : null}
            <AuthForm authTitle={authTitle} />
         </>
      </div>
   );
}
