import { FaFastForward, FaTrashAlt } from "react-icons/fa";
import type { ExerciseSetType } from "../../../types/workoutTypes";

import styles from "./ExerciseComposition.module.css";

export default function ExerciseSetRow({
   exerciseSet,
}: {
   exerciseSet: ExerciseSetType;
}) {
   return (
      <tr key={exerciseSet.exerciseSetOrder}>
         <th>
            <button className={`standardIconBtn ${styles.skipToSetBtn}`}>
               <FaFastForward />
            </button>
         </th>
         <th>{exerciseSet.exerciseSetOrder}</th>
         <th>{exerciseSet.reps}</th>
         <th>{exerciseSet.weight}</th>
         <th className={styles.optionsWrapper}>
            <button className={styles.deleteSetBtn}>
               <FaTrashAlt />
            </button>
         </th>
      </tr>
   );
}
