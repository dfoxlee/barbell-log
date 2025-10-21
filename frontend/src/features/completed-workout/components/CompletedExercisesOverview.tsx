import { useCompletedWorkoutStore } from "../../../stores/completed-workout.store";
import CompletedExerciseOverview from "./CompletedExerciseOverview";

import styles from "./CompletedExercisesOverview.module.css";

interface CompletedExercisesOverviewProps {
   handleExercisesOverviewClick: () => void;
}

export default function CompletedExercisesOverview({
   handleExercisesOverviewClick,
}: CompletedExercisesOverviewProps) {
   const completedWorkout = useCompletedWorkoutStore(
      (state) => state.completedWorkout
   );
   return (
      <div className={styles.exercisesWrapper}>
         {completedWorkout?.completedExercises.map((e) => (
            <CompletedExerciseOverview
               key={e.completedExerciseOrder}
               completedExercise={e}
               handleExercisesOverviewClick={handleExercisesOverviewClick}
            />
         ))}
      </div>
   );
}
