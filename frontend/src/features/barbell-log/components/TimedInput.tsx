import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from "./Inputs.module.css";
import toastify from "../../../utils/toastify";

export interface TimedInputPropsType {
   hr: number;
   min: number;
   sec: number;
   completedExerciseSetOrder: number;
   isComplete: boolean;
   updateHr: ({
      completedExerciseSetOrder,
      hr,
   }: {
      completedExerciseSetOrder: number;
      hr: number;
   }) => void;
   updateMin: ({
      completedExerciseSetOrder,
      min,
   }: {
      completedExerciseSetOrder: number;
      min: number;
   }) => void;
   updateSec: ({
      completedExerciseSetOrder,
      sec,
   }: {
      completedExerciseSetOrder: number;
      sec: number;
   }) => void;
}

export default function TimedInput({
   hr,
   min,
   sec,
   completedExerciseSetOrder,
   isComplete,
   updateHr,
   updateMin,
   updateSec,
}: TimedInputPropsType) {
   const handleHrChange = (event) => {
      const hrInput = event.target.value;

      if (hrInput !== "" && !/^[0-9]+$/.test(hrInput)) {
         return toastify({
            message: "Hours value must be a valid number.",
            type: "warning",
         });
      }

      updateHr({
         hr: hrInput,
         completedExerciseSetOrder,
      });
   };

   const handleHrIncrement = () => {
      if (hr < 23) {
         updateHr({ hr: hr + 1, completedExerciseSetOrder });
      }
   };

   const handleHrDecrement = () => {
      if (hr > 0) {
         updateHr({ hr: hr - 1, completedExerciseSetOrder });
      }
   };

   const handleMinChange = (event) => {
      const minInput = event.target.value;

      if (minInput !== "" && !/^[0-9]+$/.test(minInput)) {
         return toastify({
            message: "Minutes value must be a valid number.",
            type: "warning",
         });
      }

      updateMin({
         min: minInput,
         completedExerciseSetOrder,
      });
   };

   const handleMinIncrement = () => {
      if (min < 59) {
         updateMin({ min: min + 1, completedExerciseSetOrder });
      }
   };

   const handleMinDecrement = () => {
      if (min > 0) {
         updateMin({ min: min - 1, completedExerciseSetOrder });
      }
   };

   const handleSecChange = (event) => {
      const secInput = event.target.value;

      if (secInput !== "" && !/^[0-9]+$/.test(secInput)) {
         return toastify({
            message: "Seconds value must be a valid number.",
            type: "warning",
         });
      }

      updateSec({ sec: secInput, completedExerciseSetOrder });
   };

   const handleSecIncrement = () => {
      if (sec < 59) {
         updateSec({ sec: sec + 1, completedExerciseSetOrder });
      }
   };

   const handleSecDecrement = () => {
      if (sec > 0) {
         updateSec({ sec: sec - 1, completedExerciseSetOrder });
      }
   };

   return (
      <div className={styles.inputsWrapper}>
         <div className={styles.inputWrapper}>
            {!isComplete ? (
               <button
                  className={`standardIconBtn ${styles.incrementBtn}`}
                  onClick={handleHrIncrement}
               >
                  <FaChevronUp />
               </button>
            ) : null}
            <input
               className={`standardInput ${styles.numberInput}`}
               type="number"
               inputMode="numeric"
               value={hr}
               onChange={handleHrChange}
            />
            {!isComplete ? (
               <button
                  className={`standardIconBtn ${styles.incrementBtn}`}
                  onClick={handleHrDecrement}
               >
                  <FaChevronDown />
               </button>
            ) : null}
            <span className={styles.inputLabel}>hr</span>
         </div>
         <div className={styles.inputWrapper}>
            {!isComplete ? (
               <button
                  className={`standardIconBtn ${styles.incrementBtn}`}
                  onClick={handleMinIncrement}
               >
                  <FaChevronUp />
               </button>
            ) : null}
            <input
               className={`standardInput ${styles.numberInput}`}
               type="number"
               inputMode="numeric"
               value={min}
               onChange={handleMinChange}
            />
            {!isComplete ? (
               <button
                  className={`standardIconBtn ${styles.incrementBtn}`}
                  onClick={handleMinDecrement}
               >
                  <FaChevronDown />
               </button>
            ) : null}
            <span className={styles.inputLabel}>min</span>
         </div>
         <div className={styles.inputWrapper}>
            {!isComplete ? (
               <button
                  className={`standardIconBtn ${styles.incrementBtn}`}
                  onClick={handleSecIncrement}
               >
                  <FaChevronUp />
               </button>
            ) : null}
            <input
               className={`standardInput ${styles.numberInput}`}
               type="number"
               inputMode="numeric"
               value={sec}
               onChange={handleSecChange}
            />
            {!isComplete ? (
               <button
                  className={`standardIconBtn ${styles.incrementBtn}`}
                  onClick={handleSecDecrement}
               >
                  <FaChevronDown />
               </button>
            ) : null}
            <span className={styles.inputLabel}>sec</span>
         </div>
      </div>
   );
}
