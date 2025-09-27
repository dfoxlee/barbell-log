import { useEffect, type ChangeEvent } from "react";
import { fetchGetWorkoutTypes } from "../../services/common.services";
import toastify from "../../utils/toastify";
import type { WorkoutTypeType } from "../../types/common.types";
import { useWorkoutStore } from "../../stores/workout.store";
import { useUserStore } from "../../stores/user.store";

import styles from "./WorkoutTypeSelector.module.css";

interface WorkoutTypeSelectorPropsType {
   value: number;
   onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export default function WorkoutTypeSelector({
   value,
   onChange,
}: WorkoutTypeSelectorPropsType) {
   const workoutTypes = useWorkoutStore((state) => state.workoutTypes);
   const setWorkoutTypes = useWorkoutStore((state) => state.setWorkoutTypes);
   const token = useUserStore((state) => state.token);

   useEffect(() => {
      const getWorkoutTypes = async () => {
         try {
            const workoutTypesRequest = await fetchGetWorkoutTypes({
               token: token!,
            });

            setWorkoutTypes(workoutTypesRequest.workoutTypes);
         } catch (error) {
            console.error(
               "An error occurred getting bodyweight readings.",
               error
            );

            toastify({
               message:
                  "An error occurred getting bodyweight readings. Please try again later.",
               type: "error",
            });
         }
      };

      if (!workoutTypes && token) {
         getWorkoutTypes();
      }
   }, [token]);

   return (
      <select
         className={styles.selector}
         name="workout-type"
         id="workout-type"
         onChange={onChange}
         value={value}
      >
         {workoutTypes &&
            workoutTypes.map((workoutType: WorkoutTypeType) => (
               <option
                  key={workoutType.workoutTypeId}
                  value={workoutType.workoutTypeId}
               >
                  {workoutType.workoutType}
               </option>
            ))}
      </select>
   );
}
