import { FaToggleOff, FaTrashAlt } from "react-icons/fa";
import type { ExerciseSetType } from "../../../types/workoutTypes";

import styles from "./ExerciseComposition.module.css";

export default function ExerciseSetEditRow({
   exerciseSet,
}: {
   exerciseSet: ExerciseSetType;
}) {
   return (
      <tr key={exerciseSet.exerciseSetOrder}>
         <th>
            <div className={styles.toggleBtnsWrapper}>
               <div className={styles.toggleBtnWrapper}>
                  <button className={`standardIconBtn ${styles.toggleBtn}`}>
                     <FaToggleOff />
                  </button>
                  <span className={styles.toggleSetOptionText}>Warmup?</span>
               </div>
               <div className={styles.toggleBtnWrapper}>
                  <button className={`standardIconBtn ${styles.toggleBtn}`}>
                     <FaToggleOff />
                  </button>
                  <span className={styles.toggleSetOptionText}>Timed?</span>
               </div>
               <div className={styles.toggleBtnWrapper}>
                  <button className={`standardIconBtn ${styles.toggleBtn}`}>
                     <FaToggleOff />
                  </button>
                  <span className={styles.toggleSetOptionText}>Distance?</span>
               </div>
               <div className={styles.toggleBtnWrapper}>
                  <button className={`standardIconBtn ${styles.toggleBtn}`}>
                     <FaToggleOff />
                  </button>
                  <span className={styles.toggleSetOptionText}>Reps?</span>
               </div>
            </div>
         </th>
         <th>{exerciseSet.exerciseSetOrder}</th>
         <th>
            <input
               inputMode="decimal"
               className={`standardInput ${styles.repsInput}`}
               value={exerciseSet.reps}
               min="0"
            />
         </th>
         <th>
            <input
               className={`standardInput ${styles.weightInput}`}
               value={exerciseSet.weight}
               min="0"
            />
         </th>
         <th className={styles.optionsWrapper}>
            <button className={`standardIconBtn ${styles.deleteSetBtn}`}>
               <FaTrashAlt />
            </button>
         </th>
      </tr>
   );
}
