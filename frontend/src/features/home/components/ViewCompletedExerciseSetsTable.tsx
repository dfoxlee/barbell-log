import { useFetchDistanceUnits } from "../../../hooks/useFetchDistanceUnits";
import { useFetchWeightUnits } from "../../../hooks/useFetchWeightUnits";
import { completedExerciseSetFormat } from "../../../utils/formatting";
import type { CompletedExerciseSetType } from "../../../types/completed-exercise-set.types";
import { FaCheckCircle } from "react-icons/fa";

import styles from "./ViewExerciseSetsTable.module.css";

export default function ViewCompletedExerciseSetsTable({
   exerciseSets,
   exerciseName,
}: {
   exerciseSets: CompletedExerciseSetType[];
   exerciseName: string;
}) {
   const { weightUnits } = useFetchWeightUnits();
   const { distanceUnits } = useFetchDistanceUnits();
   console.log(exerciseSets);

   return (
      <div className={styles.container}>
         <h5 className={styles.exerciseName}>{exerciseName}</h5>
         <table className={styles.tableWrapper}>
            <thead>
               <tr>
                  <th className={styles.tableHeader}>set</th>
                  <th className={styles.tableHeader}>output</th>
                  <th className={styles.tableHeader}>complete</th>
                  <th className={styles.tableHeader}>notes</th>
               </tr>
            </thead>
            <tbody>
               {exerciseSets.map((set) => (
                  <tr
                     key={`${set.exerciseSetId}-${set.completedExerciseSetOrder}`}
                  >
                     <td className={styles.tableData}>
                        {set.completedExerciseSetOrder}
                     </td>
                     <td className={styles.tableData}>
                        {set &&
                           weightUnits &&
                           distanceUnits &&
                           completedExerciseSetFormat({
                              completedExerciseSet: set,
                              weightUnits,
                              distanceUnits,
                           })}
                     </td>
                     <td className={styles.tableData}>
                        {set.wasCompleted ? (
                           <div className={styles.completeIconWrapper}>
                              <FaCheckCircle className={styles.completeIcon} />
                           </div>
                        ) : null}
                     </td>
                     <td className={`${styles.tableData} ${styles.notes}`}>{set.notes}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}
