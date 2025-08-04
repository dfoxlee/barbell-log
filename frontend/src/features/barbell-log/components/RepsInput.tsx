import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import styles from "./Inputs.module.css";
import toastify from "../../../utils/toastify";

export default function RepsInput({
   reps,
   updateReps,
   completedExerciseSetOrder,
   isComplete,
}) {
   const handleRepsChange = (event) => {
      const repsInput = event.target.value;

      if (repsInput !== "" && !/^[0-9]+$/.test(repsInput)) {
         return toastify({
            message: "Value must be a valid number.",
            type: "warning",
         });
      }

      updateReps({
         completedExerciseSetOrder: completedExerciseSetOrder,
         updatedReps: repsInput,
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
         {!isComplete ? (
            <button
               className={`standardIconBtn ${styles.incrementBtn}`}
               onClick={handleIncrementClick}
            >
               <FaChevronUp />
            </button>
         ) : null}
         <input
            className={`standardInput ${styles.numberInput}`}
            type="number"
            inputMode="numeric"
            value={reps}
            onChange={handleRepsChange}
         />
         {!isComplete ? (
            <button
               className={`standardIconBtn ${styles.incrementBtn}`}
               onClick={handleRepsDecrementClick}
            >
               <FaChevronDown />
            </button>
         ) : null}
         <span className={styles.inputLabel}>reps</span>
      </div>
   );
}
