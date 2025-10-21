import { FaPencilAlt, FaTrash } from "react-icons/fa";
import type { ExerciseType } from "../../../types/exercise.types";
import StandardIconBtn from "../../shared/StandardIconBtn";
import { useWorkoutStore } from "../../../stores/workout.store";
import { useModalsStore } from "../../../stores/modals.store";

import styles from "./ExerciseOverview.module.css";
import type { WorkoutType } from "../../../types/workout.types";

export default function ExerciseOverview({
   exercise,
}: {
   exercise: ExerciseType;
}) {
   const setCurrentExerciseOrder = useWorkoutStore(
      (state) => state.setCurrentExerciseOrder
   );
   const currentExerciseOrder = useWorkoutStore(
      (state) => state.currentExerciseOrder
   );
   const workoutComposition = useWorkoutStore(
      (state) => state.workoutComposition
   );
   const setWorkoutComposition = useWorkoutStore(
      (state) => state.setWorkoutComposition
   );
   const decrementCurrentExerciseOrder = useWorkoutStore(
      (state) => state.decrementCurrentExerciseOrder
   );
   const toggleShowExercisesOverview = useWorkoutStore(
      (state) => state.toggleShowExercisesOverview
   );
   const setDeleteConfirmationWindowInfo = useModalsStore(
      (state) => state.setDeleteConfirmationWindowInfo
   );

   const handleEditExerciseClick = () => {
      setCurrentExerciseOrder(exercise.exerciseOrder);
      toggleShowExercisesOverview();
   };

   const deleteExercise = () => {
      const updatedExercises = workoutComposition?.exercises.filter(
         (currentExercise) =>
            currentExercise.exerciseOrder !== exercise.exerciseOrder
      );

      if (!updatedExercises) return;

      const reOrderedExercises = updatedExercises.map(
         (currentExercise, index) => ({
            ...currentExercise,
            exerciseOrder: index + 1,
         })
      );

      const updatedWorkout = {
         ...workoutComposition,
         exercises: reOrderedExercises,
      };

      setWorkoutComposition(updatedWorkout as WorkoutType);

      if (currentExerciseOrder > 1) {
         decrementCurrentExerciseOrder();
      } else {
         setCurrentExerciseOrder(1);
      }
   };

   const handleDeleteExerciseClick = () => {
      const message = exercise?.exerciseName
         ? `Are you sure you want to delete Exercise ${currentExerciseOrder} - ${exercise.exerciseName}?`
         : `Are you sure you want to delete Exercise ${currentExerciseOrder}?`;
      setDeleteConfirmationWindowInfo({
         onCancel: () => {},
         onConfirm: deleteExercise,
         message,
      });
   };

   return (
      <div className={styles.container}>
         <div className={styles.exerciseInfo}>
            <h3 className={styles.exerciseTitle}>
               {exercise.exerciseName
                  ? exercise?.exerciseName
                  : `Exercise ${exercise.exerciseOrder}`}
            </h3>
            <p className={styles.setCount}>
               {exercise.exerciseSets.length === 1
                  ? `${exercise.exerciseSets.length} set`
                  : `${exercise.exerciseSets.length} sets`}
            </p>
         </div>
         <div className={styles.exerciseOptionBtns}>
            <StandardIconBtn
               Icon={FaPencilAlt}
               onClick={handleEditExerciseClick}
            />
            {workoutComposition?.exercises &&
            workoutComposition?.exercises.length > 1 ? (
               <StandardIconBtn
                  Icon={FaTrash}
                  theme="WARNING"
                  onClick={handleDeleteExerciseClick}
               />
            ) : null}
         </div>
      </div>
   );
}
