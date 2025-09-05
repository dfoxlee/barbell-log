import { FaGlasses, FaPencilAlt, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

import styles from "./CompletedWorkout.module.css";
import { fetchDeleteCompeletedWorkout } from "../../../services/completedWorkoutServices";
import { useUserStore } from "../../../stores/userStore";
import { useCompletedWorkoutsStore } from "../../../stores/completedWorkoutsStore";

export default function CompletedWorkout({
   completedWorkout,
   updateViewCompleteWorkoutId,
}) {
   const getCompletedWorkouts = useCompletedWorkoutsStore(
      (state) => state.getCompletedWorkouts
   );
   const user = useUserStore((state) => state.user);

   const handleDeleteClick = async () => {
      if (user?.token) {
         await fetchDeleteCompeletedWorkout({
            token: user?.token,
            completedWorkoutId: completedWorkout.completedWorkoutId,
         });

         getCompletedWorkouts({ token: user?.token });
      }
   };

   const handleViewWorkoutClick = () => {
      updateViewCompleteWorkoutId(completedWorkout.completedWorkoutId);
   };

   return (
      <div className={styles.container}>
         <div className={styles.contentWrapper}>
            <h3 className={styles.workoutName}>
               {completedWorkout.completedWorkoutName}
            </h3>
            <p className={styles.completedDate}>
               {new Date(completedWorkout.completedDate).toLocaleDateString()}
            </p>
         </div>
         <div className={styles.linkWrapper}>
            <button
               className={`standardIconBtn ${styles.viewWorkoutBtn}`}
               onClick={handleViewWorkoutClick}
            >
               <FaGlasses />
            </button>
            <Link
               className={styles.navLink}
               to={`/home/barbell-log/${completedWorkout.workoutId}/${completedWorkout.completedWorkoutId}`}
            >
               <FaPencilAlt />
            </Link>
            <button className={styles.deleteBtn} onClick={handleDeleteClick}>
               <FaTrash />
            </button>
         </div>
      </div>
   );
}
