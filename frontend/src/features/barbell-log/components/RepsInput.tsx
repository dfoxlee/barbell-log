import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import styles from "./Inputs.module.css";

export default function RepsInput({ reps, updateReps }) {
   const handleRepsChange = (event) => {
      updateReps(event.target.value);
   };

   return (
      <div className={styles.inputWrapper}>
         <button className={`standardIconBtn ${styles.incrementBtn}`}>
            <FaChevronUp />
         </button>
         <input
            className={`standardInput ${styles.numberInput}`}
            type="number"
            inputMode="numeric"
            value={reps}
            onChange={handleRepsChange}
         />
         <button className={`standardIconBtn ${styles.incrementBtn}`}>
            <FaChevronDown />
         </button>
         <span className={styles.inputLabel}>reps</span>
      </div>
   );
}
