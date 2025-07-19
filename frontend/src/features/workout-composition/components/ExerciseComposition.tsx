import {
   FaChevronLeft,
   FaChevronRight,
   FaPencilAlt,
   FaPlus,
   FaToggleOff,
   FaTrashAlt,
} from "react-icons/fa";
import ExerciseSetRow from "./ExerciseSetRow";
import { useWorkoutCompositionStore } from "../../../stores/workoutCompositionStore";
import { useMemo } from "react";

import styles from "./ExerciseComposition.module.css";
import ExerciseSetEditRow from "./ExerciseSetEditRow";

export default function ExerciseComposition() {
   const workoutComposition = useWorkoutCompositionStore(
      (state) => state.workoutComposition
   );
   const currentExerciseViewOrder = useWorkoutCompositionStore(
      (state) => state.currentExerciseViewOrder
   );
   const currentExerciseSetViewOrder = useWorkoutCompositionStore(
      (state) => state.currentExerciseSetViewOrder
   );
   const updateExercise = useWorkoutCompositionStore(
      (state) => state.updateExercise
   );
   const currentExercise = useMemo(() => {
      return workoutComposition.exercises.find(
         (exercise) => exercise.exerciseOrder === currentExerciseViewOrder
      );
   }, [currentExerciseViewOrder, workoutComposition.exercises]);

   const handleAddSetClick = () => {
      if (currentExercise?.exerciseSets) {
         const latestSet =
            currentExercise.exerciseSets[
               currentExercise.exerciseSets.length - 1
            ];

         const updatedExerciseSets = [
            ...currentExercise.exerciseSets,
            {
               ...latestSet,
               exerciseSetOrder: latestSet.exerciseSetOrder + 1,
            },
         ];

         const updatedExercise = {
            ...currentExercise,
            exerciseSets: updatedExerciseSets,
         };

         updateExercise(updatedExercise);
      }
   };

   return (
      <div className={styles.container}>
         <div className={styles.exerciseNameInputWrapper}>
            <button className={styles.changeExerciseBtn}>
               <FaChevronLeft />
            </button>
            <input
               type="text"
               className="standardInput"
               placeholder="Exercise name..."
            />
            <button className={styles.changeExerciseBtn}>
               <FaChevronRight />
            </button>
         </div>
         <table className={styles.tableWrapper}>
            <thead>
               <tr>
                  <th className={styles.tableHeader}></th>
                  <th className={styles.tableHeader}>Set</th>
                  <th className={styles.tableHeader}>Reps</th>
                  <th className={styles.tableHeader}>Weight</th>
                  <th className={styles.tableHeader}></th>
               </tr>
            </thead>
            <tbody>
               {currentExercise
                  ? currentExercise.exerciseSets.map((exerciseSet) => {
                       return exerciseSet.exerciseSetOrder ===
                          currentExerciseSetViewOrder ? (
                          <ExerciseSetEditRow exerciseSet={exerciseSet} />
                       ) : (
                          <ExerciseSetRow exerciseSet={exerciseSet} />
                       );
                    })
                  : null}
            </tbody>
         </table>
         <button onClick={handleAddSetClick}>
            <FaPlus />
            <span>Set</span>
         </button>
      </div>
   );
}
