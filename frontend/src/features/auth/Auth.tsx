import { useEffect, useMemo } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import { useUserStore } from "../../stores/user.store";

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
   const user = useUserStore((state) => state.user);
   const setUser = useUserStore((state) => state.setUser);
   const navigate = useNavigate();

   useEffect(() => {
      if (user?.token) {
         navigate("/home");
      }

      const localUser = localStorage.getItem("barbell-log");
      if (localUser) {
         setUser(JSON.parse(localUser));

         navigate("/home");
      }
   }, []);

   return (
      <div className={styles.container}>
         <Link to="/" className={`pageTitle ${styles.authTitleLink}`}>
            Barbell Log
         </Link>
         <>
            <h2 className={`pageTitle ${styles.authHeader}`}>{authTitle}</h2>
            <FaUser className={styles.userIcon} />
            <AuthForm authTitle={authTitle} />
         </>
      </div>
   );
}
