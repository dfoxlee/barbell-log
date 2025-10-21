import { FaPlus, FaPlusCircle, FaTrash } from "react-icons/fa";
import { useWorkoutStore } from "../../../stores/workout.store";
import { useMemo } from "react";
import ExerciseSetsGrid from "./ExerciseSetsTable";
import StandardBtn from "../../shared/StandardBtn";
import type { ExerciseSetType } from "../../../types/exercise-set.types";
import { useModalsStore } from "../../../stores/modals.store";
import ExerciseNameInputSelector from "./ExerciseNameInputSelector";
import type { WorkoutType } from "../../../types/workout.types";
import type { ExerciseType } from "../../../types/exercise.types";

import styles from "./ExerciseComposition.module.css";

export default function ExerciseComposition() {
   const workoutComposition = useWorkoutStore(
      (state) => state.workoutComposition
   );
   const setWorkoutComposition = useWorkoutStore(
      (state) => state.setWorkoutComposition
   );
   const currentExerciseOrder = useWorkoutStore(
      (state) => state.currentExerciseOrder
   );
   const decrementCurrentExerciseOrder = useWorkoutStore(
      (state) => state.decrementCurrentExerciseOrder
   );
   const setCurrentExerciseOrder = useWorkoutStore(
      (state) => state.setCurrentExerciseOrder
   );
   const setDeleteConfirmationWindowInfo = useModalsStore(
      (state) => state.setDeleteConfirmationWindowInfo
   );

   const currentExercise = useMemo(
      () =>
         workoutComposition?.exercises.find(
            (e) => e.exerciseOrder === currentExerciseOrder
         ),
      [workoutComposition, currentExerciseOrder]
   );

   const handleAddExerciseClick = () => {
      const firstSet = currentExercise?.exerciseSets[0];
      const currentExerciseCopy = {
         ...currentExercise,
         exerciseName: "",
         exerciseSets: [
            {
               ...firstSet,
               distance: 0,
               reps: 0,
               weight: 0,
               hr: 0,
               min: 0,
               hasReps: true,
               isTimed: false,
               isDistance: false,
            },
         ],
      } as ExerciseType;

      const currentExerciseIndex =
         workoutComposition?.exercises.findIndex(
            (e) => e.exerciseOrder === currentExercise?.exerciseOrder
         ) ?? -1;

      const addExercises = workoutComposition?.exercises;

      if (!currentExerciseCopy || currentExerciseIndex < 0) return;

      addExercises?.splice(currentExerciseIndex + 1, 0, currentExerciseCopy);

      const reorderedExercises = workoutComposition?.exercises.map(
         (e, idx) => ({
            ...e,
            exerciseOrder: idx + 1,
         })
      );

      const updatedWorkout = {
         ...workoutComposition,
         exercises: reorderedExercises,
      };

      setWorkoutComposition(updatedWorkout as WorkoutType);
      setCurrentExerciseOrder(currentExerciseOrder + 1);
   };

   const deleteExercise = () => {
      const updatedExercises = workoutComposition?.exercises.filter(
         (exercise) => exercise.exerciseOrder !== currentExerciseOrder
      );

      if (!updatedExercises) return;

      const reOrderedExercises = updatedExercises.map((exercise, index) => ({
         ...exercise,
         exerciseOrder: index + 1,
      }));

      setWorkoutComposition({
         ...workoutComposition,
         exercises: reOrderedExercises,
      } as WorkoutType);

      if (currentExerciseOrder > 1) {
         decrementCurrentExerciseOrder();
      } else {
         setCurrentExerciseOrder(1);
      }
   };

   const handleDeleteExerciseClick = () => {
      const message = currentExercise?.exerciseName
         ? `Are you sure you want to delete Exercise ${currentExerciseOrder} - ${currentExercise.exerciseName}?`
         : `Are you sure you want to delete Exercise ${currentExerciseOrder}?`;
      setDeleteConfirmationWindowInfo({
         onCancel: () => {},
         onConfirm: deleteExercise,
         message,
      });
   };

   const handleAddExerciseSetClick = () => {
      const currentExercise = workoutComposition?.exercises.find(
         (e) => e.exerciseOrder === currentExerciseOrder
      );
      const copyExerciseSet =
         currentExercise?.exerciseSets[
            currentExercise?.exerciseSets.length - 1
         ];

      if (!copyExerciseSet || !currentExercise) return;

      const maxExerciseSetOrder = currentExercise.exerciseSets.reduce(
         (max, set) =>
            set.exerciseSetOrder > max ? set.exerciseSetOrder : max,
         0
      );

      const newExerciseSet = {
         ...copyExerciseSet,
         exerciseSetOrder: maxExerciseSetOrder + 1,
      };

      const updatedExercise = {
         ...currentExercise,
         exerciseSets: [...currentExercise.exerciseSets, newExerciseSet],
      };

      const updatedExercises = workoutComposition?.exercises.map((exercise) =>
         exercise.exerciseOrder === currentExercise.exerciseOrder
            ? updatedExercise
            : exercise
      );

      if (!updatedExercises) return;

      setWorkoutComposition({
         ...workoutComposition,
         exercises: updatedExercises,
      } as WorkoutType);
   };

   const updateExerciseSet = (updatedSet: ExerciseSetType) => {
      const currentExercise = workoutComposition?.exercises.find(
         (e) => e.exerciseOrder === currentExerciseOrder
      );

      if (!currentExercise) return;

      const updatedExerciseSets = currentExercise.exerciseSets.map((set) =>
         set.exerciseSetOrder === updatedSet.exerciseSetOrder ? updatedSet : set
      );

      const updatedExercise = {
         ...currentExercise,
         exerciseSets: updatedExerciseSets,
      };

      const updatedExercises = workoutComposition?.exercises.map((exercise) =>
         exercise.exerciseOrder === currentExercise.exerciseOrder
            ? updatedExercise
            : exercise
      );

      if (!updatedExercises) return;

      setWorkoutComposition({
         ...workoutComposition,
         exercises: updatedExercises,
      } as WorkoutType);
   };

   const deleteExerciseSet = (exerciseSetOrder: number) => {
      const currentExercise = workoutComposition?.exercises.find(
         (e) => e.exerciseOrder === currentExerciseOrder
      );

      if (!currentExercise) return;

      const updatedExerciseSets = currentExercise.exerciseSets.filter(
         (set) => set.exerciseSetOrder !== exerciseSetOrder
      );

      const reOrderedExerciseSets = updatedExerciseSets.map((set, index) => ({
         ...set,
         exerciseSetOrder: index + 1,
      }));

      const updatedExercise = {
         ...currentExercise,
         exerciseSets: reOrderedExerciseSets,
      };

      const updatedExercises = workoutComposition?.exercises.map((exercise) =>
         exercise.exerciseOrder === currentExercise.exerciseOrder
            ? updatedExercise
            : exercise
      );

      if (!updatedExercises) return;

      setWorkoutComposition({
         ...workoutComposition,
         exercises: updatedExercises,
      } as WorkoutType);
   };

   return (
      <>
         <div className={styles.header}>
            <ExerciseNameInputSelector />
            <StandardBtn
               text="Exercise"
               Icon={FaPlus}
               onClick={handleAddExerciseClick}
            />
            {workoutComposition?.exercises &&
            workoutComposition?.exercises.length > 1 ? (
               <StandardBtn
                  Icon={FaTrash}
                  text="Exercise"
                  theme="WARNING"
                  onClick={handleDeleteExerciseClick}
               />
            ) : null}
         </div>
         {currentExercise?.exerciseSets && (
            <ExerciseSetsGrid
               exerciseSets={currentExercise?.exerciseSets}
               updateExerciseSet={updateExerciseSet}
               deleteExerciseSet={deleteExerciseSet}
            />
         )}
         <div className={styles.addExerciseSetBtnWrapper}>
            <StandardBtn
               text="Set"
               Icon={FaPlusCircle}
               onClick={handleAddExerciseSetClick}
            />
         </div>
      </>
   );
}
