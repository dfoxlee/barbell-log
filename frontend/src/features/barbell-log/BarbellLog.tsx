import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";
import { useBarbellLogStore } from "../../stores/barbellLogStore";
import { useUserStore } from "../../stores/userStore";
import toastify from "../../utils/toastify";
import Seperator from "../shared/Seperator";

import styles from "./BarbellLog.module.css";
import ExerciseSetsTable from "./components/ExerciseSetsTable";

export default function BarbellLog() {
   const params = useParams();
   const workoutId = params["workout-id"];
   const completedWorkoutId = params["completed-workout-id"];
   const user = useUserStore((state) => state.user);
   const barbellLog = useBarbellLogStore((state) => state.barbellLog);
   const getBarbellLog = useBarbellLogStore((state) => state.getBarbellLog);
   const barbellLogLoading = useBarbellLogStore(
      (state) => state.barbellLogLoading
   );
   const barbellLogError = useBarbellLogStore((state) => state.barbellLogError);
   const exerciseNames = useMemo(
      () =>
         barbellLog?.completedExercises.map(
            (completedExercise) => completedExercise.exerciseName
         ),
      [barbellLog]
   );

   const currentExercise = useMemo(
      () =>
         barbellLog?.completedExercises.find(
            (completedExercise) =>
               completedExercise.completedExerciseOrder ===
               barbellLog?.currentExerciseOrder
         ),
      [barbellLog]
   );

   useEffect(() => {
      if (!barbellLog && !barbellLogError && user?.token && workoutId) {
         if (completedWorkoutId) {
            getBarbellLog({
               token: user?.token,
               workoutId,
               completedWorkoutId,
            });
         } else {
            getBarbellLog({ token: user?.token, workoutId });
         }
      }

      if (barbellLogError) {
         toastify({
            message: barbellLogError,
            type: "error",
         });
      }
   }, []);

   const handleExerciseSelectChange = (event) => {
      console.log(event.target.value);
   };

   if (barbellLogLoading) {
      return <div>Loading...</div>;
   }

   return (
      <div className={styles.container}>
         <h1 className={`pageTitle ${styles.workoutNameTitle}`}>
            {barbellLog?.workoutName}
         </h1>
         <Seperator />
         <div className={styles.exerciseNavWrapper}>
            <button
               className={
                  barbellLog?.currentExerciseOrder === 1
                     ? styles.exerciseNavBtnDisabled
                     : styles.exerciseNavBtn
               }
               disabled={barbellLog?.currentExerciseOrder === 1}
            >
               <FaChevronLeft />
            </button>
            <div className={styles.exerciseNavContent}>
               <p
                  className={styles.exerciseNavCount}
               >{`Exercise: ${barbellLog?.currentExerciseOrder} / ${barbellLog?.completedExercises.length}`}</p>
               <select
                  className={styles.currentExerciseNavSelect}
                  name="current-exercise"
                  id="current-exercise"
                  value={currentExercise?.exerciseName}
                  onChange={handleExerciseSelectChange}
               >
                  {exerciseNames?.map((name) => (
                     <option key={name}>{name}</option>
                  ))}
               </select>
            </div>
            <button className={styles.exerciseNavBtn}>
               <FaChevronRight />
            </button>
         </div>
         <ExerciseSetsTable
            exerciseSets={currentExercise?.completedExerciseSets}
         />
         <button className={`standardBtn ${styles.addSetBtn}`}>
            <FaPlus />
            <span>Set</span>
         </button>
      </div>
   );
}
