import { useEffect } from "react";
import { Link } from "react-router-dom";
import Seperator from "../shared/Seperator";

import { useUserStore } from "../../stores/userStore";
import { useWorkoutsStore } from "../../stores/workoutsStore";
import toastify from "../../utils/toastify";

import Loading from "../shared/Loading";
import Workouts from "./components/Workouts";

import styles from "./Home.module.css";

export default function Home() {
   const workouts = useWorkoutsStore((state) => state.workouts);
   const getWorkouts = useWorkoutsStore((state) => state.getWorkouts);
   const workoutsLoading = useWorkoutsStore((state) => state.workoutsLoading);
   const workoutsError = useWorkoutsStore((state) => state.workoutsError);
   const { user } = useUserStore();

   useEffect(() => {
      if (!workoutsLoading && !workoutsError && user?.token) {
         getWorkouts(user.token);
      }

      if (workoutsError) {
         toastify({
            message: "Something went wrong getting workouts. Try again later.",
            type: "error",
         });
      }
   }, [user?.token, workoutsError]);

   if (workoutsLoading) {
      return <Loading />;
   }

   return (
      <div className={styles.container}>
         <h1 className={styles.title}>Barbell Log</h1>
         <Seperator />
         {!workouts.length ? (
            <div className={`linkWrapper`}>
               <Link
                  className={`standardLink ${styles.createWorkoutLink}`}
                  to="/home/workout-composition"
               >
                  Create Workout
               </Link>
            </div>
         ) : (
            <Workouts />
         )}
      </div>
   );
}
