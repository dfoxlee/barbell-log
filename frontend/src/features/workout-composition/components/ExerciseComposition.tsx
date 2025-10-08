import {
   FaChevronLeft,
   FaChevronRight,
   FaPlus,
   FaPlusCircle,
   FaTrash,
} from "react-icons/fa";
import { useWorkoutStore } from "../../../stores/workout.store";

import styles from "./ExerciseComposition.module.css";
import { useMemo, type ChangeEvent } from "react";
import ExerciseSetsGrid from "./ExerciseSetsTable";
import StandardIconBtn from "../../shared/StandardIconBtn";
import StandardBtn from "../../shared/StandardBtn";
import ExerciseNameInput from "../../shared/ExerciseNameInput";
import type { ExerciseSetType } from "../../../types/exercise-set.types";
import { useModalsStore } from "../../../stores/modals.store";

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
   const incrementCurrentExerciseOrder = useWorkoutStore(
      (state) => state.incrementCurrentExerciseOrder
   );
   const decrementCurrentExerciseOrder = useWorkoutStore(
      (state) => state.decrementCurrentExerciseOrder
   );
   const setCurrentExerciseOrder = useWorkoutStore(
      (state) => state.setCurrentExerciseOrder
   );
   const addExercise = useWorkoutStore((state) => state.addExercise);
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

   const handleExerciseDecrementClick = () => {
      decrementCurrentExerciseOrder();
   };

   const handleExerciesIncrementClick = () => {
      incrementCurrentExerciseOrder();
   };

   const handleAddExerciseClick = () => {
      addExercise();
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
      });

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

   const handleExerciseNameChange = (value: string) => {
      const updatedExercise = {
         ...currentExercise,
         exerciseName: value,
      };

      const updatedExercises = workoutComposition?.exercises.map((exercise) =>
         exercise.exerciseOrder === currentExerciseOrder
            ? updatedExercise
            : exercise
      );

      if (!updatedExercises) return;

      setWorkoutComposition({
         ...workoutComposition,
         exercises: updatedExercises,
      });
   };

   const handleAddExerciseSetClick = () => {
      const currentExercise = workoutComposition?.exercises.find(
         (e) => e.exerciseOrder === currentExerciseOrder
      );
      const copyExerciseSet =
         currentExercise.exerciseSets[currentExercise?.exerciseSets.length - 1];

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
      });
   };

   const handleExerciseOrderChange = (
      event: ChangeEvent<HTMLSelectElement>
   ) => {
      setCurrentExerciseOrder(parseInt(event.target.value));
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
      });
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
      });
   };

   return (
      <>
         <div className={styles.header}>
            {currentExerciseOrder > 1 ? (
               <StandardIconBtn
                  Icon={FaChevronLeft}
                  onClick={handleExerciseDecrementClick}
               />
            ) : null}
            <select
               className={styles.exerciseSelector}
               name="exercises"
               id="exercises"
               value={currentExerciseOrder}
               onChange={handleExerciseOrderChange}
            >
               {workoutComposition?.exercises.map((exercise) => (
                  <option
                     key={exercise.exerciseOrder}
                     value={exercise.exerciseOrder}
                  >
                     {exercise.exerciseName.length
                        ? exercise.exerciseName
                        : `Exercise ${exercise.exerciseOrder}`}
                  </option>
               ))}
            </select>
            {workoutComposition?.exercises &&
            currentExerciseOrder < workoutComposition?.exercises.length ? (
               <StandardIconBtn
                  Icon={FaChevronRight}
                  onClick={handleExerciesIncrementClick}
               />
            ) : (
               <StandardBtn
                  text="Exercise"
                  Icon={FaPlus}
                  onClick={handleAddExerciseClick}
               />
            )}
         </div>
         <div className={styles.exerciseNameWrapper}>
            <ExerciseNameInput
               value={
                  workoutComposition?.exercises.find(
                     (exercise) =>
                        exercise.exerciseOrder === currentExerciseOrder
                  )?.exerciseName ?? ""
               }
               onChange={handleExerciseNameChange}
            />
            {workoutComposition?.exercises &&
            workoutComposition?.exercises.length > 1 ? (
               <StandardBtn
                  Icon={FaTrash}
                  text="Exercise"
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
