import { useMemo } from "react";
import { useCompletedWorkoutStore } from "../../../stores/completed-workout.store";
import { useFetchWeightUnits } from "../../../hooks/useFetchWeightUnits";
import { useFetchDistanceUnits } from "../../../hooks/useFetchDistanceUnits";
import { completedExerciseSetFormat } from "../../../utils/formatting";
import StandardIconBtn from "../../shared/StandardIconBtn";
import { FaCheckCircle, FaStepForward, FaTrash } from "react-icons/fa";

import styles from "./CompletedExerciseSetsTable.module.css";

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
                     {completedExerciseSetFormat({
                        completedExerciseSet: ces,
                        weightUnits,
                        distanceUnits,
                     })}
                  </td>
                  <td className={styles.tableData}>
                     <div className={styles.optionsWrapper}>
                        <StandardIconBtn Icon={FaCheckCircle} />
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
