import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import toastify from "../../../utils/toastify";
import styles from "./Inputs.module.css";

export default function DistanceInput({
   distance,
   distanceUnit,
   updateDistance,
   completedExerciseSetOrder,
   isComplete,
}) {
   const handleDistanceChange = (event) => {
      const distanceInput = event.target.value;

      if (distanceInput !== "" && !/^[0-9]*\.?[0-9]*$/.test(distanceInput)) {
         return toastify({
            message: "Value must be a valid number.",
            type: "warning",
         });
      }
      updateDistance({
         distance: event.target.value,
         completedExerciseSetOrder,
      });
   };

   const handleIncrementClick = () => {
      const newDistance = parseFloat(distance) + 1;

      updateDistance({
         completedExerciseSetOrder: completedExerciseSetOrder,
         distance: newDistance,
      });
   };

   const handleRepsDecrementClick = () => {
      const newDistance = parseFloat(distance) - 1;

      if (newDistance < 0) {
         return toastify({
            message: "Value must be greater than zero.",
            type: "warning",
         });
      }

      updateDistance({
         completedExerciseSetOrder: completedExerciseSetOrder,
         distance: newDistance,
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
            className={`standardInput ${styles.decimalInput}`}
            type="number"
            inputMode="numeric"
            value={distance}
            onChange={handleDistanceChange}
         />
         <span className={styles.inputLabel}>{distanceUnit}</span>
         {!isComplete ? (
            <button
               className={`standardIconBtn ${styles.incrementBtn}`}
               onClick={handleRepsDecrementClick}
            >
               <FaChevronDown />
            </button>
         ) : null}
      </div>
   );
}
