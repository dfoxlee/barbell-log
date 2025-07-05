import { FaPencilAlt, FaRunning } from "react-icons/fa";
import { Link } from "react-router-dom";

import styles from "./WorkoutsCount.module.css";

export default function WorkoutsCount({ workouts }) {
   return (
      <div>
         {workouts.map((workout) => (
            <div key={workout.workoutName} className={styles.workoutWrapper}>
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
               </div>
            </div>
         ))}
      </div>
   );
}
