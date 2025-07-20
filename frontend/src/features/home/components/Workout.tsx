import { FaPencilAlt, FaRunning, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { WorkoutType } from "../../../types/workoutTypes";

import styles from "./Workout.module.css";

export default function Workout({ workout }: { workout: WorkoutType }) {
   return (
      <div className={styles.container}>
         <div className={styles.contentWrapper}>
            <h3 className={styles.workoutName}>{workout.workoutName}</h3>
            <span className={styles.workoutCountInfo}>
               {workout.totalCompletedWorkouts
                  ? `Total Completed: ${workout.totalCompletedWorkouts}`
                  : "No workouts"}
            </span>
         </div>
         <div className={styles.optionsWrapper}>
            <Link
               className={styles.optionLink}
               to={`/home/barbell-log/${workout.workoutId}`}
            >
               <FaRunning />
            </Link>
            <Link
               className={styles.optionLink}
               to={`/home/workout-composition/${workout.workoutId}`}
            >
               <FaPencilAlt />
            </Link>
            <button className={styles.deleteWorkoutBtn}>
               <FaTrash />
            </button>
         </div>
      </div>
   );
}
