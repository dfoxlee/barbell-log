import { FaGripVertical, FaTrash } from "react-icons/fa";
import { useWorkoutCompositionContext } from "../../../hooks/useWorkoutCompositionContext";
import { useMemo } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import styles from "./ReorderExercise.module.css";
import type { ExerciseType } from "../../../types/workoutTypes";

export default function ReorderExercise({
   exercise,
   id,
}: {
   exercise: ExerciseType;
   id: number;
}) {
   const { workoutCompositionDispatch } = useWorkoutCompositionContext();
   const totalWeight = useMemo(() => {
      return exercise.exerciseSets.reduce(
         (acc, curr) => parseFloat(acc) + parseFloat(curr.weight),
         0
      );
   }, [exercise.exerciseSets]);
   const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });

   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
   };

   const handleExerciseNameChange = (event) => {
      const newExercise = {
         ...exercise,
         exerciseName: event.target.value,
      };

      workoutCompositionDispatch({
         type: "UPDATE-EXERCISE",
         payload: newExercise,
      });
   };

   const handleDeleteExerciseClick = () => {
      workoutCompositionDispatch({
         type: "DELETE-EXERCISE",
         payload: exercise.exerciseOrder,
      });
   };

   return (
      <div
         className={styles.wrapper}
         key={exercise.exerciseOrder}
         style={style}
      >
         <button
            className={styles.reorderBtn}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
         >
            <FaGripVertical />
         </button>
         <div className={styles.contentWrapper}>
            <input
               className={styles.exerciseNameInput}
               type="text"
               placeholder="exercise name..."
               value={exercise.exerciseName}
               onChange={handleExerciseNameChange}
            />
            <h4 className={styles.setCount}>
               Total Sets: {exercise.exerciseSets.length}
            </h4>
            <h4 className={styles.weightCount}>{totalWeight} lbs</h4>
         </div>
         <button
            className={styles.deleteBtn}
            onClick={handleDeleteExerciseClick}
         >
            <FaTrash />
         </button>
      </div>
   );
}
