import { useFetchCompletedWorkouts } from "../../../hooks/useFetchCompletedWorkouts";
import CompletedWorkoutCard from "./CompletedWorkoutCard";
import styles from "./CompletedWorkoutsSection.module.css";

export default function CompletedWorkoutsSection() {
   const { completedWorkouts } = useFetchCompletedWorkouts();

   return (
      <div className={styles.container}>
         <h2 className={styles.sectionTitle}>Completed Workouts</h2>
         <div className={styles.completedWorkoutsWrapper}>
            {completedWorkouts &&
               completedWorkouts.map((w) => (
                  <CompletedWorkoutCard
                     key={w.completedWorkoutId}
                     completedWorkout={w}
                  />
               ))}
         </div>
      </div>
   );
}
