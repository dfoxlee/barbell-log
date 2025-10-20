import { FaCheckCircle, FaPencilAlt } from "react-icons/fa";
import type { CompletedExerciseType } from "../../../types/completed-exercise.types";
import StandardIconBtn from "../../shared/StandardIconBtn";
import { completedExerciseSetFormat } from "../../../utils/formatting";
import { useFetchWeightUnits } from "../../../hooks/useFetchWeightUnits";
import { useFetchDistanceUnits } from "../../../hooks/useFetchDistanceUnits";
import { useCompletedWorkoutStore } from "../../../stores/completed-workout.store";
import type { CompletedExerciseSetType } from "../../../types/completed-exercise-set.types";
import type { CompletedWorkoutType } from "../../../types/completed-workout.types";

import styles from "./CompletedExerciseOverview.module.css";

interface CompletedExerciseOverviewProps {
   completedExercise: CompletedExerciseType;
   handleExercisesOverviewClick: () => void;
}

export default function CompletedExerciseOverview({
   completedExercise,
   handleExercisesOverviewClick,
}: CompletedExerciseOverviewProps) {
   const { weightUnits } = useFetchWeightUnits();
   const { distanceUnits } = useFetchDistanceUnits();
   const completedWorkout = useCompletedWorkoutStore(
      (state) => state.completedWorkout
   );
   const setCompletedWorkout = useCompletedWorkoutStore(
      (state) => state.setCompletedWorkout
   );
   const setCurrentCompletedExerciseOrder = useCompletedWorkoutStore(
      (state) => state.setCurrentCompletedExerciseOrder
   );

   const handleEditExerciseClick = () => {
      setCurrentCompletedExerciseOrder(
         completedExercise.completedExerciseOrder
      );
      handleExercisesOverviewClick();
   };

   const handleCompleteClick = (set: CompletedExerciseSetType) => {
      const newWasCompleted = !set.wasCompleted;

      const updatedSet = {
         ...set,
         wasCompleted: newWasCompleted,
      };

      const updatedSets = completedExercise.completedExerciseSets.map((s) =>
         s.completedExerciseSetOrder === updatedSet.completedExerciseSetOrder
            ? updatedSet
            : s
      );

      const updatedExercise = {
         ...completedExercise,
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
   };

   return (
      <div className={styles.container}>
         <div className={styles.headerWrapper}>
            <h4>
               {completedExercise.completedExerciseName.length
                  ? `${completedExercise.completedExerciseOrder}. ${completedExercise.completedExerciseName}`
                  : `${completedExercise.completedExerciseOrder}. New Exercise`}
            </h4>
            <StandardIconBtn
               Icon={FaPencilAlt}
               onClick={handleEditExerciseClick}
            />
         </div>
         <table className={styles.tableWrapper}>
            <thead>
               <tr>
                  <th className={styles.tableHeader}>set</th>
                  <th className={styles.tableHeader}>output</th>
                  <th className={styles.tableHeader}>complete</th>
               </tr>
            </thead>
            <tbody>
               {completedExercise.completedExerciseSets.map((s) => (
                  <tr key={s.completedExerciseSetOrder}>
                     <td className={styles.tableData}>
                        {s.completedExerciseSetOrder}
                     </td>
                     <td className={styles.tableData}>
                        {weightUnits &&
                           distanceUnits &&
                           completedExerciseSetFormat({
                              completedExerciseSet: s,
                              weightUnits,
                              distanceUnits,
                           })}
                     </td>
                     <td className={styles.tableData}>
                        <StandardIconBtn
                           Icon={FaCheckCircle}
                           theme={s.wasCompleted ? null : "NOT-SELECTED"}
                           onClick={() => handleCompleteClick(s)}
                        />
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}
