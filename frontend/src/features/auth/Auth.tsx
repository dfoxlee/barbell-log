import { useMemo } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import AuthForm from "./components/AuthForm";

import styles from "./Auth.module.css";
import UnderConstruction from "../shared/UnderConstruction";

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
         <Link to="/" className={styles.authTitleLink}>
            Barbell Log
         </Link>
         {authTitle === "Sign Up" ? (
            <UnderConstruction />
         ) : (
            <>
               <h2 className={styles.authHeader}>{authTitle}</h2>
               <FaUser className={styles.userIcon} />
               <AuthForm authTitle={authTitle} />
            </>
         )}
      </div>
   );
}
