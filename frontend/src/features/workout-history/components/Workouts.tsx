import { useEffect, useState } from "react";
import { fetchGetCompletedWorkouts } from "../../../services/completedWorkoutServices";
import toastify from "../../../utils/toastify";
import CompletedWorkout from "./CompletedWorkout";
import Loading from "../../shared/Loading";

import styles from "./Workouts.module.css";
import { useUserStore } from "../../../stores/userStore";

export default function Workouts() {
   const [completedWorkouts, setCompletedWorkouts] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const user = useUserStore((state) => state.user);

   useEffect(() => {
      const getCompletedWorkouts = async ({ token }) => {
         try {
            const completedWorkoutsRequest = await fetchGetCompletedWorkouts({
               token,
            });

            if (completedWorkoutsRequest.error) {
               console.log(completedWorkoutsRequest);
               return toastify({
                  message: "Something went wrong. Please try again later.",
                  type: "error",
               });
            }

            setCompletedWorkouts(completedWorkoutsRequest);
         } catch (error) {
            console.error(error);

            return toastify({
               message: "Something went wrong. Please try again later.",
               type: "error",
            });
         } finally {
            setIsLoading(false);
         }
      };

      setIsLoading(true);
      getCompletedWorkouts({ token: user.token });
   }, [user.token]);

   return (
      <div className={styles.container}>
         <h2 className={styles.sectionTitle}>Recent Workouts</h2>
         {isLoading ? (
            <Loading />
         ) : (
            completedWorkouts.recentWorkouts &&
            completedWorkouts.recentWorkouts.map((completedWorkout) => (
               <CompletedWorkout
                  key={completedWorkout.completedDate}
                  completedWorkout={completedWorkout}
               />
            ))
         )}
      </div>
   );
}
