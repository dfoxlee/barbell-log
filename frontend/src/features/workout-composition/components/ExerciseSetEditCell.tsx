import { useMemo } from "react";
import { useWorkoutCompositionStore } from "../../../stores/workoutCompositionStore";
import styles from "./ExerciseSetsGrid.module.css";
import toastify from "../../../utils/toastify";
import { distanceUnits, weightUnits } from "../../../enums/constants";
import type { ExerciseSetType } from "../../../types/workoutTypes";

export default function ExerciseSetEditCell({
   exerciseSet,
}: {
   exerciseSet: ExerciseSetType;
}) {
   const workoutComposition = useWorkoutCompositionStore(
      (state) => state.workoutComposition
   );
   const currentExerciseViewOrder = useWorkoutCompositionStore(
      (state) => state.currentExerciseViewOrder
   );
   const currentExerciseSetViewOrder = useWorkoutCompositionStore(
      (state) => state.currentExerciseSetViewOrder
   );
   const updateExercise = useWorkoutCompositionStore(
      (state) => state.updateExercise
   );

   const currentExercise = useMemo(() => {
      return workoutComposition.exercises.find(
         (exercise) => exercise.exerciseOrder === currentExerciseViewOrder
      );
   }, [workoutComposition.exercises, currentExerciseViewOrder]);

   const currentExerciseSet = useMemo(() => {
      if (currentExercise) {
         return currentExercise.exerciseSets.find(
            (set) => set.exerciseSetOrder === currentExerciseSetViewOrder
         );
      }
   }, [currentExercise, currentExerciseSetViewOrder]);

   const handleRepsInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      const repsInput = event.target.value;

      if (repsInput !== "" && !parseInt(repsInput)) {
         return toastify({
            message: "Reps value must be a valid number.",
            type: "warning",
         });
      }

      if (currentExercise && currentExerciseSet) {
         const updatedExerciseSet = {
            ...currentExerciseSet,
            reps: parseInt(repsInput),
         };

         const updatedExerciseSets = currentExercise.exerciseSets.map(
            (exerciseSet) =>
               exerciseSet.exerciseSetOrder ===
               updatedExerciseSet.exerciseSetOrder
                  ? updatedExerciseSet
                  : exerciseSet
         );

         const updatedExercise = {
            ...currentExercise,
            exerciseSets: updatedExerciseSets,
         };

         updateExercise(updatedExercise);
      }
   };

   const handleWeightUnitChange = (
      event: React.ChangeEvent<HTMLSelectElement>
   ) => {
      const weightUnit = event.target.value;

      if (currentExercise && currentExerciseSet) {
         const updatedExerciseSet = {
            ...currentExerciseSet,
            weightUnit,
         };

         const updatedExerciseSets = currentExercise.exerciseSets.map(
            (exerciseSet) =>
               exerciseSet.exerciseSetOrder ===
               updatedExerciseSet.exerciseSetOrder
                  ? updatedExerciseSet
                  : exerciseSet
         );

         const updatedExercise = {
            ...currentExercise,
            exerciseSets: updatedExerciseSets,
         };

         updateExercise(updatedExercise);
      }
   };

   const handleWeightInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      const weightInput = event.target.value;

      if (weightInput !== "" && !parseFloat(weightInput)) {
         return toastify({
            message: "Weights value must be a valid number.",
            type: "warning",
         });
      }

      if (currentExercise && currentExerciseSet) {
         const updatedExerciseSet = {
            ...currentExerciseSet,
            weight: weightInput,
         };

         const updatedExerciseSets = currentExercise.exerciseSets.map(
            (exerciseSet) =>
               exerciseSet.exerciseSetOrder ===
               updatedExerciseSet.exerciseSetOrder
                  ? updatedExerciseSet
                  : exerciseSet
         );

         const updatedExercise = {
            ...currentExercise,
            exerciseSets: updatedExerciseSets,
         };

         updateExercise(updatedExercise);
      }
   };

   const handleHrInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      const hrInput = event.target.value;

      if (hrInput !== "" && !parseInt(hrInput)) {
         return toastify({
            message: "Hours value must be a valid number.",
            type: "warning",
         });
      }

      if (currentExercise && currentExerciseSet) {
         const updatedExerciseSet = {
            ...currentExerciseSet,
            hr: hrInput,
         };

         const updatedExerciseSets = currentExercise.exerciseSets.map(
            (exerciseSet) =>
               exerciseSet.exerciseSetOrder ===
               updatedExerciseSet.exerciseSetOrder
                  ? updatedExerciseSet
                  : exerciseSet
         );

         const updatedExercise = {
            ...currentExercise,
            exerciseSets: updatedExerciseSets,
         };

         updateExercise(updatedExercise);
      }
   };

   const handleMinInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      const minInput = event.target.value;

      if (minInput !== "" && !parseInt(minInput)) {
         return toastify({
            message: "Minutes value must be a valid number.",
            type: "warning",
         });
      }

      if (currentExercise && currentExerciseSet) {
         const updatedExerciseSet = {
            ...currentExerciseSet,
            min: minInput,
         };

         const updatedExerciseSets = currentExercise.exerciseSets.map(
            (exerciseSet) =>
               exerciseSet.exerciseSetOrder ===
               updatedExerciseSet.exerciseSetOrder
                  ? updatedExerciseSet
                  : exerciseSet
         );

         const updatedExercise = {
            ...currentExercise,
            exerciseSets: updatedExerciseSets,
         };

         updateExercise(updatedExercise);
      }
   };

   const handleSecInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      const secInput = event.target.value;

      if (secInput !== "" && !parseInt(secInput)) {
         return toastify({
            message: "Seconds value must be a valid number.",
            type: "warning",
         });
      }

      if (currentExercise && currentExerciseSet) {
         const updatedExerciseSet = {
            ...currentExerciseSet,
            sec: secInput,
         };

         const updatedExerciseSets = currentExercise.exerciseSets.map(
            (exerciseSet) =>
               exerciseSet.exerciseSetOrder ===
               updatedExerciseSet.exerciseSetOrder
                  ? updatedExerciseSet
                  : exerciseSet
         );

         const updatedExercise = {
            ...currentExercise,
            exerciseSets: updatedExerciseSets,
         };

         updateExercise(updatedExercise);
      }
   };

   const handleDistanceInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      const distanceInput = event.target.value;

      if (distanceInput !== "" && !parseFloat(distanceInput)) {
         return toastify({
            message: "Distance value must be a valid number.",
            type: "warning",
         });
      }

      if (currentExercise && currentExerciseSet) {
         const updatedExerciseSet = {
            ...currentExerciseSet,
            distance: distanceInput,
         };

         const updatedExerciseSets = currentExercise.exerciseSets.map(
            (exerciseSet) =>
               exerciseSet.exerciseSetOrder ===
               updatedExerciseSet.exerciseSetOrder
                  ? updatedExerciseSet
                  : exerciseSet
         );

         const updatedExercise = {
            ...currentExercise,
            exerciseSets: updatedExerciseSets,
         };

         updateExercise(updatedExercise);
      }
   };
   
   const handleDistanceUnitChange = (
      event: React.ChangeEvent<HTMLSelectElement>
   ) => {
      const distanceUnit = event.target.value;

      if (currentExercise && currentExerciseSet) {
         const updatedExerciseSet = {
            ...currentExerciseSet,
            distanceUnit,
         };

         const updatedExerciseSets = currentExercise.exerciseSets.map(
            (exerciseSet) =>
               exerciseSet.exerciseSetOrder ===
               updatedExerciseSet.exerciseSetOrder
                  ? updatedExerciseSet
                  : exerciseSet
         );

         const updatedExercise = {
            ...currentExercise,
            exerciseSets: updatedExerciseSets,
         };

         updateExercise(updatedExercise);
      }
   };

   return (
      <span className={styles.gridEditCell}>
         <div className={styles.setInputsWrapper}>
            <div className={styles.repsWeightWrapper}>
               {currentExerciseSet?.hasReps ? (
                  <>
                     <input
                        inputMode="numeric"
                        className={`standardInput ${styles.repsInput}`}
                        value={exerciseSet.reps}
                        min="0"
                        onChange={handleRepsInput}
                     />
                     <span className={styles.repsWeightSeperator}>x</span>
                  </>
               ) : null}
               {currentExerciseSet?.isBodyweight ? (
                  <span className={styles.bodyweightIndicator}>BW</span>
               ) : (
                  <div className={styles.weightInputWrapper}>
                     <input
                        inputMode="decimal"
                        className={`standardInput ${styles.weightInput}`}
                        value={exerciseSet.weight}
                        min="0"
                        onChange={handleWeightInput}
                     />
                     <select
                        className={styles.unitSelector}
                        name="weight-unit"
                        id="weight-unit"
                        value={exerciseSet.weightUnit}
                        onChange={handleWeightUnitChange}
                     >
                        {weightUnits.map((unit) => (
                           <option key={unit.id} value={unit.label}>
                              {unit.label}
                           </option>
                        ))}
                     </select>
                  </div>
               )}
            </div>
            {currentExerciseSet?.isTimed ? (
               <div className={styles.timeInputsWrapper}>
                  <div className={styles.timeInputWrapper}>
                     <input
                        className={`standardInput ${styles.timeInput}`}
                        inputMode="numeric"
                        type="text"
                        onChange={handleHrInput}
                        value={currentExerciseSet.hr}
                     />
                     <span className={styles.timeSubText}>hr</span>
                  </div>
                  <div className={styles.timeInputWrapper}>
                     <input
                        className={`standardInput ${styles.timeInput}`}
                        inputMode="numeric"
                        type="text"
                        onChange={handleMinInput}
                        value={currentExerciseSet.min}
                     />
                     <span className={styles.timeSubText}>min</span>
                  </div>
                  <div className={styles.timeInputWrapper}>
                     <input
                        className={`standardInput ${styles.timeInput}`}
                        inputMode="numeric"
                        type="text"
                        onChange={handleSecInput}
                        value={currentExerciseSet.sec}
                     />
                     <span className={styles.timeSubText}>sec</span>
                  </div>
               </div>
            ) : null}
            {currentExerciseSet?.isDistance ? (
               <div className={styles.distanceInputWrapper}>
                  <input
                     className={`standardInput ${styles.distanceInput}`}
                     type="text"
                     inputMode="decimal"
                     onChange={handleDistanceInput}
                     value={currentExerciseSet.distance}
                  />
                  <select
                     className={styles.unitSelector}
                     name="distance-unit"
                     id="distance-unit"
                     value={exerciseSet.distanceUnit}
                     onChange={handleDistanceUnitChange}
                  >
                     {distanceUnits.map((unit) => (
                        <option key={unit.id} value={unit.label}>
                           {unit.label}
                        </option>
                     ))}
                  </select>
               </div>
            ) : null}
         </div>
      </span>
   );
}
