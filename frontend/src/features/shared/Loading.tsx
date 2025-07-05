import { FaSpinner } from "react-icons/fa";

import styles from "./Loading.module.css";

export default function Loading({ size = "2em", text = "Loading..." }) {
   return (
      <div className={styles.loadingSpinnerContainer}>
         <FaSpinner className={styles.loadingSpinnerIcon} size={size} />
         {text && <p className={styles.loadingSpinnerText}>{text}</p>}
      </div>
   );
}
