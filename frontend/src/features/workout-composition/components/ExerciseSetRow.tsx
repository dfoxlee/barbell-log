import {
   FaEllipsisV,
   FaPencilAlt,
   FaToggleOff,
   FaToggleOn,
   FaTrashAlt,
} from "react-icons/fa";
import type {
   ExerciseSetType,
   ExerciseType,
} from "../../../types/workoutTypes";
import { useWorkoutCompositionStore } from "../../../stores/workoutCompositionStore";
import { useEffect, useMemo, useRef, useState } from "react";
import toastify from "../../../utils/toastify";
import { rwtdCellFormat } from "../../../utils/formatting";
import ExerciseSetEditCell from "./ExerciseSetEditCell";

import styles from "./ExerciseSetsGrid.module.css";

export default function ExerciseSetRow({
   exerciseSet,
   toggleViewAllExerciseSets,
   viewAllExerciseSets,
}: {
   exerciseSet: ExerciseSetType;
   toggleViewAllExerciseSets: () => void;
   viewAllExerciseSets: boolean;
}) {
   const [optionsDropDownOpen, setOptionsDropDownOpen] = useState(false);
   const dropDownOptionsRef = useRef(null);

   useEffect(() => {
      const hnadleClickOutside = (event: MouseEvent) => {
         if (
            dropDownOptionsRef.current &&
            !dropDownOptionsRef.current.contains(event.target as Node)
         ) {
            setOptionsDropDownOpen(false);
         }
      };
      document.addEventListener("mousedown", hnadleClickOutside);
      return () => {
         document.removeEventListener("mousedown", hnadleClickOutside);
      };
   }, [optionsDropDownOpen]);

   const workoutComposition = useWorkoutCompositionStore(
      (state) => state.workoutComposition
   );
   const currentExerciseViewOrder = useWorkoutCompositionStore(
      (state) => state.currentExerciseViewOrder
   );
   const currentExerciseSetViewOrder = useWorkoutCompositionStore(
      (state) => state.currentExerciseSetViewOrder
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

   const handleSwitchToExerciseSet = () => {
      if (viewAllExerciseSets) {
         toggleViewAllExerciseSets();
      }

      updateCurrentExerciseSetViewOrder(exerciseSet.exerciseSetOrder);
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

   const handleOptionsClick = () => {
      setOptionsDropDownOpen((prev) => !prev);
   };

   return (
      <>
         <span className={styles.gridDataCell}>
            <div className={styles.exerciseSetRowOptions}>
               {currentExerciseSetViewOrder !== exerciseSet.exerciseSetOrder ? (
                  <button
                     className={`standardIconBtn ${styles.skipToSetBtn}`}
                     onClick={handleSwitchToExerciseSet}
                  >
                     <FaPencilAlt />
                  </button>
               ) : null}
               {exerciseSet.isWarmup ? (
                  <span className={styles.warmUpIcon}>W</span>
               ) : null}
            </div>
         </span>
         <span className={styles.gridDataCell}>
            {exerciseSet.exerciseSetOrder}
         </span>
         <span className={styles.gridDataCell}>
            {exerciseSet.exerciseSetOrder === currentExerciseSetViewOrder ? (
               <ExerciseSetEditCell exerciseSet={exerciseSet} />
            ) : (
               currentExerciseSet && rwtdCellFormat(exerciseSet)
            )}
         </span>
         <span className={styles.rowOptionsCell}>
            {currentExercise && currentExercise?.exerciseSets.length > 1 ? (
               <button
                  className={`standardIconBtn ${styles.deleteSetBtn}`}
                  onClick={handleDeleteExerciseSetClick}
               >
                  <FaTrashAlt />
               </button>
            ) : null}
            {currentExerciseSetViewOrder === exerciseSet.exerciseSetOrder ? (
               <div className={styles.optionsWrapper} ref={dropDownOptionsRef}>
                  <button
                     className={`standardIconBtn ${styles.optionsBtn}`}
                     onClick={handleOptionsClick}
                  >
                     <FaEllipsisV />
                  </button>
                  {optionsDropDownOpen &&
                  exerciseSet.exerciseSetOrder ===
                     currentExerciseSetViewOrder ? (
                     <div className={styles.optionsDropDown}>
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
                              <span className={styles.toggleSetOptionText}>
                                 Warmup?
                              </span>
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
                              <span className={styles.toggleSetOptionText}>
                                 Timed?
                              </span>
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
                              <span className={styles.toggleSetOptionText}>
                                 Distance?
                              </span>
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
                              <span className={styles.toggleSetOptionText}>
                                 Reps?
                              </span>
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
                     </div>
                  ) : null}
               </div>
            ) : null}
         </span>
      </>
   );
}
