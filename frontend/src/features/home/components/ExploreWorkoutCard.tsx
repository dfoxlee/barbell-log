import type { WorkoutType } from "../../../types/workout.types";

import styles from "./ExploreWorkoutCard.module.css";

export default function ExploreWorkoutCard({
   workout,
}: {
   workout: WorkoutType;
}) {
   return (
      <div>
         <div>
            <h5>{workout.workoutName}</h5>
            <p>
               {workout.exercises.length > 1
                  ? `${workout.exercises.length} exercises`
                  : `${workout.exercises.length} exercise`}
            </p>
         </div>
         <div></div>
      </div>
   );
}
