import { FaPencilAlt, FaRunning, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { WorkoutType } from "../../../types/workoutTypes";
import { useUserStore } from "../../../stores/userStore";
import { useWorkoutsStore } from "../../../stores/workoutsStore";

import styles from "./Workout.module.css";

export default function Workout({ workout }: { workout: WorkoutType }) {
   const user = useUserStore((state) => state.user);
   const deleteWorkout = useWorkoutsStore((state) => state.deleteWorkout);
   const handleDeleteWorkoutClick = async () => {
      if (workout.workoutId && user?.token) {
         deleteWorkout({ token: user?.token, workoutId: workout.workoutId });
      }
   };

   return (
      <div className={styles.container}>
         <div className={styles.contentWrapper}>
            <h3 className={styles.workoutName}>{workout.workoutName}</h3>
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
            <button
               className={styles.deleteWorkoutBtn}
               onClick={handleDeleteWorkoutClick}
            >
               <FaTrash />
            </button>
         </div>
      </div>
   );
}
