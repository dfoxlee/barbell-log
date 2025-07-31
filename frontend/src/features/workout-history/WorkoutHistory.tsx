import { useEffect, useState } from "react";
import Seperator from "../shared/Seperator";
import Workouts from "./components/Workouts";
import Exercises from "./components/Exercises";

import styles from "./WorkoutHistory.module.css";
import { useCompletedWorkoutsStore } from "../../stores/completedWorkoutsStore";
import { useUserStore } from "../../stores/userStore";

export default function WorkoutHistory() {
   const [historyType, setHistoryType] = useState("workouts");
   const completedWorkoutsLoading = useCompletedWorkoutsStore(
      (state) => state.completedWorkoutsLoading
   );
   const getCompletedWorkouts = useCompletedWorkoutsStore(
      (state) => state.getCompletedWorkouts
   );
   const user = useUserStore((state) => state.user);

   useEffect(() => {
      if (!completedWorkoutsLoading && user?.token) {
         getCompletedWorkouts({ token: user?.token });
      }
   }, [user?.token]);

   const updateHistoryType = (type) => {
      setHistoryType(type);
   };

   return (
      <div className={styles.container}>
         <h2 className={styles.title}>History</h2>
         <Seperator />
         <div className={styles.optionBtnsWrapper}>
            <button
               className={`standardBtn ${
                  historyType === "workouts"
                     ? styles.optionBtnActive
                     : styles.optionBtn
               }`}
               onClick={(e) => updateHistoryType("workouts")}
            >
               Workouts
            </button>
            <button
               className={`standardBtn ${
                  historyType === "exercises"
                     ? styles.optionBtnActive
                     : styles.optionBtn
               }`}
               onClick={(e) => updateHistoryType("exercises")}
            >
               Exercises
            </button>
         </div>
         {historyType === "workouts" ? <Workouts /> : <Exercises />}
      </div>
   );
}
