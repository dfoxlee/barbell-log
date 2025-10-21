import type { ChangeEvent } from "react";
import FractionalValueInput from "../../shared/FractionalValueInput";
import WeightUnitSelector from "../../shared/WeightUnitSelector";

import styles from "./WeightInput.module.css";
import toastify from "../../../utils/toastify";

interface WeightInputType {
   completedWeight: number;
   completedWeightUnit: number;
   updateCompletedWorkout: ({
      field,
      value,
   }: {
      field: string;
      value: number | string;
   }) => void;
}

export default function WeightInput({
   completedWeight,
   completedWeightUnit,
   updateCompletedWorkout,
}: WeightInputType) {
   const handleWeightChange = (value: number) => {
      const wholeNumberRegex = /^\d*$/;

      if (wholeNumberRegex.test(value.toString())) {
         updateCompletedWorkout({
            field: "weight",
            value,
         });
      }
   };

   const incrementWeight = (value: number) => {
      const newWeight =
         parseFloat(completedWeight.toString()) + parseFloat(value.toString());
      if (newWeight >= 0) {
         updateCompletedWorkout({
            field: "completedWeight",
            value: newWeight,
         });
      } else {
         return toastify({
            message: "Weight must be a positive value.",
            type: "info",
         });
      }
   };

   const handleWeightUnitChange = (event: ChangeEvent<HTMLSelectElement>) => {
      updateCompletedWorkout({
         field: "completedWeightUnit",
         value: event.target.value,
      });
   };

   return (
      <div className={styles.container}>
         <div className={styles.weightInputsWrapper}>
            <div className={styles.incrementBtnsWrapper}>
               <button
                  className={styles.incrementBtn}
                  onClick={() => incrementWeight(0.5)}
               >
                  0.5
               </button>
               <button
                  className={styles.incrementBtn}
                  onClick={() => incrementWeight(1)}
               >
                  1
               </button>
               <button
                  className={styles.incrementBtn}
                  onClick={() => incrementWeight(5)}
               >
                  5
               </button>
            </div>
            <FractionalValueInput
               value={completedWeight}
               onBlur={handleWeightChange}
            />
            <div className={styles.incrementBtnsWrapper}>
               <button
                  className={styles.decrementBtn}
                  onClick={() => incrementWeight(-0.5)}
               >
                  0.5
               </button>
               <button
                  className={styles.decrementBtn}
                  onClick={() => incrementWeight(-1)}
               >
                  1
               </button>
               <button
                  className={styles.decrementBtn}
                  onClick={() => incrementWeight(-5)}
               >
                  5
               </button>
            </div>
         </div>
         <WeightUnitSelector
            value={completedWeightUnit}
            onChange={handleWeightUnitChange}
         />
      </div>
   );
}
