import { FaCheckCircle } from "react-icons/fa";
import DistanceInput from "./DistanceInput";
import styles from "./ExerciseSetsTable.module.css";
import RepsInput from "./RepsInput";
import TimedInput from "./TimedInput";
import WeightInput from "./WeightInput";
import { useBarbellLogStore } from "../../../stores/barbellLogStore";
import { useMemo } from "react";

export default function ExerciseSetsTable() {
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

   const updateHr = (hr: number) => {
      if (barbellLog) {
         const updatedCompletedExercises = barbellLog?.completedExercises.map(
            (exercise) =>
               exercise.completedExerciseOrder ===
               currentExercise?.completedExerciseOrder
                  ? { ...exercise, completedHr: hr }
                  : exercise
         );

         const updatedBarbellLog = {
            ...barbellLog,
            completedExercises: updatedCompletedExercises,
         };

         updateBarbellLog(updatedBarbellLog);
      }
   };

   const updateMin = (min: number) => {
      if (barbellLog) {
         const updatedCompletedExercises = barbellLog?.completedExercises.map(
            (exercise) =>
               exercise.completedExerciseOrder ===
               currentExercise?.completedExerciseOrder
                  ? { ...exercise, completedMin: min }
                  : exercise
         );

         const updatedBarbellLog = {
            ...barbellLog,
            completedExercises: updatedCompletedExercises,
         };

         updateBarbellLog(updatedBarbellLog);
      }
   };

   const updateSec = (sec: number) => {
      if (barbellLog) {
         const updatedCompletedExercises = barbellLog?.completedExercises.map(
            (exercise) =>
               exercise.completedExerciseOrder ===
               currentExercise?.completedExerciseOrder
                  ? { ...exercise, completedSec: sec }
                  : exercise
         );

         const updatedBarbellLog = {
            ...barbellLog,
            completedExercises: updatedCompletedExercises,
         };

         updateBarbellLog(updatedBarbellLog);
      }
   };

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
      updatedWeight,
   }: {
      completedExerciseSetOrder: number;
      updatedWeight: number;
   }) => {
      if (barbellLog) {
         const updatedExercise = {
            ...currentExercise,
            completedExerciseSets: currentExercise?.completedExerciseSets.map(
               (set) =>
                  set.completedExerciseSetOrder === completedExerciseSetOrder
                     ? { ...set, completedWeight: updatedWeight }
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

   const updateDistance = (distance: number) => {
      if (barbellLog) {
         const updatedCompletedExercises = barbellLog?.completedExercises.map(
            (exercise) =>
               exercise.completedExerciseOrder ===
               currentExercise?.completedExerciseOrder
                  ? { ...exercise, completedDistance: distance }
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
               <th className={styles.tableHeader}>set</th>
               <th className={styles.tableHeader}>details</th>
               <th className={styles.tableHeader}>complete</th>
            </tr>
         </thead>
         <tbody>
            {exerciseSets &&
               exerciseSets.map((exerciseSet) => (
                  <tr key={exerciseSet.exerciseSetId}>
                     <td className={styles.tableData}>
                        {exerciseSet.completedExerciseSetOrder}
                     </td>
                     <td className={styles.tableData}>
                        <div className={styles.repsWeightInputWrapper}>
                           {exerciseSet.hasReps ? (
                              <RepsInput
                                 completedExerciseSetOrder={
                                    exerciseSet.completedExerciseSetOrder
                                 }
                                 reps={exerciseSet.completedReps}
                                 updateReps={updateReps}
                              />
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
                              />
                           )}
                        </div>
                        {exerciseSet.isTimed ? (
                           <TimedInput
                              hr={exerciseSet.compeltedHr}
                              min={exerciseSet.completedMin}
                              sec={exerciseSet.completedSec}
                              updateHr={updateHr}
                              updateMin={updateMin}
                              updateSec={updateSec}
                           />
                        ) : null}
                        {exerciseSet.isDistance ? (
                           <DistanceInput
                              distance={exerciseSet.completedDistance}
                              distanceUnit={exerciseSet.completedDistanceUnit}
                              updateDistance={updateDistance}
                           />
                        ) : null}
                     </td>
                     <td className={styles.tableData}>
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
                     </td>
                  </tr>
               ))}
         </tbody>
      </table>
   );
}
