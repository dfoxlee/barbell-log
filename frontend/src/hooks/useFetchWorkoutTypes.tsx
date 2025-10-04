import { useEffect } from "react";
import { useUserStore } from "../stores/user.store";
import { useWorkoutStore } from "../stores/workout.store";
import { fetchGetWorkoutTypes } from "../services/common.services";
import toastify from "../utils/toastify";

export const useFetchWorkoutTypes = () => {
   const token = useUserStore((state) => state.token);
   const workoutTypes = useWorkoutStore((state) => state.workoutTypes);
   const setWorkoutTypes = useWorkoutStore((state) => state.setWorkoutTypes);

   const getWorkoutTypes = async () => {
      try {
         const workoutTypesRequest = await fetchGetWorkoutTypes({
            token: token!,
         });

         setWorkoutTypes(workoutTypesRequest.workoutTypes);
      } catch (error) {
         console.error("An error occurred getting workout types.", error);

         toastify({
            message:
               "An error occurred getting workout types. Please try again later.",
            type: "error",
         });
      }
   };

   useEffect(() => {
      if (!workoutTypes && token) {
         getWorkoutTypes();
      }
   }, [token]);

   return { getWorkoutTypes };
};
