import { FaDumbbell } from "react-icons/fa";
import styles from "./Seperator.module.css";

export default function Seperator() {
   return (
      <div className={styles.seperatorWrapper}>
         <div className={styles.seperator}></div>
         <FaDumbbell className={styles.seperatorIcon} />
         <div className={styles.seperator}></div>
      </div>
   );
}
