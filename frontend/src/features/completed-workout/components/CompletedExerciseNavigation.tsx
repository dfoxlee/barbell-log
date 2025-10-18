import { FaChevronLeft, FaChevronRight, FaEdit, FaPlus } from "react-icons/fa";
import StandardIconBtn from "../../shared/StandardIconBtn";
import StandardBtn from "../../shared/StandardBtn";
import { useCompletedWorkoutStore } from "../../../stores/completed-workout.store";
import { useState, type ChangeEvent } from "react";

import styles from "./CompletedExerciseNavigation.module.css";
import ExerciseNameInput from "../../shared/ExerciseNameInput";
import type { CompletedWorkoutType } from "../../../types/completed-workout.types";

export default function CompletedExerciseNavigation() {
   const [exerciseState, setExerciseState] = useState<"NAVIGATE" | "EDIT">(
      "NAVIGATE"
   );
   const currentCompletedExerciseOrder = useCompletedWorkoutStore(
      (state) => state.currentCompletedExerciseOrder
   );
   const setCurrentCompletedExerciseOrder = useCompletedWorkoutStore(
      (state) => state.setCurrentCompletedExerciseOrder
   );
   const completedWorkout = useCompletedWorkoutStore(
      (state) => state.completedWorkout
   );
   const setCompletedWorkout = useCompletedWorkoutStore(
      (state) => state.setCompletedWorkout
   );

   const handleCompletedExerciseDecrement = () => {
      const updatedCurrentExerciseOrder = currentCompletedExerciseOrder - 1;

      setCurrentCompletedExerciseOrder(updatedCurrentExerciseOrder);
   };

   const handleCompletedExerciseChange = (
      event: ChangeEvent<HTMLSelectElement>
   ) => {
      setCurrentCompletedExerciseOrder(parseInt(event.target.value));
   };

   const handleCompletedExerciseIncrement = () => {
      const updatedCurrentExerciseOrder = currentCompletedExerciseOrder + 1;

      setCurrentCompletedExerciseOrder(updatedCurrentExerciseOrder);
   };

   const handleAddCompletedExercise = () => {
      console.log("add completed exercise");
   };

   const handleEditExerciseClick = () => {
      setExerciseState((prev) => (prev === "NAVIGATE" ? "EDIT" : "NAVIGATE"));
   };

   const handleCompletedExerciseNameChange = (exerciseChange: string) => {
      const updatedExercise = completedWorkout?.completedExercises.find(
         (ce) => ce.completedExerciseOrder === currentCompletedExerciseOrder
      );

      if (updatedExercise) {
         updatedExercise.completedExerciseName = exerciseChange;

         const updatedExercises = completedWorkout?.completedExercises.map(
            (ce) =>
               ce.completedExerciseOrder ===
               updatedExercise?.completedExerciseOrder
                  ? updatedExercise
                  : ce
         );

         const updatedWorkout = {
            ...completedWorkout,
            completedExercises: updatedExercises,
         };

         setCompletedWorkout(updatedWorkout as CompletedWorkoutType);
      }
   };

   return (
      <div className={styles.exerciseNavigationWrapper}>
         <StandardIconBtn
            Icon={FaChevronLeft}
            onClick={handleCompletedExerciseDecrement}
            disabled={currentCompletedExerciseOrder < 2}
         />
         <div className={styles.exerciseWrapper}>
            {exerciseState === "NAVIGATE" ? (
               <select
                  className={styles.exerciseSelector}
                  name="exercises"
                  id="exercises"
                  value={currentCompletedExerciseOrder}
                  onChange={handleCompletedExerciseChange}
               >
                  {completedWorkout?.completedExercises.map(
                     (completedExercise) => (
                        <option
                           key={completedExercise.completedExerciseOrder}
                           value={completedExercise.completedExerciseOrder}
                        >
                           {completedExercise.completedExerciseName.length
                              ? completedExercise.completedExerciseName
                              : `Exercise ${completedExercise.completedExerciseOrder}`}
                        </option>
                     )
                  )}
               </select>
            ) : (
               <ExerciseNameInput
                  value={
                     completedWorkout?.completedExercises.find(
                        (e) =>
                           e.completedExerciseOrder ===
                           currentCompletedExerciseOrder
                     )?.completedExerciseName ?? ""
                  }
                  onChange={handleCompletedExerciseNameChange}
               />
            )}
            <StandardIconBtn Icon={FaEdit} onClick={handleEditExerciseClick} />
         </div>
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
