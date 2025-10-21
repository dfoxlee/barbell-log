import { useNavigate } from "react-router-dom";
import { useFetchWorkouts } from "../../../hooks/useFetchWorkouts";
import StandardBtn from "../../shared/StandardBtn";
import WorkoutCard from "./WorkoutCard";

import styles from "./WorkoutsSection.module.css";
import { useEffect } from "react";

export default function WorkoutsSection() {
   const { workouts, getWorkouts } = useFetchWorkouts();
   const navigate = useNavigate();

   useEffect(() => {
      getWorkouts();
   }, []);

   const handleCreateWorkoutClick = () => {
      navigate("/home/create-workout");
   };

   return (
      <div className={styles.container}>
         <h2 className={styles.sectionTitle}>Workouts</h2>

         {workouts?.length ? (
            <div className={styles.workoutsWrapper}>
               {workouts?.map((workout) => (
                  <WorkoutCard key={workout.workoutName} workout={workout} />
               ))}
            </div>
         ) : (
            <div className={styles.createWorkoutBtnWrapper}>
               <StandardBtn
                  text="Create Workout"
                  onClick={handleCreateWorkoutClick}
               />
            </div>
         )}
      </div>
   );
}
