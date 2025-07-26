import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import styles from "./Inputs.module.css";
import toastify from "../../../utils/toastify";

export default function RepsInput({
   reps,
   updateReps,
   completedExerciseSetOrder,
}) {
   const handleRepsChange = (event) => {
      if (event.target.value !== "" && !parseInt(event.target.value)) {
         return toastify({
            message: "Value must be a valid number.",
            type: "warning",
         });
      }

      updateReps({
         completedExerciseSetOrder: completedExerciseSetOrder,
         updatedReps: event.target.value,
      });
   };

   const handleIncrementClick = () => {
      const newReps = reps + 1;

      updateReps({
         completedExerciseSetOrder: completedExerciseSetOrder,
         updatedReps: newReps,
      });
   };

   const handleRepsDecrementClick = () => {
      const newReps = reps - 1;

      if (newReps < 0) {
         return toastify({
            message: "Value must be greater than zero.",
            type: "warning",
         });
      }

      updateReps({
         completedExerciseSetOrder: completedExerciseSetOrder,
         updatedReps: newReps,
      });
   };

   return (
      <div className={styles.inputWrapper}>
         <button
            className={`standardIconBtn ${styles.incrementBtn}`}
            onClick={handleIncrementClick}
         >
            <FaChevronUp />
         </button>
         <input
            className={`standardInput ${styles.numberInput}`}
            type="number"
            inputMode="numeric"
            value={reps}
            onChange={handleRepsChange}
         />
         <button
            className={`standardIconBtn ${styles.incrementBtn}`}
            onClick={handleRepsDecrementClick}
         >
            <FaChevronDown />
         </button>
         <span className={styles.inputLabel}>reps</span>
      </div>
   );
}
