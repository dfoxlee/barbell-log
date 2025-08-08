import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";
import { useBarbellLogStore } from "../../stores/barbellLogStore";
import { useUserStore } from "../../stores/userStore";
import Seperator from "../shared/Seperator";
import ExerciseSetsTable from "./components/ExerciseSetsTable";

import styles from "./BarbellLog.module.css";
import MotivationSlider from "../shared/MotivationSlider";

export default function BarbellLog() {
   const params = useParams();
   const [showMotivationSlider, setShowMotivationSlider] = useState(false);
   const workoutId = params["workout-id"];
   const completedWorkoutId = params["completed-workout-id"];
   const user = useUserStore((state) => state.user);
   const barbellLog = useBarbellLogStore((state) => state.barbellLog);
   const getBarbellLog = useBarbellLogStore((state) => state.getBarbellLog);
   const barbellLogLoading = useBarbellLogStore(
      (state) => state.barbellLogLoading
   );
   const barbellLogError = useBarbellLogStore((state) => state.barbellLogError);
   const updateBarbellLog = useBarbellLogStore(
      (state) => state.updateBarbellLog
   );

   const exerciseNames = useMemo(
      () =>
         barbellLog?.completedExercises
            .sort((a, b) => a.completedExerciseOrder - b.completedExerciseOrder)
            .map((completedExercise) => completedExercise.exerciseName),
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
      if (!barbellLogLoading && !barbellLogError && user?.token && workoutId) {
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
   }, [workoutId, completedWorkoutId]);

   const handleExerciseSelectChange = (event) => {
      const switchToExercise = barbellLog?.completedExercises.find(
         (completedExercise) =>
            completedExercise.exerciseName === event.target.value
      );

      if (switchToExercise && barbellLog) {
         updateBarbellLog({
            ...barbellLog,
            currentExerciseOrder: switchToExercise?.completedExerciseOrder,
         });
      }
   };

   const handleExerciseIncrementClick = () => {
      if (
         barbellLog !== null &&
         barbellLog?.currentExerciseOrder >=
            barbellLog?.completedExercises.length
      ) {
         return;
      }

      if (barbellLog) {
         updateBarbellLog({
            ...barbellLog,
            currentExerciseOrder: barbellLog.currentExerciseOrder + 1,
         });
      }
   };

   const handleExerciseDecrementClick = () => {
      if (barbellLog != null && barbellLog?.currentExerciseOrder <= 1) {
         return;
      }

      if (barbellLog) {
         updateBarbellLog({
            ...barbellLog,
            currentExerciseOrder: barbellLog.currentExerciseOrder - 1,
         });
      }
   };

   const handleAddSetClick = () => {
      if (currentExercise && barbellLog) {
         const latestSet = {
            ...currentExercise?.completedExerciseSets[
               currentExercise?.completedExerciseSets.length - 1
            ],
         };

         delete latestSet.completedExerciseSetId;

         latestSet.completedExerciseSetOrder =
            latestSet.completedExerciseSetOrder + 1;

         const updatedCompletedExerciseSets = [
            ...currentExercise.completedExerciseSets,
            latestSet,
         ];

         const updatedExercise = {
            ...currentExercise,
            completedExerciseSets: updatedCompletedExerciseSets,
         };

         const updatedCompletedExercises = barbellLog?.completedExercises.map(
            (exercise) =>
               exercise.completedExerciseOrder ===
               updatedExercise.completedExerciseOrder
                  ? updatedExercise
                  : exercise
         );

         updateBarbellLog({
            ...barbellLog,
            completedExercises: updatedCompletedExercises,
         });
      }
   };

   if (barbellLogLoading) {
      return <div>Loading...</div>;
   }

   const toggleMotivationalSlider = () => {
      setShowMotivationSlider(true);
   };

   return (
      <div className={styles.container}>
         {showMotivationSlider ? (
            <MotivationSlider onFadeOutComplete={() => setShowMotivationSlider(false)} />
         ) : null}
         <h1 className={`pageTitle ${styles.workoutNameTitle}`}>
            {barbellLog?.workoutName}
         </h1>
         <Seperator />
         <div className={styles.exerciseNavWrapper}>
            <button
               className={`standardIconBtn ${
                  barbellLog?.currentExerciseOrder === 1
                     ? styles.exerciseNavBtnDisabled
                     : styles.exerciseNavBtn
               }`}
               disabled={barbellLog?.currentExerciseOrder === 1}
               onClick={handleExerciseDecrementClick}
            >
               <FaChevronLeft />
            </button>
            <div className={styles.exerciseNavContent}>
               <p
                  className={`sectionTitle`}
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
            <button
               className={`standardIconBtn ${
                  barbellLog != null &&
                  barbellLog?.currentExerciseOrder <
                     barbellLog?.completedExercises.length
                     ? styles.exerciseNavBtn
                     : styles.exerciseNavBtnDisabled
               }`}
               disabled={
                  barbellLog !== null &&
                  barbellLog?.currentExerciseOrder >=
                     barbellLog?.completedExercises.length
               }
               onClick={handleExerciseIncrementClick}
            >
               <FaChevronRight />
            </button>
         </div>
         <ExerciseSetsTable
            toggleMotivationalSlider={toggleMotivationalSlider}
         />
         <button
            className={`standardBtn ${styles.addSetBtn}`}
            onClick={handleAddSetClick}
         >
            <FaPlus />
            <span>Set</span>
         </button>
      </div>
   );
}