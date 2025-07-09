import { FaCalendar, FaCog, FaHome } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

import styles from "./Navbar.module.css";

export default function HomeNavWrapper() {
   const location = useLocation();
   const currentPath = location.pathname.split("/")[2];

   return (
      <nav className={styles.wrapper}>
         <Link
            className={
               currentPath === "workout-history" ||
               currentPath === "completed-workout"
                  ? `${styles.navLink} ${styles.activeNavLink}`
                  : styles.navLink
            }
            to="/home/workout-history"
         >
            <FaCalendar />
         </Link>
         <Link
            className={
               !currentPath
                  ? `${styles.homeLink} ${styles.activeHomeLink}`
                  : styles.homeLink
            }
            to="/home"
         >
            <FaHome />
         </Link>
         <Link
            className={
               currentPath === "settings"
                  ? `${styles.navLink} ${styles.activeNavLink}`
                  : styles.navLink
            }
            to="/home/settings"
         >
            <FaCog />
         </Link>
      </nav>
   );
}
