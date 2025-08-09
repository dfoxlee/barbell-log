import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
   FaChevronLeft,
   FaChevronRight,
   FaPause,
   FaPlay,
   FaPlus,
   FaUndo,
} from "react-icons/fa";
import { useBarbellLogStore } from "../../stores/barbellLogStore";
import { useUserStore } from "../../stores/userStore";
import Seperator from "../shared/Seperator";
import ExerciseSetsTable from "./components/ExerciseSetsTable";
import { motivationalSayings } from "../../enums/constants";
import { useTimerStore } from "../../stores/timerStore";
import { formatTimer } from "./utils/formatTimer";

import styles from "./BarbellLog.module.css";

export default function BarbellLog() {
   const params = useParams();
   const [showMotivationText, setShowMotivationText] = useState(false);
   const [motivationIndex, setMotivationIndex] = useState(0);
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
   const timer = useTimerStore((state) => state.timer);
   const timerMessage = useTimerStore((state) => state.timerMessage);
   const startTimer = useTimerStore((state) => state.startTimer);
   const stopTimer = useTimerStore((state) => state.stopTimer);
   const isTimerRunning = useTimerStore((state) => state.isTimerRunning);
   const resetTimer = useTimerStore((state) => state.resetTimer);

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
      startTimer("Start workout time");
   }, []);

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

   const handleTimerControlBtnClick = () => {
      if (isTimerRunning) {
         stopTimer();
      } else {
         startTimer(timerMessage);
      }
   };

   const toggleMotivationText = () => {
      setMotivationIndex((prev) => {
         if (prev === motivationalSayings.length - 1) {
            return 0;
         }

         return prev + 1;
      });

      setShowMotivationText(true);
      setTimeout(() => {
         setShowMotivationText(false);
      }, 1500);
   };

   const handleResetBtnClick = () => {
      resetTimer();
      if (isTimerRunning) {
         startTimer(timerMessage);
      }
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
         <div className={styles.exerciseNavTimerWrapper}>
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
                  <h3
                     className={`sectionTitle ${styles.exerciseNavText} ${
                        showMotivationText ? styles.motivationText : ""
                     }`}
                  >
                     {showMotivationText
                        ? motivationalSayings[motivationIndex]
                        : `Exercise: ${barbellLog?.currentExerciseOrder} / ${barbellLog?.completedExercises.length}`}
                  </h3>
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
            <div className={styles.timerWrapper}>
               {`${timerMessage}: ${formatTimer(timer)}`}
               <button
                  className={`standardIconBtn ${styles.pausePlayBtn}`}
                  onClick={handleTimerControlBtnClick}
               >
                  {isTimerRunning ? <FaPause /> : <FaPlay />}
               </button>
               <button
                  className={`standardIconBtn ${styles.resetBtn}`}
                  onClick={handleResetBtnClick}
               >
                  <FaUndo />
               </button>
            </div>
         </div>
         <ExerciseSetsTable toggleMotivationText={toggleMotivationText} />
         <div className={styles.exerciseOptionsWrapper}>
            <button
               className={`standardBtn ${styles.addSetBtn}`}
               onClick={handleAddSetClick}
            >
               <FaPlus />
               <span>Set</span>
            </button>
            {barbellLog != null &&
            barbellLog?.currentExerciseOrder <
               barbellLog?.completedExercises.length ? (
               <button
                  className={`standardBtn ${styles.incrementExerciseBtn}`}
                  onClick={handleExerciseIncrementClick}
               >
                  <span>Exercise</span>
                  <FaChevronRight />
               </button>
            ) : null}
         </div>
      </div>
   );
}
