import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from "./Inputs.module.css";

export interface TimedInputPropsType {
   hr: number;
   min: number;
   sec: number;
   updateHr: (hr: number) => void;
   updateMin: (min: number) => void;
   updateSec: (sec: number) => void;
}

export default function TimedInput({
   hr,
   min,
   sec,
   updateHr,
   updateMin,
   updateSec,
}: TimedInputPropsType) {
   const handleHrChange = (event) => {
      updateHr(event.target.value);
   };

   const handleMinChange = (event) => {
      updateMin(event.target.value);
   };

   const handleSecChange = (event) => {
      updateSec(event.target.value);
   };

   return (
      <div className={styles.inputsWrapper}>
         <div className={styles.inputWrapper}>
            <button className={`standardIconBtn ${styles.incrementBtn}`}>
               <FaChevronUp />
            </button>
            <input
               className={`standardInput ${styles.numberInput}`}
               type="number"
               inputMode="numeric"
               value={hr}
               onChange={handleHrChange}
            />
            <button className={`standardIconBtn ${styles.incrementBtn}`}>
               <FaChevronDown />
            </button>
            <span className={styles.inputLabel}>hr</span>
         </div>
         <div className={styles.inputWrapper}>
            <button className={`standardIconBtn ${styles.incrementBtn}`}>
               <FaChevronUp />
            </button>
            <input
               className={`standardInput ${styles.numberInput}`}
               type="number"
               inputMode="numeric"
               value={min}
               onChange={handleMinChange}
            />
            <button className={`standardIconBtn ${styles.incrementBtn}`}>
               <FaChevronDown />
            </button>
            <span className={styles.inputLabel}>min</span>
         </div>
         <div className={styles.inputWrapper}>
            <button className={`standardIconBtn ${styles.incrementBtn}`}>
               <FaChevronUp />
            </button>
            <input
               className={`standardInput ${styles.numberInput}`}
               type="number"
               inputMode="numeric"
               value={sec}
               onChange={handleSecChange}
            />
            <button className={`standardIconBtn ${styles.incrementBtn}`}>
               <FaChevronDown />
            </button>
            <span className={styles.inputLabel}>sec</span>
         </div>
      </div>
   );
}
