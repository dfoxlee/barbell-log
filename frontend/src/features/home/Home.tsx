import { useEffect, useState } from "react";
import Seperator from "../shared/Seperator";
import styles from "./Home.module.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { fetchGetWeeklyCompletedWorkouts } from "../../services/completedWorkoutServices";
import toastify from "../../utils/toastify";
import Loading from "../shared/Loading";
import WorkoutsCount from "./components/WorkoutsCount";
import { Link } from "react-router-dom";

export default function Home() {
   const [workoutsBreakdown, setWorkoutsBreakdown] = useState({
      recentWorkouts: [],
      workouts: [],
   });
   const [isLoading, setIsLoading] = useState(false);
   const { user } = useAuthContext();

   useEffect(() => {
      try {
         const getWorkouts = async () => {
            const workoutsRequest = await fetchGetWeeklyCompletedWorkouts({
               token: user?.token,
            });

            setWorkoutsBreakdown(workoutsRequest);
         };

         setIsLoading(true);
         getWorkouts();
      } catch (error) {
         console.error(error);

         toastify({
            message: "Something went wrong. Please try again later.",
            type: "error",
         });
      } finally {
         setIsLoading(false);
      }
   }, [user?.token]);

   if (isLoading) {
      return <Loading />;
   }

   return (
      <div className={styles.container}>
         <h1 className={styles.title}>Barbell Log</h1>
         <Seperator />
         {!workoutsBreakdown.workouts.length ? (
            <div className={styles.createWorkoutWrapper}>
               <Link
                  to="/home/workout-composition/create"
                  className={styles.createWorkoutLink}
               >
                  Create Workout
               </Link>
            </div>
         ) : (
            <>
               <div className={styles.createWorkoutWrapper}>
                  <Link
                     to="/home/workout-composition/create"
                     className={styles.createWorkoutLink}
                  >
                     Create Workout
                  </Link>
               </div>
               <WorkoutsCount workouts={workoutsBreakdown.workouts} />
            </>
         )}
      </div>
   );
}
