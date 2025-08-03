import toastify from "../../../utils/toastify";
import styles from "./Inputs.module.css";

export default function WeightInput({
   weight,
   weightUnit,
   updateWeight,
   completedExerciseSetOrder,
}) {
   const handleWeightChange = (event) => {
      if (
         event.target.value !== "" &&
         event.target.value !== "." &&
         !parseFloat(event.target.value)
      ) {
         return toastify({
            message: "Value must be a valid number.",
            type: "warning",
         });
      }

      updateWeight({
         completedExerciseSetOrder: completedExerciseSetOrder,
         weight: event.target.value,
      });
   };

   const handle05IncrementClick = () => {
      const newWeight = parseFloat(weight) + 0.5;

      updateWeight({
         completedExerciseSetOrder: completedExerciseSetOrder,
         weight: newWeight,
      });
   };

   const handle05DecrementClick = () => {
      const newWeight = parseFloat(weight) - 0.5;

      if (newWeight < 0) {
         return toastify({
            message: "Value must be greater than zero.",
            type: "warning",
         });
      }

      updateWeight({
         completedExerciseSetOrder: completedExerciseSetOrder,
         weight: newWeight,
      });
   };

   const handle1IncrementClick = () => {
      const newWeight = parseFloat(weight) + 1;

      updateWeight({
         completedExerciseSetOrder: completedExerciseSetOrder,
         weight: newWeight,
      });
   };

   const handle1DecrementClick = () => {
      const newWeight = parseFloat(weight) - 1;

      if (newWeight < 0) {
         return toastify({
            message: "Value must be greater than zero.",
            type: "warning",
         });
      }

      updateWeight({
         completedExerciseSetOrder: completedExerciseSetOrder,
         weight: newWeight,
      });
   };

   const handle5IncrementClick = () => {
      const newWeight = parseFloat(weight) + 5;

      updateWeight({
         completedExerciseSetOrder: completedExerciseSetOrder,
         weight: newWeight,
      });
   };

   const handle5DecrementClick = () => {
      const newWeight = parseFloat(weight) - 5;

      if (newWeight < 0) {
         return toastify({
            message: "Value must be greater than zero.",
            type: "warning",
         });
      }

      updateWeight({
         completedExerciseSetOrder: completedExerciseSetOrder,
         weight: newWeight,
      });
   };

   return (
      <div className={styles.inputWrapper}>
         <div className={styles.weightIncrementWrapper}>
            <button
               className={styles.weightIncrementBtn}
               onClick={handle05IncrementClick}
            >
               0.5
            </button>
            <button
               className={styles.weightIncrementBtn}
               onClick={handle1IncrementClick}
            >
               1
            </button>
            <button
               className={styles.weightIncrementBtn}
               onClick={handle5IncrementClick}
            >
               5
            </button>
         </div>
         <input
            className={`standardInput ${styles.decimalInput}`}
            type="number"
            inputMode="decimal"
            value={weight}
            onChange={handleWeightChange}
         />
         <div className={styles.weightIncrementWrapper}>
            <button
               className={styles.weightDecrementBtn}
               onClick={handle05DecrementClick}
            >
               0.5
            </button>
            <button
               className={styles.weightDecrementBtn}
               onClick={handle1DecrementClick}
            >
               1
            </button>
            <button
               className={styles.weightDecrementBtn}
               onClick={handle5DecrementClick}
            >
               5
            </button>
         </div>
         <span className={styles.inputLabel}>{weightUnit}</span>
      </div>
   );
}
