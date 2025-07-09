import { useEffect, useState } from "react";
import Seperator from "../shared/Seperator";
import styles from "./Home.module.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { fetchGetWeeklyCompletedWorkouts } from "../../services/completedWorkoutServices";
import toastify from "../../utils/toastify";
import Loading from "../shared/Loading";
import Workout from "./components/Workout";
import { Link } from "react-router-dom";

export default function Home() {
   const [workoutsBreakdown, setWorkoutsBreakdown] = useState({
      recentWorkouts: [],
      workouts: [],
   });
   const [isLoading, setIsLoading] = useState(false);
   const { user } = useAuthContext();

   useEffect(() => {
      const getWorkouts = async () => {
         const workoutsRequest = await fetchGetWeeklyCompletedWorkouts({
            token: user?.token,
         });

         setWorkoutsBreakdown(workoutsRequest);
      };

      try {
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

   const removeWorkout = ({ workoutId }) => {
      setWorkoutsBreakdown((prev) => ({
         recentWorkouts: prev.recentWorkouts,
         workouts: prev.workouts.filter(
            (workout) => workout.workoutId !== workoutId
         ),
      }));
   };

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
               {workoutsBreakdown.workouts.map((workout) => (
                  <Workout
                     key={workout.workoutId}
                     workout={workout}
                     removeWorkout={removeWorkout}
                  />
               ))}
            </>
         )}
      </div>
   );
}
