import { useFetchDistanceUnits } from "../../../hooks/useFetchDistanceUnits";
import { useFetchWeightUnits } from "../../../hooks/useFetchWeightUnits";
import type { ExerciseSetType } from "../../../types/exercise-set.types";
import { exerciseSetFormat } from "../../../utils/formatting";

import styles from "./ViewExerciseSetsTable.module.css";

export default function ViewExerciseSetsTable({
   exerciseSets,
   exerciseName,
}: {
   exerciseSets: ExerciseSetType[];
   exerciseName: string;
}) {
   const { weightUnits } = useFetchWeightUnits();
   const { distanceUnits } = useFetchDistanceUnits();

   return (
      <div className={styles.container}>
         <h5 className={styles.exerciseName}>{exerciseName}</h5>
         <table className={styles.tableWrapper}>
            <thead>
               <tr>
                  <th className={styles.tableHeader}>set</th>
                  <th className={styles.tableHeader}>output</th>
               </tr>
            </thead>
            <tbody>
               {exerciseSets.map((set) => (
                  <tr key={`${set.exerciseSetId}-${set.exerciseSetOrder}`}>
                     <td className={styles.tableData}>
                        {set.exerciseSetOrder}
                     </td>
                     <td className={styles.tableData}>
                        {set &&
                           weightUnits &&
                           distanceUnits &&
                           exerciseSetFormat({
                              exerciseSet: set,
                              weightUnits,
                              distanceUnits,
                           })}
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}
