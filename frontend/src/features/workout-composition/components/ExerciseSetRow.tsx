import { FaFastForward, FaTrashAlt } from "react-icons/fa";
import type { ExerciseSetType } from "../../../types/workoutTypes";
import { useWorkoutCompositionStore } from "../../../stores/workoutCompositionStore";
import { useMemo } from "react";
import toastify from "../../../utils/toastify";
import { rwtdCellFormat } from "../../../utils/formatting";

import styles from "./ExerciseSetsGrid.module.css";

export default function ExerciseSetRow({
   exerciseSet,
   toggleViewAllExerciseSets,
   viewAllExerciseSets,
}: {
   exerciseSet: ExerciseSetType;
   toggleViewAllExerciseSets: () => void;
   viewAllExerciseSets: boolean;
}) {
   const workoutComposition = useWorkoutCompositionStore(
      (state) => state.workoutComposition
   );
   const currentExerciseViewOrder = useWorkoutCompositionStore(
      (state) => state.currentExerciseViewOrder
   );
   const currentExerciseSetViewOrder = useWorkoutCompositionStore(
      (state) => state.currentExerciseSetViewOrder
   );
   const updateCurrentExerciseSetViewOrder = useWorkoutCompositionStore(
      (state) => state.updateCurrentExerciseSetViewOrder
   );
   const updateWorkoutComposition = useWorkoutCompositionStore(
      (state) => state.updateWorkoutComposition
   );
   const currentExercise = useMemo(() => {
      return workoutComposition.exercises.find(
         (exercise) => exercise.exerciseOrder === currentExerciseViewOrder
      );
   }, [workoutComposition.exercises, currentExerciseViewOrder]);
   const currentExerciseSet = useMemo(() => {
      if (currentExercise) {
         return currentExercise.exerciseSets.find(
            (set) => set.exerciseSetOrder === currentExerciseSetViewOrder
         );
      }
   }, [currentExercise, currentExerciseSetViewOrder]);

   const handleSwitchToExerciseSet = () => {
      if (viewAllExerciseSets) {
         toggleViewAllExerciseSets();
      }

      updateCurrentExerciseSetViewOrder(exerciseSet.exerciseSetOrder);
   };

   const handleDeleteExerciseSetClick = () => {
      if (currentExercise?.exerciseSets.length === 1) {
         return toastify({
            message: "All exercises must have at least on set.",
            type: "warning",
         });
      }

      if (workoutComposition && currentExercise) {
         const updatedCurrentExerciseSets = currentExercise?.exerciseSets
            .filter(
               (set) =>
                  set.exerciseSetOrder !== currentExerciseSet?.exerciseSetOrder
            )
            .map((set, index) => ({
               ...set,
               exerciseSetOrder: index + 1,
            }));

         const updatedExercise = {
            ...currentExercise,
            exerciseSets: updatedCurrentExerciseSets,
         };

         const updatedWorkoutComposition = {
            ...workoutComposition,
            exercises: workoutComposition.exercises.map((exercise) =>
               exercise.exerciseOrder === updatedExercise.exerciseOrder
                  ? updatedExercise
                  : exercise
            ),
         };

         updateCurrentExerciseSetViewOrder(
            updatedCurrentExerciseSets[updatedCurrentExerciseSets.length - 1]
               .exerciseSetOrder
         );
         updateWorkoutComposition(updatedWorkoutComposition);
      }
   };

   return (
      <>
         <span className={styles.gridDataCell}>
            <div className={styles.exerciseSetRowOptions}>
               <button
                  className={`standardIconBtn ${styles.skipToSetBtn}`}
                  onClick={handleSwitchToExerciseSet}
               >
                  <FaFastForward />
               </button>
               {exerciseSet.isWarmup ? (
                  <span className={styles.warmUpIcon}>W</span>
               ) : null}
            </div>
         </span>
         <span className={styles.gridDataCell}>
            {exerciseSet.exerciseSetOrder}
         </span>
         <span className={styles.gridDataCell}>
            {currentExerciseSet && rwtdCellFormat(exerciseSet)}
         </span>
         <span className={styles.gridDataCell}>
            {currentExercise && currentExercise?.exerciseSets.length > 1 ? (
               <button
                  className={styles.deleteSetBtn}
                  onClick={handleDeleteExerciseSetClick}
               >
                  <FaTrashAlt />
               </button>
            ) : null}
         </span>
      </>
   );
}
