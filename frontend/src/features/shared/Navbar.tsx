import { useLocation } from "react-router-dom";
import HomeNavWrapper from "./HomeNavWrapper";
import CompositionNavWrapper from "./CompositionNavWrapper";
import BarbellLogNavWrapper from "./BarbellLogNavWrapper";

import styles from "./Navbar.module.css";

export default function Navbar() {
   const location = useLocation();

   return (
      <div className={styles.container}>
         {location.pathname.split("/")[2] === "workout-composition" ? (
            <CompositionNavWrapper />
         ) : location.pathname.split("/")[2] === "barbell-log" ? (
            <BarbellLogNavWrapper />
         ) : (
            <HomeNavWrapper />
         )}
      </div>
   );
}
