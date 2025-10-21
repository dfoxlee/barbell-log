import { useWorkoutStore } from "../../../stores/workout.store";
import ExerciseOverview from "./ExerciseOverview";

import styles from "./ExercisesOverview.module.css";

export default function ExercisesOverview() {
   const workoutComposition = useWorkoutStore(
      (state) => state.workoutComposition
   );

   return (
      <div>
         {workoutComposition?.exercises.map((exercise) => (
            <ExerciseOverview
               key={exercise.exerciseOrder}
               exercise={exercise}
            />
         ))}
      </div>
   );
}
