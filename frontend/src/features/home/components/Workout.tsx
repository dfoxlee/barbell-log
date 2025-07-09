import { FaPencilAlt, FaRunning, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

import styles from "./Workout.module.css";
import { fetchDeleteWorkout } from "../../../services/workoutServices";
import { useAuthContext } from "../../../hooks/useAuthContext";
import toastify from "../../../utils/toastify";

export default function Workout({ workout, removeWorkout }) {
   const { user } = useAuthContext();

   const handleDeleteWorkoutClick = async () => {
      try {
         await fetchDeleteWorkout({
            token: user?.token,
            workoutId: workout.workoutId,
         });

         removeWorkout({ workoutId: workout.workoutId });
      } catch (error) {
         console.error(error);

         return toastify({
            message: "Something went wrong. Please try again later",
            type: "error",
         });
      }
   };
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
               to={`/home/workout-composition/edit/${workout.workoutId}`}
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
