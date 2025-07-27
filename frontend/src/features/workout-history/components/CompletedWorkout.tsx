import { FaGlasses, FaPencilAlt, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

import styles from "./CompletedWorkout.module.css";
import { fetchDeleteCompeletedWorkout } from "../../../services/completedWorkoutServices";
import { useUserStore } from "../../../stores/userStore";

export default function CompletedWorkout({ completedWorkout }) {
   const user = useUserStore(state => state.user);

   const handleDeleteClick = async () => {
      console.log(completedWorkout);
      const deleteRequest = await fetchDeleteCompeletedWorkout({
         token: user?.token,
         completedWorkoutId: completedWorkout.completedWorkoutId,
      });

      console.log(deleteRequest);
   };

   return (
      <div className={styles.container}>
         <div className={styles.contentWrapper}>
            <h3 className={styles.workoutName}>
               {completedWorkout.workoutName}
            </h3>
            <p className={styles.completedDate}>
               {new Date(completedWorkout.completedDate).toLocaleDateString()}
            </p>
         </div>
         <div className={styles.linkWrapper}>
            <Link
               className={styles.navLink}
               to={`/home/completed-workout/${completedWorkout.completedWorkoutId}`}
            >
               <FaGlasses />
            </Link>
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
