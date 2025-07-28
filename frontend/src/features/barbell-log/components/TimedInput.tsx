import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from "./Inputs.module.css";

export interface TimedInputPropsType {
   hr: number;
   min: number;
   sec: number;
   completedExerciseSetOrder: number;
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
   updateHr,
   updateMin,
   updateSec,
}: TimedInputPropsType) {
   const handleHrChange = (event) => {
      updateHr({
         hr: event.target.value,
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
      updateMin({
         min: event.target.value,
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
      updateSec({ sec: event.target.value, completedExerciseSetOrder });
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
            <button
               className={`standardIconBtn ${styles.incrementBtn}`}
               onClick={handleHrIncrement}
            >
               <FaChevronUp />
            </button>
            <input
               className={`standardInput ${styles.numberInput}`}
               type="number"
               inputMode="numeric"
               value={hr}
               onChange={handleHrChange}
            />
            <button
               className={`standardIconBtn ${styles.incrementBtn}`}
               onClick={handleHrDecrement}
            >
               <FaChevronDown />
            </button>
            <span className={styles.inputLabel}>hr</span>
         </div>
         <div className={styles.inputWrapper}>
            <button
               className={`standardIconBtn ${styles.incrementBtn}`}
               onClick={handleMinIncrement}
            >
               <FaChevronUp />
            </button>
            <input
               className={`standardInput ${styles.numberInput}`}
               type="number"
               inputMode="numeric"
               value={min}
               onChange={handleMinChange}
            />
            <button
               className={`standardIconBtn ${styles.incrementBtn}`}
               onClick={handleMinDecrement}
            >
               <FaChevronDown />
            </button>
            <span className={styles.inputLabel}>min</span>
         </div>
         <div className={styles.inputWrapper}>
            <button
               className={`standardIconBtn ${styles.incrementBtn}`}
               onClick={handleSecIncrement}
            >
               <FaChevronUp />
            </button>
            <input
               className={`standardInput ${styles.numberInput}`}
               type="number"
               inputMode="numeric"
               value={sec}
               onChange={handleSecChange}
            />
            <button
               className={`standardIconBtn ${styles.incrementBtn}`}
               onClick={handleSecDecrement}
            >
               <FaChevronDown />
            </button>
            <span className={styles.inputLabel}>sec</span>
         </div>
      </div>
   );
}
