import { FaCheckCircle, FaStickyNote } from "react-icons/fa";
import DistanceInput from "./DistanceInput";
import styles from "./ExerciseSetsTable.module.css";
import RepsInput from "./RepsInput";
import TimedInput from "./TimedInput";
import WeightInput from "./WeightInput";
import { useBarbellLogStore } from "../../../stores/barbellLogStore";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTimerStore } from "../../../stores/timerStore";

export default function ExerciseSetsTable({ toggleMotivationText }) {
   const [showExerciseSetNote, setShowExerciseSetNote] = useState<
      number | null
   >(null);
   const barbellLog = useBarbellLogStore((state) => state.barbellLog);
   const updateBarbellLog = useBarbellLogStore(
      (state) => state.updateBarbellLog
   );
   const currentExercise = useMemo(
      () =>
         barbellLog?.completedExercises.find(
            (exercise) =>
               exercise.completedExerciseOrder ===
               barbellLog?.currentExerciseOrder
         ),
      [barbellLog]
   );
   const exerciseSets = useMemo(
      () => currentExercise?.completedExerciseSets,
      [currentExercise]
   );
   const noteInputRef = useRef<HTMLInputElement>(null);
   const startTimer = useTimerStore((state) => state.startTimer);
   const resetTimer = useTimerStore((state) => state.resetTimer);
   const updateTimerMessage = useTimerStore(
      (state) => state.updateTimerMessage
   );

   useEffect(() => {
      if (showExerciseSetNote !== null) {
         noteInputRef.current?.focus();
      }

      const handleClickOutside = (event: MouseEvent) => {
         if (showExerciseSetNote !== null) {
            const openModalRow = document.querySelector(
               `div[data-set-order='${showExerciseSetNote}']`
            );

            if (openModalRow && !openModalRow.contains(event.target as Node)) {
               setShowExerciseSetNote(null);
            }
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [showExerciseSetNote]);

   const updateReps = ({
      completedExerciseSetOrder,
      updatedReps,
   }: {
      completedExerciseSetOrder: number;
      updatedReps: number;
   }) => {
      if (barbellLog) {
         const updatedExercise = {
            ...currentExercise,
            completedExerciseSets: currentExercise?.completedExerciseSets.map(
               (set) =>
                  set.completedExerciseSetOrder === completedExerciseSetOrder
                     ? { ...set, completedReps: updatedReps }
                     : set
            ),
         };

         const updatedCompletedExercises = barbellLog?.completedExercises.map(
            (exercise) =>
               exercise.completedExerciseOrder ===
               updatedExercise.completedExerciseOrder
                  ? updatedExercise
                  : exercise
         );

         const updatedBarbellLog = {
            ...barbellLog,
            completedExercises: updatedCompletedExercises,
         };

         updateBarbellLog(updatedBarbellLog);
      }
   };

   const updateWeight = ({
      completedExerciseSetOrder,
      weight,
   }: {
      completedExerciseSetOrder: number;
      weight: number;
   }) => {
      if (barbellLog) {
         const updatedExercise = {
            ...currentExercise,
            completedExerciseSets: currentExercise?.completedExerciseSets.map(
               (set) =>
                  set.completedExerciseSetOrder === completedExerciseSetOrder
                     ? { ...set, completedWeight: weight }
                     : set
            ),
         };

         const updatedCompletedExercises = barbellLog?.completedExercises.map(
            (exercise) =>
               exercise.completedExerciseOrder ===
               updatedExercise.completedExerciseOrder
                  ? updatedExercise
                  : exercise
         );

         const updatedBarbellLog = {
            ...barbellLog,
            completedExercises: updatedCompletedExercises,
         };

         updateBarbellLog(updatedBarbellLog);
      }
   };

   const updateHr = ({
      completedExerciseSetOrder,
      hr,
   }: {
      completedExerciseSetOrder: number;
      hr: number;
   }) => {
      if (barbellLog) {
         const updatedExercise = {
            ...currentExercise,
            completedExerciseSets: currentExercise?.completedExerciseSets.map(
               (set) =>
                  set.completedExerciseSetOrder === completedExerciseSetOrder
                     ? { ...set, completedHr: hr }
                     : set
            ),
         };

         const updatedCompletedExercises = barbellLog?.completedExercises.map(
            (exercise) =>
               exercise.completedExerciseOrder ===
               updatedExercise.completedExerciseOrder
                  ? updatedExercise
                  : exercise
         );

         const updatedBarbellLog = {
            ...barbellLog,
            completedExercises: updatedCompletedExercises,
         };

         updateBarbellLog(updatedBarbellLog);
      }
   };

   const updateMin = ({
      completedExerciseSetOrder,
      min,
   }: {
      completedExerciseSetOrder: number;
      min: number;
   }) => {
      if (barbellLog) {
         const updatedExercise = {
            ...currentExercise,
            completedExerciseSets: currentExercise?.completedExerciseSets.map(
               (set) =>
                  set.completedExerciseSetOrder === completedExerciseSetOrder
                     ? { ...set, completedMin: min }
                     : set
            ),
         };

         const updatedCompletedExercises = barbellLog?.completedExercises.map(
            (exercise) =>
               exercise.completedExerciseOrder ===
               updatedExercise.completedExerciseOrder
                  ? updatedExercise
                  : exercise
         );

         const updatedBarbellLog = {
            ...barbellLog,
            completedExercises: updatedCompletedExercises,
         };

         updateBarbellLog(updatedBarbellLog);
      }
   };

   const updateSec = ({
      completedExerciseSetOrder,
      sec,
   }: {
      completedExerciseSetOrder: number;
      sec: number;
   }) => {
      if (barbellLog) {
         const updatedExercise = {
            ...currentExercise,
            completedExerciseSets: currentExercise?.completedExerciseSets.map(
               (set) =>
                  set.completedExerciseSetOrder === completedExerciseSetOrder
                     ? { ...set, completedSec: sec }
                     : set
            ),
         };

         const updatedCompletedExercises = barbellLog?.completedExercises.map(
            (exercise) =>
               exercise.completedExerciseOrder ===
               updatedExercise.completedExerciseOrder
                  ? updatedExercise
                  : exercise
         );

         const updatedBarbellLog = {
            ...barbellLog,
            completedExercises: updatedCompletedExercises,
         };

         updateBarbellLog(updatedBarbellLog);
      }
   };

   const updateDistance = ({
      completedExerciseSetOrder,
      distance,
   }: {
      completedExerciseSetOrder: number;
      distance: number;
   }) => {
      if (barbellLog) {
         const updatedExercise = {
            ...currentExercise,
            completedExerciseSets: currentExercise?.completedExerciseSets.map(
               (set) =>
                  set.completedExerciseSetOrder === completedExerciseSetOrder
                     ? { ...set, completedDistance: distance }
                     : set
            ),
         };

         const updatedCompletedExercises = barbellLog?.completedExercises.map(
            (exercise) =>
               exercise.completedExerciseOrder ===
               updatedExercise.completedExerciseOrder
                  ? updatedExercise
                  : exercise
         );

         const updatedBarbellLog = {
            ...barbellLog,
            completedExercises: updatedCompletedExercises,
         };

         updateBarbellLog(updatedBarbellLog);
      }
   };

   const updateIsComplete = (completedSetOrder: number) => {
      if (barbellLog) {
         const updatedCompletedExerciseSets =
            currentExercise?.completedExerciseSets.map((set) =>
               set.completedExerciseSetOrder === completedSetOrder
                  ? { ...set, isComplete: !set.isComplete }
                  : set
            );

         const updatedCurrentExercise = {
            ...currentExercise,
            completedExerciseSets: updatedCompletedExerciseSets,
         };

         const updatedCompletedExercises = barbellLog?.completedExercises.map(
            (exercise) =>
               exercise.completedExerciseOrder ===
               updatedCurrentExercise.completedExerciseOrder
                  ? updatedCurrentExercise
                  : exercise
         );

         const updatedBarbellLog = {
            ...barbellLog,
            completedExercises: updatedCompletedExercises,
         };

         // check if completed set order is the last set and if the current exercise is the last exercise
         if (
            completedSetOrder ===
               currentExercise?.completedExerciseSets[
                  currentExercise?.completedExerciseSets.length - 1
               ].completedExerciseSetOrder &&
            currentExercise.completedExerciseOrder ===
               barbellLog.completedExercises[
                  barbellLog.completedExercises.length - 1
               ].completedExerciseOrder
         ) {
            resetTimer();
            updateTimerMessage("Workout complete");

            toggleMotivationText();

            window.scrollTo(0, 0);
            // check if the completedSetOrder is the last set in the exercise
         } else if (
            completedSetOrder ===
            currentExercise?.completedExerciseSets[
               currentExercise?.completedExerciseSets.length - 1
            ].completedExerciseSetOrder
         ) {
            updatedBarbellLog.currentExerciseOrder =
               updatedBarbellLog.currentExerciseOrder + 1;

            toggleMotivationText();

            resetTimer();
            startTimer("Start exercise time");

            window.scrollTo(0, 0);
         } else {
            resetTimer();
            startTimer("Start set time");
         }

         updateBarbellLog(updatedBarbellLog);
      }
   };

   const updateShowExerciseSetNotes = (exerciseSetOrder: number) => {
      setShowExerciseSetNote((prev) =>
         prev === exerciseSetOrder ? null : exerciseSetOrder
      );

      noteBtnRef.current?.focus();
   };

   const updateExerciseSetNotes = ({
      exerciseSetOrder,
      notes,
   }: {
      exerciseSetOrder: number;
      notes: string;
   }) => {
      if (barbellLog) {
         const updatedCompletedExerciseSets =
            currentExercise?.completedExerciseSets.map((set) =>
               set.completedExerciseSetOrder === exerciseSetOrder
                  ? { ...set, notes }
                  : set
            );

         const updatedCurrentExercise = {
            ...currentExercise,
            completedExerciseSets: updatedCompletedExerciseSets,
         };

         const updatedCompletedExercises = barbellLog?.completedExercises.map(
            (exercise) =>
               exercise.completedExerciseOrder ===
               updatedCurrentExercise.completedExerciseOrder
                  ? updatedCurrentExercise
                  : exercise
         );

         updateBarbellLog({
            ...barbellLog,
            completedExercises: updatedCompletedExercises,
         });
      }
   };

   return (
      <table className={styles.tableWrapper}>
         <thead>
            <tr>
               <th className={`subText ${styles.tableHeader}`}>set</th>
               <th className={`subText ${styles.tableHeader}`}>details</th>
               <th className={`subText ${styles.tableHeader}`}>
                  notes / complete
               </th>
            </tr>
         </thead>
         <tbody>
            {exerciseSets &&
               exerciseSets.map((exerciseSet) => (
                  <tr key={exerciseSet.completedExerciseSetOrder}>
                     <td className={styles.tableData}>
                        <div className={styles.setNumberWrapper}>
                           {exerciseSet.isWarmup ? (
                              <span className={styles.warmupIcon}>W</span>
                           ) : null}
                           <span>{exerciseSet.completedExerciseSetOrder}</span>
                        </div>
                     </td>
                     <td className={styles.tableData}>
                        <div className={styles.repsWeightInputWrapper}>
                           {exerciseSet.hasReps ? (
                              <>
                                 <RepsInput
                                    completedExerciseSetOrder={
                                       exerciseSet.completedExerciseSetOrder
                                    }
                                    reps={exerciseSet.completedReps}
                                    updateReps={updateReps}
                                    isComplete={exerciseSet.isComplete}
                                 />
                                 <span>X</span>
                              </>
                           ) : null}
                           {exerciseSet.isBodyweight ? (
                              "BW"
                           ) : (
                              <WeightInput
                                 weight={exerciseSet.completedWeight}
                                 weightUnit={exerciseSet.completedWeightUnit}
                                 updateWeight={updateWeight}
                                 completedExerciseSetOrder={
                                    exerciseSet.completedExerciseSetOrder
                                 }
                                 isComplete={exerciseSet.isComplete}
                              />
                           )}
                        </div>
                        {exerciseSet.isTimed ? (
                           <TimedInput
                              completedExerciseSetOrder={
                                 exerciseSet.completedExerciseSetOrder
                              }
                              hr={exerciseSet.completedHr}
                              min={exerciseSet.completedMin}
                              sec={exerciseSet.completedSec}
                              updateHr={updateHr}
                              updateMin={updateMin}
                              updateSec={updateSec}
                              isComplete={exerciseSet.isComplete}
                           />
                        ) : null}
                        {exerciseSet.isDistance ? (
                           <DistanceInput
                              completedExerciseSetOrder={
                                 exerciseSet.completedExerciseSetOrder
                              }
                              distance={exerciseSet.completedDistance}
                              distanceUnit={exerciseSet.completedDistanceUnit}
                              updateDistance={updateDistance}
                              isComplete={exerciseSet.isComplete}
                           />
                        ) : null}
                     </td>
                     <td className={styles.tableData}>
                        <div className={styles.exerciseSetOptionsWrapper}>
                           <div
                              className={styles.noteWrapper}
                              data-set-order={
                                 exerciseSet.completedExerciseSetOrder
                              }
                           >
                              <button
                                 className={`standardIconBtn ${
                                    exerciseSet.notes
                                       ? styles.notesBtnActive
                                       : styles.notesBtn
                                 }`}
                                 onClick={() =>
                                    updateShowExerciseSetNotes(
                                       exerciseSet.completedExerciseSetOrder
                                    )
                                 }
                              >
                                 <FaStickyNote />
                              </button>
                              {showExerciseSetNote ===
                              exerciseSet.completedExerciseSetOrder ? (
                                 <div className={styles.noteModalWrapper}>
                                    <input
                                       ref={noteInputRef}
                                       className={`standardInput ${styles.noteInput}`}
                                       type="text"
                                       value={exerciseSet.notes || ""}
                                       onChange={(e) =>
                                          updateExerciseSetNotes({
                                             exerciseSetOrder:
                                                exerciseSet.completedExerciseSetOrder,
                                             notes: e.target.value,
                                          })
                                       }
                                       onBlur={() =>
                                          updateShowExerciseSetNotes(
                                             exerciseSet.completedExerciseSetOrder
                                          )
                                       }
                                    />
                                 </div>
                              ) : null}
                           </div>
                           <button
                              className={`standardIconBtn ${
                                 exerciseSet.isComplete
                                    ? styles.completeBtn
                                    : styles.notCompleteBtn
                              }`}
                              onClick={() =>
                                 updateIsComplete(
                                    exerciseSet.completedExerciseSetOrder
                                 )
                              }
                           >
                              <FaCheckCircle />
                           </button>
                        </div>
                     </td>
                  </tr>
               ))}
         </tbody>
      </table>
   );
}
