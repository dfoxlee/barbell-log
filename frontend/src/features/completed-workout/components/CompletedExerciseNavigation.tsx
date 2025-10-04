import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";
import StandardIconBtn from "../../shared/StandardIconBtn";
import StandardBtn from "../../shared/StandardBtn";
import { useCompletedWorkoutStore } from "../../../stores/completed-workout.store";
import type { ChangeEvent } from "react";

import styles from "./CompletedExerciseNavigation.module.css";

export default function CompletedExerciseNavigation() {
   const currentCompletedExerciseOrder = useCompletedWorkoutStore(
      (state) => state.currentCompletedExerciseOrder
   );
   const completedWorkout = useCompletedWorkoutStore(
      (state) => state.completedWorkout
   );

   const handleCompletedExerciseDecrement = () => {
      console.log("decrement exercise");
   };

   const handleCompletedExerciseChange = (
      event: ChangeEvent<HTMLSelectElement>
   ) => {
      console.log("change completed exercise", event.target.value);
   };

   const handleCompletedExerciseIncrement = () => {
      console.log("completed exercise increment");
   };

   const handleAddCompletedExercise = () => {
      console.log("add completed exercise");
   };

   return (
      <div className={styles.exerciseNavigationWrapper}>
         {currentCompletedExerciseOrder > 1 ? (
            <StandardIconBtn
               Icon={FaChevronLeft}
               onClick={handleCompletedExerciseDecrement}
            />
         ) : null}
         <select
            className={styles.exerciseSelector}
            name="exercises"
            id="exercises"
            value={currentCompletedExerciseOrder}
            onChange={handleCompletedExerciseChange}
         >
            {completedWorkout?.completedExercises.map((completedExercise) => (
               <option
                  key={completedExercise.completedExerciseOrder}
                  value={completedExercise.completedExerciseOrder}
               >
                  {completedExercise.completedExerciseName.length
                     ? completedExercise.completedExerciseName
                     : `Exercise ${completedExercise.completedExerciseOrder}`}
               </option>
            ))}
         </select>
         {completedWorkout?.completedExercises &&
         currentCompletedExerciseOrder <
            completedWorkout.completedExercises.length ? (
            <StandardIconBtn
               Icon={FaChevronRight}
               onClick={handleCompletedExerciseIncrement}
            />
         ) : (
            <StandardBtn
               text="Exercise"
               Icon={FaPlus}
               onClick={handleAddCompletedExercise}
            />
         )}
      </div>
   );
}
