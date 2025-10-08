import { useEffect } from "react";
import { useWorkoutStore } from "../stores/workout.store";
import { useUserStore } from "../stores/user.store";
import { fetchGetWorkouts } from "../services/workout.services";
import toastify from "../utils/toastify";

export function useFetchWorkouts() {
   const workouts = useWorkoutStore((state) => state.workouts);
   const setWorkouts = useWorkoutStore((state) => state.setWorkouts);
   const token = useUserStore((state) => state.token);

   const getWorkouts = async () => {
      if (!token) {
         return;
      }

      try {
         const fetchedWorkouts = await fetchGetWorkouts({ token: token! });

         setWorkouts(fetchedWorkouts.workouts);
      } catch (err) {
         console.error("An error occurred getting workouts", err);
         const errorMessage =
            "An error occurred getting workouts. Please try again later.";
         toastify({
            message: errorMessage,
            type: "error",
         });
      }
   };

   useEffect(() => {
      if (!workouts && token) {
         getWorkouts();
      }
   }, [token, workouts]);

   return { workouts, getWorkouts };
}
