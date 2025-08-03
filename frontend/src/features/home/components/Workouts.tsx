import { useWorkoutsStore } from "../../../stores/workoutsStore";
import Workout from "./Workout";

import styles from "./Workouts.module.css";

export default function Workouts() {
   const workouts = useWorkoutsStore((state) => state.workouts);

   return (
      <div className={styles.container}>
         <h3 className={styles.workoutsTitle}>Workouts</h3>
         {workouts.length &&
            workouts.map((workout) => (
               <Workout key={workout.workoutId} workout={workout} />
            ))}
      </div>
   );
}
