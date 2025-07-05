import SetsTable from "./SetsTable";

import styles from "./CompletedExercise.module.css";

export default function CompletedExercise({ completedExercise }) {
   return (
      <div className={styles.container}>
         <h3 className={styles.exerciseName}>
            {completedExercise.exerciseName}
         </h3>
         <SetsTable completedSets={completedExercise.completedSets} />
      </div>
   );
}
