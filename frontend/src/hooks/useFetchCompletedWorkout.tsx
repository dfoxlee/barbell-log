import { useEffect } from "react";
import { useCompletedWorkoutStore } from "../stores/completed-workout.store";
import { useUserStore } from "../stores/user.store";
import toastify from "../utils/toastify";
import { fetchGetCompletedWorkoutById } from "../services/completed-workout.services";
import { useModalsStore } from "../stores/modals.store";

export const useFetchCompletedWorkout = () => {
   const completedWorkout = useCompletedWorkoutStore(
      (state) => state.completedWorkout
   );
   const setCompletedWorkout = useCompletedWorkoutStore(
      (state) => state.setCompletedWorkout
   );
   const viewCompletedWorkoutDetailsId = useModalsStore(
      (state) => state.viewCompletedWorkoutDetailsId
   );
   const token = useUserStore((state) => state.token);

   const getWorkout = async () => {
      try {
         const req = await fetchGetCompletedWorkoutById({
            token: token!,
            completedWorkoutId: viewCompletedWorkoutDetailsId!.toString(),
         });

         setCompletedWorkout(req.completedWorkout);
      } catch (error) {
         console.error(error);

         return toastify({
            message:
               "An error occurred while getting completed workout. Please try again later.",
            type: "error",
         });
      }
   };

   useEffect(() => {
      if (token && viewCompletedWorkoutDetailsId) {
         getWorkout();
      }
   }, [token, viewCompletedWorkoutDetailsId]);

   return { completedWorkout, getWorkout };
};
