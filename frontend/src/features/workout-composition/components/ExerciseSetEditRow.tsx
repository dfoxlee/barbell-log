import { FaToggleOff, FaToggleOn, FaTrashAlt } from "react-icons/fa";
import type {
   ExerciseSetType,
   ExerciseType,
} from "../../../types/workoutTypes";
import { useWorkoutCompositionStore } from "../../../stores/workoutCompositionStore";
import { useMemo } from "react";
import toastify from "../../../utils/toastify";
import { distanceUnits, weightUnits } from "../../../enums/constants";

import styles from "./ExerciseSetsGrid.module.css";

export default function ExerciseSetEditRow({
   exerciseSet,
}: {
   exerciseSet: ExerciseSetType;
}) {
   const currentExerciseViewOrder = useWorkoutCompositionStore(
      (state) => state.currentExerciseViewOrder
   );
   const currentExerciseSetViewOrder = useWorkoutCompositionStore(
      (state) => state.currentExerciseSetViewOrder
   );
   const workoutComposition = useWorkoutCompositionStore(
      (state) => state.workoutComposition
   );
   const updateCurrentExerciseSetViewOrder = useWorkoutCompositionStore(
      (state) => state.updateCurrentExerciseSetViewOrder
   );
   const updateWorkoutComposition = useWorkoutCompositionStore(
      (state) => state.updateWorkoutComposition
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

   const handleToggleIsWarmupClick = () => {
      const updatedSet = {
         ...currentExerciseSet,
         isWarmup: !currentExerciseSet?.isWarmup,
      };

      const updatedSets = currentExercise?.exerciseSets.map((set) => {
         if (set.exerciseSetOrder === updatedSet.exerciseSetOrder) {
            return updatedSet;
         }

         return set;
      });

      const updatedExercise = {
         ...currentExercise,
         exerciseSets: updatedSets,
      } as ExerciseType;

      updateExercise(updatedExercise);
   };

   const handleToggleIsTimedClick = () => {
      const updatedSet = {
         ...currentExerciseSet,
         isTimed: !currentExerciseSet?.isTimed,
      };

      const updatedSets = currentExercise?.exerciseSets.map((set) => {
         if (set.exerciseSetOrder === updatedSet.exerciseSetOrder) {
            return updatedSet;
         }

         return set;
      });

      const updatedExercise = {
         ...currentExercise,
         exerciseSets: updatedSets,
      } as ExerciseType;

      updateExercise(updatedExercise);
   };

   const handleToggleIsDistanceClick = () => {
      const updatedSet = {
         ...currentExerciseSet,
         isDistance: !currentExerciseSet?.isDistance,
      };

      const updatedSets = currentExercise?.exerciseSets.map((set) => {
         if (set.exerciseSetOrder === updatedSet.exerciseSetOrder) {
            return updatedSet;
         }

         return set;
      });

      const updatedExercise = {
         ...currentExercise,
         exerciseSets: updatedSets,
      } as ExerciseType;

      updateExercise(updatedExercise);
   };

   const handleTogglehasRepsClick = () => {
      const updatedSet = {
         ...currentExerciseSet,
         hasReps: !currentExerciseSet?.hasReps,
      };

      const updatedSets = currentExercise?.exerciseSets.map((set) => {
         if (set.exerciseSetOrder === updatedSet.exerciseSetOrder) {
            return updatedSet;
         }

         return set;
      });

      const updatedExercise = {
         ...currentExercise,
         exerciseSets: updatedSets,
      } as ExerciseType;

      updateExercise(updatedExercise);
   };

   const handleToggleisBodyweightClick = () => {
      const updatedSet = {
         ...currentExerciseSet,
         isBodyweight: !currentExerciseSet?.isBodyweight,
      };

      const updatedSets = currentExercise?.exerciseSets.map((set) => {
         if (set.exerciseSetOrder === updatedSet.exerciseSetOrder) {
            return updatedSet;
         }

         return set;
      });

      const updatedExercise = {
         ...currentExercise,
         exerciseSets: updatedSets,
      } as ExerciseType;

      updateExercise(updatedExercise);
   };

   const handleRepsInput = (event) => {
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
            reps: repsInput,
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

   const handleWeightInput = (event) => {
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

   const handleHrInput = (event) => {
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

   const handleMinInput = (event) => {
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

   const handleSecInput = (event) => {
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

   const handleDistanceInput = (event) => {
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

   const handleDeleteExerciseSetClick = () => {
      if (currentExercise?.exerciseSets.length === 1) {
         return toastify({
            message: "All exercises must have at least on set.",
            type: "warning",
         });
      }

      if (workoutComposition && currentExercise) {
         const updatedCurrentExerciseSets = currentExercise?.exerciseSets
            .filter(
               (set) =>
                  set.exerciseSetOrder !== currentExerciseSet?.exerciseSetOrder
            )
            .map((set, index) => ({
               ...set,
               exerciseSetOrder: index + 1,
            }));

         const updatedExercise = {
            ...currentExercise,
            exerciseSets: updatedCurrentExerciseSets,
         };

         const updatedWorkoutComposition = {
            ...workoutComposition,
            exercises: workoutComposition.exercises.map((exercise) =>
               exercise.exerciseOrder === updatedExercise.exerciseOrder
                  ? updatedExercise
                  : exercise
            ),
         };

         updateCurrentExerciseSetViewOrder(
            updatedCurrentExerciseSets[updatedCurrentExerciseSets.length - 1]
               .exerciseSetOrder
         );
         updateWorkoutComposition(updatedWorkoutComposition);
      }
   };

   return (
      <>
         <span className={styles.gridEditCell}>
            <div className={styles.toggleBtnsWrapper}>
               <button
                  className={`${styles.toggleBtn}`}
                  onClick={handleToggleIsWarmupClick}
               >
                  {currentExerciseSet?.isWarmup ? (
                     <FaToggleOn className={styles.toggleIcon} />
                  ) : (
                     <FaToggleOff className={styles.toggleIcon} />
                  )}
                  <span className={styles.toggleSetOptionText}>Warmup?</span>
               </button>
               <button
                  className={`${styles.toggleBtn}`}
                  onClick={handleToggleIsTimedClick}
               >
                  {currentExerciseSet?.isTimed ? (
                     <FaToggleOn className={styles.toggleIcon} />
                  ) : (
                     <FaToggleOff className={styles.toggleIcon} />
                  )}
                  <span className={styles.toggleSetOptionText}>Timed?</span>
               </button>
               <button
                  className={`${styles.toggleBtn}`}
                  onClick={handleToggleIsDistanceClick}
               >
                  {currentExerciseSet?.isDistance ? (
                     <FaToggleOn className={styles.toggleIcon} />
                  ) : (
                     <FaToggleOff className={styles.toggleIcon} />
                  )}
                  <span className={styles.toggleSetOptionText}>Distance?</span>
               </button>
               <button
                  className={`${styles.toggleBtn}`}
                  onClick={handleTogglehasRepsClick}
               >
                  {currentExerciseSet?.hasReps ? (
                     <FaToggleOn className={styles.toggleIcon} />
                  ) : (
                     <FaToggleOff className={styles.toggleIcon} />
                  )}
                  <span className={styles.toggleSetOptionText}>Reps?</span>
               </button>
               <button
                  className={`${styles.toggleBtn}`}
                  onClick={handleToggleisBodyweightClick}
               >
                  {currentExerciseSet?.isBodyweight ? (
                     <FaToggleOn className={styles.toggleIcon} />
                  ) : (
                     <FaToggleOff className={styles.toggleIcon} />
                  )}
                  <span className={styles.toggleSetOptionText}>
                     Bodyweight?
                  </span>
               </button>
            </div>
         </span>
         <span className={styles.gridEditCell}>
            {exerciseSet.exerciseSetOrder}
         </span>
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
         <span className={styles.gridEditCell}>
            {currentExercise && currentExercise?.exerciseSets.length > 1 ? (
               <button
                  className={`standardIconBtn ${styles.deleteSetBtn}`}
                  onClick={handleDeleteExerciseSetClick}
               >
                  <FaTrashAlt />
               </button>
            ) : (
               ""
            )}
         </span>
      </>
   );
}
