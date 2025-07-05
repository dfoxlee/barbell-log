import { FaPencilAlt, FaRunning, FaTrash } from "react-icons/fa";

import styles from "./Workout.module.css";
import { dateFormat } from "../../../utils/formatting";
import { useMemo } from "react";
import { Link } from "react-router-dom";

export default function Workout({ workout, deleteWorkout }) {
   const formattedDate = useMemo(
      () => dateFormat(workout.createdDate),
      [workout.createdDate]
   );

   const handleDeleteWorkoutClick = () => {
      deleteWorkout(workout.workoutId);
   };

   return (
      <div className={styles.container}>
         <div className={styles.contentWrapper}>
            <h3 className={styles.workoutName}>{workout.workoutName}</h3>
            <span className={styles.workoutCreatedDate}>{formattedDate}</span>
         </div>
         <div className={styles.optionBtnsWrapper}>
            <Link
               className={styles.optionBtn}
               to={`/home/barbell-log/${workout.workoutId}`}
            >
               <FaRunning />
            </Link>
            <Link
               className={styles.optionBtn}
               to={`/home/workout-composition/edit/${workout.workoutId}`}
            >
               <FaPencilAlt />
            </Link>
            <button
               className={styles.deleteBtn}
               onClick={handleDeleteWorkoutClick}
            >
               <FaTrash />
            </button>
         </div>
      </div>
   );
}
