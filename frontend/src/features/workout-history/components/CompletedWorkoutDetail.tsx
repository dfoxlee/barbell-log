import { useEffect, useState } from "react";
import styles from "./CompletedWorkoutDetail.module.css";
import { FaCheck, FaChevronLeft, FaInfoCircle } from "react-icons/fa";
import { fetchGetCompletedWorkout } from "../../../services/completedWorkoutServices";
import { useUserStore } from "../../../stores/userStore";
import toastify from "../../../utils/toastify";
import Loading from "../../shared/Loading";
import type { CompletedWorkoutType } from "../../../types/completedWorkoutTypes";
import { rwtdCellFormat } from "../../../utils/formatting";

export default function CompletedWorkoutDetail({
   completedWorkoutId,
   updateViewCompletedWorkoutId,
}: {
   completedWorkoutId: string;
   updateViewCompletedWorkoutId: (id: string | null) => void;
}) {
   const [completedWorkout, setCompletedWorkout] =
      useState<CompletedWorkoutType | null>(null);
   const [completedWorkoutLoading, setCompletedWorkoutLoading] = useState(true);

   const user = useUserStore((state) => state.user);

   useEffect(() => {
      const getCompletedWorkout = async () => {
         const completedWorkout = await fetchGetCompletedWorkout({
            token: user?.token,
            completedWorkoutId,
         });

         setCompletedWorkout(completedWorkout);
      };

      if (completedWorkoutId && user?.token) {
         try {
            setCompletedWorkoutLoading(true);
            getCompletedWorkout();
         } catch (error) {
            console.error("Error fetching completed workout:", error);

            toastify({
               message: "Error fetching completed workout",
               type: "error",
            });
         } finally {
            setCompletedWorkoutLoading(false);
         }
      }
   }, [user?.token, completedWorkoutId]);

   const handleReturnClick = () => {
      updateViewCompletedWorkoutId(null);
   };

   if (completedWorkoutLoading) {
      return <Loading />;
   }

   return (
      <div>
         <button
            className={`standardBtn ${styles.recentWorkoutBtn}`}
            onClick={handleReturnClick}
         >
            <FaChevronLeft />
            <span>Recent Workouts</span>
         </button>
         <h2 className={styles.workoutNameTitle}>
            {completedWorkout && completedWorkout.workoutName}
         </h2>
         <h4 className={styles.completedDate}>
            {new Date(completedWorkout?.completedDate).toLocaleDateString()}
         </h4>
         <div className={styles.seperatorLine}></div>
         <div className={styles.exercisesWrapper}>
            {completedWorkout &&
               completedWorkout.completedExercises.map((completedExercise) => (
                  <div key={completedExercise.completedExerciseId}>
                     <h3 className={styles.exerciseNameTitle}>
                        {completedExercise.exerciseName}
                     </h3>
                     <table className={styles.tableWrapper}>
                        <thead>
                           <tr>
                              <th className={styles.tableHeader}>set</th>
                              <th className={styles.tableHeader}>details</th>
                              <th className={styles.tableHeader}>complete</th>
                              <th className={styles.tableHeader}>notes</th>
                           </tr>
                        </thead>
                        <tbody>
                           {completedExercise.completedExerciseSets.map(
                              (set) => (
                                 <tr key={set.completedExerciseSetOrder}>
                                    <td className={styles.tableData}>
                                       <div className={styles.setWarmupWrapper}>
                                          {set.isWarmup ? (
                                             <span
                                                className={styles.warmupIcon}
                                             >
                                                W
                                             </span>
                                          ) : null}
                                          <span>
                                             {set.completedExerciseSetOrder}
                                          </span>
                                       </div>
                                    </td>
                                    <td className={styles.tableData}>
                                       {rwtdCellFormat(set)}
                                    </td>
                                    <td className={styles.tableData}>
                                       {set.isComplete ? (
                                          <FaCheck
                                             className={styles.completedIcon}
                                          />
                                       ) : (
                                          <FaCheck
                                             className={styles.incompletedIcon}
                                          />
                                       )}
                                    </td>
                                    <td className={styles.tableData}>
                                       <p className={styles.notes}>
                                          {set.notes}
                                       </p>
                                    </td>
                                 </tr>
                              )
                           )}
                        </tbody>
                     </table>
                  </div>
               ))}
         </div>
      </div>
   );
}
