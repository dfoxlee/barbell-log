import {
   FaCheck,
   FaChevronLeft,
   FaChevronRight,
   FaTimes,
} from "react-icons/fa";
import styles from "./CompletedExerciseComposition.module.css";
import CompletedExerciseNavigation from "./CompletedExerciseNavigation";
import RepsInput from "./RepsInput";
import Timer from "./Timer";
import WeightInput from "./WeightInput";
import TimedInput from "./TimedInput";
import DistanceInput from "./DistanceInput";
import StandardBtn from "../../shared/StandardBtn";
import CompletedExerciseSetsTable from "./CompletedExerciseSetsTable";
import { useCompletedWorkoutStore } from "../../../stores/completed-workout.store";
import type { CompletedWorkoutType } from "../../../types/completed-workout.types";
import { useMemo, type ChangeEvent } from "react";
import type { CompletedExerciseSetType } from "../../../types/completed-exercise-set.types";

export default function CompletedExerciseComposition() {
   const completedWorkout = useCompletedWorkoutStore(
      (state) => state.completedWorkout
   );
   const setCompletedWorkout = useCompletedWorkoutStore(
      (state) => state.setCompletedWorkout
   );
   const currentCompletedExerciseOrder = useCompletedWorkoutStore(
      (state) => state.currentCompletedExerciseOrder
   );
   const currentCompletedExerciseSetOrder = useCompletedWorkoutStore(
      (state) => state.currentCompletedExerciseSetOrder
   );
   const setCurrentCompletedExerciseOrder = useCompletedWorkoutStore(
      (state) => state.setCurrentCompletedExerciseOrder
   );
   const setCurrentCompletedExerciseSetOrder = useCompletedWorkoutStore(
      (state) => state.setCurrentCompletedExerciseSetOrder
   );
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

   const updateCompletedWorkout = ({
      field,
      value,
   }: {
      field: string;
      value: number | string;
   }) => {
      const updatedSet = {
         ...currentCompletedExerciseSet,
         [field]: value,
      };

      const updatedSets = currentCompletedExercise?.completedExerciseSets.map(
         (ces) =>
            ces.completedExerciseSetOrder ===
            updatedSet.completedExerciseSetOrder
               ? updatedSet
               : ces
      );

      const updatedExercise = {
         ...currentCompletedExercise,
         completedExerciseSets: updatedSets,
      };

      const updatedExercises = completedWorkout?.completedExercises.map((ce) =>
         ce.completedExerciseOrder === updatedExercise.completedExerciseOrder
            ? updatedExercise
            : ce
      );
      const updatedCompletedWorkout = {
         ...completedWorkout,
         completedExercises: updatedExercises,
      };

      setCompletedWorkout(updatedCompletedWorkout as CompletedWorkoutType);
   };

   const handleIncrementExerciseSetOrder = () => {
      if (!currentCompletedExerciseSet?.wasCompleted) {
         const updatedSet = {
            ...currentCompletedExerciseSet,
            wasCompleted: true,
         };

         const updatedExercise = {
            ...currentCompletedExercise,
            completedExerciseSets:
               currentCompletedExercise?.completedExerciseSets.map((s) =>
                  s.completedExerciseSetOrder ===
                  updatedSet.completedExerciseSetOrder
                     ? updatedSet
                     : s
               ),
         };

         const updatedWorkout = {
            ...completedWorkout,
            completedExercises: completedWorkout?.completedExercises.map((e) =>
               e.completedExerciseOrder ===
               updatedExercise.completedExerciseOrder
                  ? updatedExercise
                  : e
            ),
         };

         setCompletedWorkout(updatedWorkout as CompletedWorkoutType);
      }

      const setOrders = currentCompletedExercise?.completedExerciseSets.map(
         (s) => s.completedExerciseSetOrder
      );

      if (!setOrders) return;

      const maxSetOrder = Math.max(...setOrders);

      if (maxSetOrder === currentCompletedExerciseSetOrder) {
         const exerciseOrders = completedWorkout?.completedExercises.map(
            (e) => e.completedExerciseOrder
         );

         if (!exerciseOrders) return;

         const maxExerciseOrder = Math.max(...exerciseOrders);

         if (maxExerciseOrder === currentCompletedExerciseOrder) return;

         setCurrentCompletedExerciseSetOrder(1);
         return setCurrentCompletedExerciseOrder(
            currentCompletedExerciseOrder + 1
         );
      }

      return setCurrentCompletedExerciseSetOrder(
         currentCompletedExerciseSetOrder + 1
      );
   };

   const handleDecrementExerciseSetOrder = () => {
      const updatedOrder = currentCompletedExerciseSetOrder - 1;

      setCurrentCompletedExerciseSetOrder(updatedOrder);
   };

   const handleNotesChange = (event: ChangeEvent<HTMLInputElement>) => {
      const updatedSet = {
         ...currentCompletedExerciseSet,
         notes: event.target.value,
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
   };

   return (
      <div>
         <Timer />
         <CompletedExerciseNavigation />
         <div className={styles.inputsWrapper}>
            <div className={styles.repsWeightWrapper}>
               {currentCompletedExerciseSet?.hadReps ? (
                  <>
                     <RepsInput
                        completedReps={
                           currentCompletedExerciseSet?.completedReps ?? 0
                        }
                        updateCompletedWorkout={updateCompletedWorkout}
                     />
                     <FaTimes />
                  </>
               ) : null}
               <WeightInput
                  completedWeight={
                     currentCompletedExerciseSet?.completedWeight ?? 0
                  }
                  completedWeightUnit={
                     currentCompletedExerciseSet?.completedWeightUnit ?? 0
                  }
                  updateCompletedWorkout={updateCompletedWorkout}
               />
            </div>
            {currentCompletedExerciseSet?.wasTimed ? (
               <TimedInput
                  completedHr={currentCompletedExerciseSet?.completedHr}
                  completedMin={currentCompletedExerciseSet?.completedMin}
                  completedSec={currentCompletedExerciseSet?.completedSec}
                  updateCompletedWorkout={updateCompletedWorkout}
               />
            ) : null}
            {currentCompletedExerciseSet?.wasDistance ? (
               <DistanceInput
                  completedDistance={
                     currentCompletedExerciseSet?.completedDistance
                  }
                  completedDistanceUnit={
                     currentCompletedExerciseSet?.completedDistanceUnit
                  }
                  updateCompletedWorkout={updateCompletedWorkout}
               />
            ) : null}
         </div>
         <input
            className={styles.notesInput}
            placeholder="Add a note..."
            value={currentCompletedExerciseSet?.notes}
            onChange={handleNotesChange}
         />
         <div className={styles.exerciseSetsNavigationWrapper}>
            <StandardBtn
               Icon={FaChevronLeft}
               text="Set"
               onClick={handleDecrementExerciseSetOrder}
               disabled={currentCompletedExerciseSetOrder < 2}
            />
            <StandardBtn
               Icon={
                  currentCompletedExerciseSet?.wasCompleted
                     ? FaChevronRight
                     : FaCheck
               }
               text="Set"
               onClick={handleIncrementExerciseSetOrder}
               disabled={
                  currentCompletedExercise &&
                  currentCompletedExerciseSetOrder >
                     currentCompletedExercise.completedExerciseSets.length
               }
            />
         </div>
         <CompletedExerciseSetsTable />
      </div>
   );
}
