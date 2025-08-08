import { useMemo, useState } from "react";
import {
   FaChevronLeft,
   FaChevronRight,
   FaPlus,
   FaPlusCircle,
   FaTrashAlt,
} from "react-icons/fa";
import toastify from "../../../utils/toastify";
import { useWorkoutCompositionStore } from "../../../stores/workoutCompositionStore";
import ExerciseSetsGrid from "./ExerciseSetsGrid";

import styles from "./ExerciseComposition.module.css";

export default function ExerciseComposition() {
   const [viewAllExerciseSets, setViewAllExerciseSets] = useState(false);
   const workoutComposition = useWorkoutCompositionStore(
      (state) => state.workoutComposition
   );
   const currentExerciseViewOrder = useWorkoutCompositionStore(
      (state) => state.currentExerciseViewOrder
   );
   const updateExercise = useWorkoutCompositionStore(
      (state) => state.updateExercise
   );
   const updateCurrentExerciseViewOrder = useWorkoutCompositionStore(
      (state) => state.updateCurrentExerciseViewOrder
   );
   const updateCurrentExerciseSetViewOrder = useWorkoutCompositionStore(
      (state) => state.updateCurrentExerciseSetViewOrder
   );
   const updateWorkoutComposition = useWorkoutCompositionStore(
      (state) => state.updateWorkoutComposition
   );
   const incrementExerciseViewOrder = useWorkoutCompositionStore(
      (state) => state.incrementExerciseViewOrder
   );
   const decrementExerciseViewOrder = useWorkoutCompositionStore(
      (state) => state.decrementExerciseViewOrder
   );
   const currentExercise = useMemo(() => {
      return workoutComposition.exercises.find(
         (exercise) => exercise.exerciseOrder === currentExerciseViewOrder
      );
   }, [currentExerciseViewOrder, workoutComposition.exercises]);
   const latestExerciseOrder = useMemo(() => {
      return workoutComposition.exercises.reduce((prev, curr) =>
         curr.exerciseOrder > prev.exerciseOrder ? curr : prev
      ).exerciseOrder;
   }, [workoutComposition.exercises]);

   const handleAddSetClick = () => {
      if (currentExercise?.exerciseSets) {
         const latestSet = {
            ...currentExercise.exerciseSets[
               currentExercise.exerciseSets.length - 1
            ],
         };

         const newExerciseSetOrder = latestSet.exerciseSetOrder + 1;

         delete latestSet.exerciseSetId;

         const updatedExerciseSets = [
            ...currentExercise.exerciseSets,
            {
               ...latestSet,
               exerciseSetOrder: newExerciseSetOrder,
            },
         ];

         const updatedExercise = {
            ...currentExercise,
            exerciseSets: updatedExerciseSets,
         };

         updateExercise(updatedExercise);
         updateCurrentExerciseSetViewOrder(newExerciseSetOrder);
         if (viewAllExerciseSets) {
            toggleViewAllExerciseSets();
         }
      }
   };

   const handleExerciseDecrementClick = () => {
      decrementExerciseViewOrder();
   };

   const handleExerciseIncrementClick = () => {
      incrementExerciseViewOrder();
   };

   const handleExerciseNameInput = (event) => {
      if (currentExercise) {
         updateExercise({
            ...currentExercise,
            exerciseName: event.target.value,
         });
      }
   };

   const toggleViewAllExerciseSets = () => {
      setViewAllExerciseSets((prev) => !prev);
   };

   const handleDeleteExerciseClick = () => {
      if (workoutComposition.exercises.length === 1) {
         return toastify({
            message: "There must be at least one exercies per workout.",
            type: "warning",
         });
      }

      if (currentExercise) {
         const updatedExercises = workoutComposition.exercises
            .filter(
               (exercise) =>
                  exercise.exerciseOrder !== currentExercise?.exerciseOrder
            )
            .map((exercise, index) => ({
               ...exercise,
               exerciseOrder: index + 1,
            }));

         const updatedWorkoutComposition = {
            ...workoutComposition,
            exercises: updatedExercises,
         };

         const newCurrentExerciseViewOrder =
            updatedExercises[updatedExercises.length - 1].exerciseOrder;

         updateWorkoutComposition(updatedWorkoutComposition);
         updateCurrentExerciseViewOrder(newCurrentExerciseViewOrder);
      }
   };

   return (
      <div className={styles.container}>
         <div className={styles.exerciseTitleWrapper}>
            <h3
               className={`subTitle`}
            >{`Exercise ${currentExerciseViewOrder} / ${workoutComposition.exercises.length}`}</h3>
            {workoutComposition.exercises.length > 1 ? (
               <button
                  className={`standardIconBtn ${styles.deleteExerciseBtn}`}
                  onClick={handleDeleteExerciseClick}
               >
                  <FaTrashAlt />
               </button>
            ) : null}
         </div>
         <div className={styles.exerciseNameInputWrapper}>
            <button
               className={`standardIconBtn ${
                  currentExerciseViewOrder === 1
                     ? `${styles.changeExerciseBtnDisabled} ${styles.changeExerciseBtn}`
                     : styles.changeExerciseBtn
               }`}
               onClick={handleExerciseDecrementClick}
               disabled={currentExerciseViewOrder === 1 ? true : false}
            >
               <FaChevronLeft />
            </button>
            <input
               type="text"
               className={`standardInput ${styles.exerciseNameInput}`}
               placeholder="Exercise name..."
               onChange={handleExerciseNameInput}
               value={currentExercise?.exerciseName}
            />
            <button
               className={`standardIconBtn ${styles.changeExerciseBtn}`}
               onClick={handleExerciseIncrementClick}
            >
               {latestExerciseOrder === currentExercise?.exerciseOrder ? (
                  <FaPlusCircle />
               ) : (
                  <FaChevronRight />
               )}
            </button>
         </div>
         {currentExercise ? (
            <ExerciseSetsGrid
               currentExercise={currentExercise}
               viewAllExerciseSets={viewAllExerciseSets}
               toggleViewAllExerciseSets={toggleViewAllExerciseSets}
            />
         ) : null}
         <div className={styles.exerciseOptionsWrapper}>
            <button
               className={`standardBtn ${styles.addSetBtn}`}
               onClick={handleAddSetClick}
            >
               <FaPlus />
               <span>Set</span>
            </button>
            <button
               className={`standardBtn ${styles.addExerciseBtn}`}
               onClick={handleExerciseIncrementClick}
            >
               <span>Exercise</span>
               {latestExerciseOrder === currentExercise?.exerciseOrder ? (
                  <FaPlusCircle />
               ) : (
                  <FaChevronRight />
               )}
            </button>
         </div>
      </div>
   );
}
