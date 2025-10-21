import { FaCheck, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import StandardBtn from "../../shared/StandardBtn";
import type { CompletedExerciseSetType } from "../../../types/completed-exercise-set.types";
import StandardIconBtn from "../../shared/StandardIconBtn";
import { useCompletedWorkoutStore } from "../../../stores/completed-workout.store";
import { useMemo } from "react";

import styles from "./CompletedSetNavigation.module.css";
import type { CompletedWorkoutType } from "../../../types/completed-workout.types";
import { useTimerStore } from "../../../stores/timer.store";

export default function CompletedSetNavigation() {
   const completedWorkout = useCompletedWorkoutStore(
      (state) => state.completedWorkout
   );
   const setCompletedWorkout = useCompletedWorkoutStore(
      (state) => state.setCompletedWorkout
   );
   const setCurrentCompletedExerciseOrder = useCompletedWorkoutStore(
      (state) => state.setCurrentCompletedExerciseOrder
   );
   const setCurrentCompletedExerciseSetOrder = useCompletedWorkoutStore(
      (state) => state.setCurrentCompletedExerciseSetOrder
   );
   const currentCompletedExerciseOrder = useCompletedWorkoutStore(
      (state) => state.currentCompletedExerciseOrder
   );
   const currentCompletedExerciseSetOrder = useCompletedWorkoutStore(
      (state) => state.currentCompletedExerciseSetOrder
   );
   const timerEvent = useTimerStore((state) => state.timerEvent);
   const currentCompletedExercise = useMemo(
      () =>
         completedWorkout?.completedExercises.find(
            (ce) => ce.completedExerciseOrder === currentCompletedExerciseOrder
         ),
      [completedWorkout?.completedExercises, currentCompletedExerciseOrder]
   );
   const currentCompletedExerciseSet = useMemo(
      () =>
         currentCompletedExercise?.completedExerciseSets.find(
            (ces: CompletedExerciseSetType) =>
               ces.completedExerciseSetOrder ===
               currentCompletedExerciseSetOrder
         ),
      [
         currentCompletedExercise?.completedExerciseSets,
         currentCompletedExerciseSetOrder,
      ]
   );
   const maxSetOrder = currentCompletedExercise?.completedExerciseSets.reduce(
      (prev, curr) =>
         curr.completedExerciseSetOrder > prev
            ? curr.completedExerciseSetOrder
            : prev,
      -1
   );
   const maxExerciseOrder = completedWorkout?.completedExercises.reduce(
      (prev, curr) =>
         curr.completedExerciseOrder > prev
            ? curr.completedExerciseOrder
            : prev,
      -1
   );

   const handleSetDecrementClick = () => {
      //is current set first
      console.log(
         currentCompletedExerciseSet?.completedExerciseSetOrder,
         currentCompletedExercise?.completedExerciseOrder
      );
      if (currentCompletedExerciseSet?.completedExerciseSetOrder === 1) {
         //is current exercise first
         if (currentCompletedExercise?.completedExerciseOrder === 1) {
            //at start of workout
            return;
         }

         //decrement exercise
         const updatedCurrentExerciseOrder = currentCompletedExerciseOrder - 1;
         const prevExercise = completedWorkout?.completedExercises.find(
            (e) =>
               e.completedExerciseOrder === currentCompletedExerciseOrder - 1
         );
         const maxSetOrder = prevExercise?.completedExerciseSets.reduce(
            (max, set) => Math.max(max, set.completedExerciseSetOrder),
            1
         );
         setCurrentCompletedExerciseOrder(updatedCurrentExerciseOrder);
         timerEvent("Set Change");
         //set current set to last set
         return setCurrentCompletedExerciseSetOrder(maxSetOrder || 1);
      }

      //decrement set
      const updatedCurrentSetOrder = currentCompletedExerciseSetOrder - 1;
      setCurrentCompletedExerciseSetOrder(updatedCurrentSetOrder);
      timerEvent("Set Change");
   };

   const handleSetIncrementClick = () => {
      //is current set last?
      if (
         currentCompletedExerciseSet?.completedExerciseSetOrder === maxSetOrder
      ) {
         //is exercise last?
         if (
            currentCompletedExercise?.completedExerciseOrder ===
            maxExerciseOrder
         ) {
            //last set of the last exercise
            return;
         }

         //move to first set of next exercise
         setCurrentCompletedExerciseSetOrder(1);
         const updatedExerciseOrder = currentCompletedExerciseOrder + 1;
         setCurrentCompletedExerciseOrder(updatedExerciseOrder);
         return timerEvent("Exercise Change");
      }

      //increment set
      const updatedSetOrder = currentCompletedExerciseSetOrder + 1;
      setCurrentCompletedExerciseSetOrder(updatedSetOrder);
      return timerEvent("Set Change");
   };

   const handleCompleteSetClick = () => {
      const wasCompleted = currentCompletedExerciseSet?.wasCompleted;
      const updatedSet = {
         ...currentCompletedExerciseSet,
         wasCompleted: !wasCompleted,
      };

      const updatedSets = currentCompletedExercise?.completedExerciseSets.map(
         (s) =>
            s.completedExerciseSetOrder === updatedSet.completedExerciseSetOrder
               ? updatedSet
               : s
      );

      const updatedExercise = {
         ...currentCompletedExercise,
         completedExerciseSets: updatedSets,
      };

      const updatedExercises = completedWorkout?.completedExercises.map((e) =>
         e.completedExerciseOrder === updatedExercise.completedExerciseOrder
            ? updatedExercise
            : e
      );

      const updatedWorkout = {
         ...completedWorkout,
         completedExercises: updatedExercises,
      };

      setCompletedWorkout(updatedWorkout as CompletedWorkoutType);

      if (!wasCompleted) {
         handleSetIncrementClick();
      }
   };

   return (
      <div className={styles.container}>
         <StandardIconBtn
            Icon={FaChevronLeft}
            onClick={handleSetDecrementClick}
            disabled={
               currentCompletedExerciseSet?.completedExerciseSetOrder === 1 &&
               currentCompletedExercise?.completedExerciseOrder === 1
            }
         />
         <StandardBtn
            Icon={
               currentCompletedExerciseSet?.wasCompleted ? FaCheck : undefined
            }
            text={`${
               !currentCompletedExerciseSet?.wasCompleted ? "Complete " : ""
            }Set ${
               currentCompletedExerciseSet?.completedExerciseSetOrder ?? "..."
            }`}
            onClick={handleCompleteSetClick}
         />

         <StandardIconBtn
            Icon={FaChevronRight}
            onClick={handleSetIncrementClick}
         />
      </div>
   );
}
