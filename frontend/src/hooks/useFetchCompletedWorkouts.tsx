import { useEffect } from "react";
import { useCompletedWorkoutStore } from "../stores/completed-workout.store";
import { useUserStore } from "../stores/user.store";
import { fetchGetCompletedWorkouts } from "../services/completed-workout.services";
import toastify from "../utils/toastify";

export const useFetchCompletedWorkouts = () => {
   const completedWorkouts = useCompletedWorkoutStore(
      (state) => state.completedWorkouts
   );
   const setCompletedWorkouts = useCompletedWorkoutStore(
      (state) => state.setCompletedWorkouts
   );
   const token = useUserStore((state) => state.token);

   const getWorkouts = async () => {
      try {
         const req = await fetchGetCompletedWorkouts({ token: token! });

         setCompletedWorkouts(req.completedWorkouts);
      } catch (error) {
         console.error(error);

         return toastify({
            message:
               "An error occurred while getting completed workouts. Please try again later.",
            type: "error",
         });
      }
   };

   useEffect(() => {
      if (token) {
         getWorkouts();
      }
   }, [token]);

   return { completedWorkouts, getWorkouts };
};
