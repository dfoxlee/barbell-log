import type { ChangeEvent } from "react";
import FractionalValueInput from "../../shared/FractionalValueInput";
import WeightUnitSelector from "../../shared/WeightUnitSelector";

import styles from "./WeightInput.module.css";

interface WeightInputType {
   weight: number;
   completedWeightUnit: number;
}

export default function WeightInput({
   weight,
   completedWeightUnit,
}: WeightInputType) {
   const handleWeightChange = (value: number) => {
      console.log("weight change", value);
   };

   const handleWeightUnitChange = (event: ChangeEvent<HTMLSelectElement>) => {
      console.log("weight change", event.target.value);
   };

   return (
      <div className={styles.container}>
         <div className={styles.weightInputsWrapper}>
            <div className={styles.incrementBtnsWrapper}>
               <button className={styles.incrementBtn}>0.5</button>
               <button className={styles.incrementBtn}>1</button>
               <button className={styles.incrementBtn}>5</button>
            </div>
            <FractionalValueInput value={weight} onBlur={handleWeightChange} />
            <div className={styles.incrementBtnsWrapper}>
               <button className={styles.decrementBtn}>0.5</button>
               <button className={styles.decrementBtn}>1</button>
               <button className={styles.decrementBtn}>5</button>
            </div>
         </div>
         <WeightUnitSelector
            value={completedWeightUnit}
            onChange={handleWeightUnitChange}
         />
      </div>
   );
}
