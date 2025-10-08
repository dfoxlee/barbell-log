import { useEffect, type ChangeEvent } from "react";
import { fetchGetWorkoutTypes } from "../../services/common.services";
import toastify from "../../utils/toastify";
import type { WorkoutTypeType } from "../../types/common.types";
import { useWorkoutStore } from "../../stores/workout.store";
import { useUserStore } from "../../stores/user.store";

import styles from "./WorkoutTypeSelector.module.css";
import { useFetchWorkoutTypes } from "../../hooks/useFetchWorkoutTypes";

interface WorkoutTypeSelectorPropsType {
   value: number;
   onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export default function WorkoutTypeSelector({
   value,
   onChange,
}: WorkoutTypeSelectorPropsType) {
   const { workoutTypes } = useFetchWorkoutTypes();

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
