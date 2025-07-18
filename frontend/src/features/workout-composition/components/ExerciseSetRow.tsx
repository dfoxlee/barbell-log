import { FaPencilAlt, FaToggleOff, FaTrashAlt } from "react-icons/fa";
import type { ExerciseSetType } from "../../../types/workoutTypes";

import styles from "./ExerciseComposition.module.css";

export default function ExerciseSetRow({
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
         <th>{exerciseSet.reps}</th>
         <th>{exerciseSet.weight}</th>
         <th className={styles.optionsWrapper}>
            <button>
               <FaPencilAlt />
            </button>
            <button>
               <FaTrashAlt />
            </button>
         </th>
      </tr>
   );
}
