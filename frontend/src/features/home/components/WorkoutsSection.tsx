import { useFetchWorkouts } from "../../../hooks/useFetchWorkouts";
import StandardBtn from "../../shared/StandardBtn";
import WorkoutCard from "./WorkoutCard";

import styles from "./WorkoutsSection.module.css";

export default function WorkoutsSection() {
   const { workouts } = useFetchWorkouts();

   const handleCreateWorkoutClick = () => {
      console.log("create workout");
   };

   return (
      <div className={styles.container}>
         <h2 className={styles.sectionTitle}>Workouts</h2>
         {workouts?.length ? (
            workouts?.map((workout) => (
               <WorkoutCard key={workout.workoutName} workout={workout} />
            ))
         ) : (
            <div className={styles.workoutsWrapper}>
               <StandardBtn
                  text="Create Workout"
                  onClick={handleCreateWorkoutClick}
               />
            </div>
         )}
      </div>
   );
}
