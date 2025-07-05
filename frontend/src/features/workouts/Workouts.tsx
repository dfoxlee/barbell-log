import { Link } from "react-router-dom";
import Seperator from "../shared/Seperator";
import { useEffect, useState } from "react";
import {
   fetchDeleteWorkout,
   fetchGetWorkouts,
} from "../../services/workoutServices";
import { useAuthContext } from "../../hooks/useAuthContext";
import Workout from "./components/Workout";
import { useWorkoutCompositionContext } from "../../hooks/useWorkoutCompositionContext";

import styles from "./Workouts.module.css";

export default function Workouts() {
   const { user } = useAuthContext();
   const [workouts, setWorkouts] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<null | string>(null);

   useEffect(() => {
      const getWorkouts = async () => {
         setError(null);
         setIsLoading(true);
         const request = await fetchGetWorkouts({ token: user.token });

         if (request.error) {
            setIsLoading(false);
            setError(request.error);
            console.log(request.error);
            return alert("Something went wrong. Try again later.");
         }

         setWorkouts(request);
         setIsLoading(false);
         setError(null);
      };

      try {
         getWorkouts();
      } catch (error) {
         console.error(error);
         return alert("Something went wrong. Try again later.");
      }
   }, [user.token]);

   const deleteWorkout = async (workoutId) => {
      try {
         await fetchDeleteWorkout({ token: user.token, workoutId });

         setWorkouts((prev) =>
            prev.filter((workout) => workout.workoutId !== workoutId)
         );
      } catch (error) {
         console.error(error);
         return alert("Something went wrong. Please try again later.");
      }
   };

   return (
      <div>
         <h1 className={styles.title}>Workouts</h1>
         <Seperator />
         <Link
            className={styles.createWorkoutLink}
            to="/home/workout-composition/create"
         >
            Create Workout
         </Link>
         <div className={styles.workoutsWrapper}>
            {workouts.map((workout) => (
               <Workout
                  key={workout.workoutId}
                  workout={workout}
                  deleteWorkout={deleteWorkout}
               />
            ))}
         </div>
      </div>
   );
}
