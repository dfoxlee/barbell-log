import { useMemo } from "react";
import { useCompletedWorkoutStore } from "../../../stores/completed-workout.store";
import { useFetchWeightUnits } from "../../../hooks/useFetchWeightUnits";
import { useFetchDistanceUnits } from "../../../hooks/useFetchDistanceUnits";
import { completedExerciseSetFormat } from "../../../utils/formatting";
import StandardIconBtn from "../../shared/StandardIconBtn";
import { FaCheck, FaCheckCircle, FaStepForward, FaTrash } from "react-icons/fa";

import styles from "./CompletedExerciseSetsTable.module.css";
import type { CompletedExerciseSetType } from "../../../types/completed-exercise-set.types";
import type { CompletedWorkoutType } from "../../../types/completed-workout.types";
import toastify from "../../../utils/toastify";

export default function CompletedExerciseSetsTable() {
   const completedWorkout = useCompletedWorkoutStore(
      (state) => state.completedWorkout
   );
   const currentCompletedExerciseOrder = useCompletedWorkoutStore(
      (state) => state.currentCompletedExerciseOrder
   );
   const currentCompletedExerciseSetOrder = useCompletedWorkoutStore(
      (state) => state.currentCompletedExerciseSetOrder
   );
   const setCompletedWorkout = useCompletedWorkoutStore(
      (state) => state.setCompletedWorkout
   );
   const setCurrentCompletedExerciseSetOrder = useCompletedWorkoutStore(
      (state) => state.setCurrentCompletedExerciseSetOrder
   );
   const setCurrentCompletedExerciseOrder = useCompletedWorkoutStore(
      (state) => state.setCurrentCompletedExerciseOrder
   );
   const { weightUnits } = useFetchWeightUnits();
   const { distanceUnits } = useFetchDistanceUnits();
   const completedExerciseSets = useMemo(
      () =>
         completedWorkout?.completedExercises.find(
            (ce) => ce.completedExerciseOrder === currentCompletedExerciseOrder
         )?.completedExerciseSets,
      [completedWorkout, currentCompletedExerciseOrder]
   );

   const handleDeleteCompletedExerciseSetClick = () => {
      console.log("delete completed exercise set");
   };

   const handleSelectSetClick = () => {
      console.log("select set");
   };

   const handleCompleteExerciseSetClick = (
      completedExerciseSet: CompletedExerciseSetType
   ) => {
      if (!completedWorkout) {
         return;
      }

      const updatedSet = {
         ...completedExerciseSet,
         wasCompleted: !completedExerciseSet.wasCompleted,
      };

      if (!updatedSet.wasCompleted) {
         const updatedSets = completedExerciseSets?.map((s) =>
            s.completedExerciseSetOrder === updatedSet.completedExerciseSetOrder
               ? updatedSet
               : s
         );

         const currentExercise = completedWorkout?.completedExercises.find(
            (e) => e.completedExerciseOrder === currentCompletedExerciseOrder
         );

         const updatedExercise = {
            ...currentExercise,
            completedExerciseSets: updatedSets,
         };

         const updatedExercises = completedWorkout?.completedExercises.map(
            (e) =>
               e.completedExerciseOrder ===
               updatedExercise.completedExerciseOrder
                  ? updatedExercise
                  : e
         );

         const updatedWorkout = {
            ...completedWorkout,
            completedExercises: updatedExercises,
         };

         setCompletedWorkout(updatedWorkout as CompletedWorkoutType);
         return;
      }

      const updatedSets = completedExerciseSets?.map((s) =>
         s.completedExerciseSetOrder === updatedSet.completedExerciseSetOrder
            ? updatedSet
            : s
      );

      const currentExercise = completedWorkout?.completedExercises.find(
         (e) => e.completedExerciseOrder === currentCompletedExerciseOrder
      );

      const updatedExercise = {
         ...currentExercise,
         completedExerciseSets: updatedSets,
      };

      const updatedExercises = completedWorkout?.completedExercises.map((e) =>
         e.completedExerciseOrder === updatedExercise.completedExerciseOrder
            ? updatedExercise
            : e
      );

      const updatedWorkout = {
         ...completedWorkout,
         completedExercises: updatedExercises,
      };

      setCompletedWorkout(updatedWorkout as CompletedWorkoutType);

      const maxSetOrder = updatedSets?.reduce(
         (prev, curr) =>
            curr.completedExerciseSetOrder > prev
               ? curr.completedExerciseSetOrder
               : prev,
         -1
      );

      if (maxSetOrder === updatedSet.completedExerciseSetOrder) {
         const maxExerciseOrder = completedWorkout.completedExercises!.reduce(
            (prev, curr) =>
               curr.completedExerciseOrder > prev
                  ? curr.completedExerciseOrder
                  : prev,
            -1
         );

         if (maxExerciseOrder === updatedExercise.completedExerciseOrder) {
            return toastify({
               message: "Congratulations!! You did it!",
               type: "success",
            });
         } else {
            const nextExerciseOrder = currentCompletedExerciseOrder + 1;

            setCurrentCompletedExerciseOrder(nextExerciseOrder);
         }
      }
   };

   return (
      <table className={styles.container}>
         <thead>
            <tr>
               <th className={styles.tableHeader}>set</th>
               <th className={styles.tableHeader}>output</th>
               <th className={styles.tableHeader}>options</th>
            </tr>
         </thead>
         <tbody>
            {completedExerciseSets?.map((ces) => (
               <tr key={ces.completedExerciseSetOrder}>
                  <td className={styles.tableData}>
                     {ces.completedExerciseSetOrder}
                  </td>
                  <td className={styles.tableData}>
                     {weightUnits &&
                        distanceUnits &&
                        completedExerciseSetFormat({
                           completedExerciseSet: ces,
                           weightUnits,
                           distanceUnits,
                        })}
                  </td>
                  <td className={styles.tableData}>
                     <div className={styles.optionsWrapper}>
                        <button
                           className={
                              ces.wasCompleted
                                 ? `${styles.completeExerciseSetBtn} ${styles.completedExerciseSetBtn}`
                                 : styles.completeExerciseSetBtn
                           }
                           onClick={() => handleCompleteExerciseSetClick(ces)}
                        >
                           <FaCheck />
                        </button>
                        <StandardIconBtn
                           Icon={FaTrash}
                           onClick={handleDeleteCompletedExerciseSetClick}
                        />
                        {ces.completedExerciseSetOrder !==
                        currentCompletedExerciseSetOrder ? (
                           <StandardIconBtn
                              Icon={FaStepForward}
                              onClick={handleSelectSetClick}
                           />
                        ) : null}
                     </div>
                  </td>
               </tr>
            ))}
         </tbody>
      </table>
   );
}
