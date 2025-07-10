import { useMemo } from "react";
import { useBarbellLogContext } from "../../../hooks/useBarbellLogContext";
import Loading from "../../shared/Loading";
import {
   FaChevronDown,
   FaChevronUp,
   FaMinusCircle,
   FaPlusCircle,
} from "react-icons/fa";

import styles from "./CurrentSet.module.css";

export default function CurrentSet() {
   const { barbellLogState, barbellLogDispatch } = useBarbellLogContext();
   const currentExercise = useMemo(
      () =>
         barbellLogState.completedExercises.find(
            (exercise) =>
               exercise.completedExerciseOrder ===
               barbellLogState.currentExercise
         ),
      [barbellLogState]
   );
   const currentSet = useMemo(
      () =>
         currentExercise
            ? currentExercise.completedSets.find(
                 (set) => set.setOrder === barbellLogState.currentSet
              )
            : null,
      [currentExercise, barbellLogState]
   );

   if (!currentSet) {
      return <Loading />;
   }

   const handleRepsIncrement = () => {
      const updatedSet = {
         ...currentSet,
         completedReps: parseInt(currentSet.completedReps) + 1,
      };

      barbellLogDispatch({
         type: "UPDATE-SET",
         payload: updatedSet,
      });
   };

   const handleRepsChange = (event) => {
      if (!parseInt(event.target.value)) {
         return;
      }

      const updatedSet = {
         ...currentSet,
         completedReps: event.target.value,
      };

      barbellLogDispatch({
         type: "UPDATE-SET",
         payload: updatedSet,
      });
   };

   const handleRepsDecrement = () => {
      if (parseInt(currentSet.completedReps) <= 0) {
         return;
      }

      const updatedSet = {
         ...currentSet,
         completedReps: parseInt(currentSet.completedReps) - 1,
      };

      barbellLogDispatch({
         type: "UPDATE-SET",
         payload: updatedSet,
      });
   };

   const handleWeightIncrement = (value) => {
      const updatedSet = {
         ...currentSet,
         completedWeight:
            parseFloat(currentSet.completedWeight) + parseFloat(value),
      };

      barbellLogDispatch({
         type: "UPDATE-SET",
         payload: updatedSet,
      });
   };

   const handleWeightChange = (event) => {
      if (!parseInt(event.target.value)) {
         return;
      }

      const updatedSet = {
         ...currentSet,
         completedWeight: event.target.value,
      };

      barbellLogDispatch({
         type: "UPDATE-SET",
         payload: updatedSet,
      });
   };

   const handleWeightDecrement = (value) => {
      if (parseFloat(currentSet.completedWeight) - parseFloat(value) < 0) {
         return;
      }

      const updatedSet = {
         ...currentSet,
         completedWeight:
            parseFloat(currentSet.completedWeight) - parseFloat(value),
      };

      barbellLogDispatch({
         type: "UPDATE-SET",
         payload: updatedSet,
      });
   };

   return (
      <div className={styles.container}>
         <div className={styles.inputWrapper}>
            <button className={styles.inputBtn} onClick={handleRepsIncrement}>
               <FaChevronUp />
            </button>
            <input
               className={styles.repsInput}
               type="number"
               inputMode="decimal"
               value={currentSet.completedReps}
               onChange={handleRepsChange}
            />
            <button className={styles.inputBtn} onClick={handleRepsDecrement}>
               <FaChevronDown />
            </button>
         </div>
         <div className={styles.inputWrapper}>
            <div className={styles.weightIncrementWrapper}>
               <button
                  className={styles.weightIncrementBtn}
                  onClick={(e) => handleWeightIncrement(0.5)}
               >
                  0.5
               </button>
               <button
                  className={styles.weightIncrementBtn}
                  onClick={(e) => handleWeightIncrement(1)}
               >
                  1
               </button>
               <button
                  className={styles.weightIncrementBtn}
                  onClick={(e) => handleWeightIncrement(5)}
               >
                  5
               </button>
            </div>
            <input
               className={styles.weightInput}
               type="number"
               inputMode="decimal"
               value={currentSet.completedWeight}
               onChange={handleWeightChange}
            />
            <div className={styles.weightIncrementWrapper}>
               <button
                  className={styles.weightDecrementBtn}
                  onClick={(e) => handleWeightDecrement(0.5)}
               >
                  0.5
               </button>
               <button
                  className={styles.weightDecrementBtn}
                  onClick={(e) => handleWeightDecrement(1)}
               >
                  1
               </button>
               <button
                  className={styles.weightDecrementBtn}
                  onClick={(e) => handleWeightDecrement(5)}
               >
                  5
               </button>
            </div>
         </div>
      </div>
   );
}
