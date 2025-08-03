import { useState } from "react";
import RecentWorkouts from "./RecentWorkouts";

import styles from "./Workouts.module.css";
import CompletedWorkoutDetail from "./CompletedWorkoutDetail";

export default function Workouts() {
   const [viewCompletedWorkoutId, setViewCompletedWorkoutId] = useState<
      string | null
   >(null);

   const updateViewCompletedWorkoutId = (id: string | null) => {
      setViewCompletedWorkoutId(id);
   };

   return (
      <div className={styles.container}>
         {viewCompletedWorkoutId ? (
            <CompletedWorkoutDetail
               completedWorkoutId={viewCompletedWorkoutId}
               updateViewCompletedWorkoutId={updateViewCompletedWorkoutId}
            />
         ) : (
            <RecentWorkouts
               updateViewCompleteWorkoutId={updateViewCompletedWorkoutId}
            />
         )}
      </div>
   );
}
