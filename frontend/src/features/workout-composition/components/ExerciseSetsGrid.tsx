import type { ExerciseType } from "../../../types/workoutTypes";
import ExerciseSetRow from "./ExerciseSetRow";

import styles from "./ExerciseSetsGrid.module.css";

export interface ExerciseSetsGridPropsType {
   currentExercise: ExerciseType;
   viewAllExerciseSets: boolean;
   toggleViewAllExerciseSets: () => void;
}

export default function ExerciseSetsGrid({
   currentExercise,
   viewAllExerciseSets,
   toggleViewAllExerciseSets,
}: ExerciseSetsGridPropsType) {
   return (
      <div className={styles.exerciseSetsGridWrapper}>
         <span className={styles.gridHeaderCell}></span>
         <span className={styles.gridHeaderCell}>set</span>
         <span className={styles.gridHeaderCell}>details</span>
         <span className={styles.gridHeaderCell}></span>

         {currentExercise?.exerciseSets.map((exerciseSet) => {
            return (
               <ExerciseSetRow
                  key={exerciseSet.exerciseSetOrder}
                  exerciseSet={exerciseSet}
                  toggleViewAllExerciseSets={toggleViewAllExerciseSets}
                  viewAllExerciseSets={viewAllExerciseSets}
               />
            );
         })}
      </div>
   );
}
