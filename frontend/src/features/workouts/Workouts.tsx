import { Link } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";
import type { WorkoutType } from "../../types/workoutTypes";
import { useAuthContext } from "../../hooks/useAuthContext";

import Seperator from "../shared/Seperator";
import Workout from "./components/Workout";

import styles from "./Workouts.module.css";

export default function Workouts({ workouts }: { workouts: WorkoutType[] }) {
   const user = useUserStore((state) => state.user);

   return (
      <div>
         <h1 className={styles.title}>Workouts</h1>
         <Seperator />
         <Link
            className={styles.createWorkoutLink}
            to="/home/workout-composition/create"
         >
            Create Workout
         </Link>
         <div className={styles.workoutsWrapper}>
            {/* {workouts.map((workout) => (
               <Workout key={workout.workoutId} workout={workout} />
            ))} */}
         </div>
      </div>
   );
}
