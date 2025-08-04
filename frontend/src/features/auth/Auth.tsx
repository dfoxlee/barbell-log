import { useMemo } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import UnderConstruction from "../shared/UnderConstruction";

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

   return (
      <div className={styles.container}>
         <Link to="/" className={`pageTitle ${styles.authTitleLink}`}>
            Barbell Log
         </Link>
         <>
            <h2 className={`pageTitle ${styles.authHeader}`}>{authTitle}</h2>
            <FaUser className={styles.userIcon} />
            {authTitle === "Sign Up" ? (
               <UnderConstruction />
            ) : (
               <AuthForm authTitle={authTitle} />
            )}
         </>
      </div>
   );
}
