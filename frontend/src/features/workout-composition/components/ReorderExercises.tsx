import { SortableContext } from "@dnd-kit/sortable";
import styles from "./ReorderExercises.module.css";
import ReorderExerciseWrapper from "./ReorderExerciseWrapper";

export default function ReorderExercises() {
   return (
      <ReorderExerciseWrapper>
         <SortableContext
            items={workoutCompositionState.exercises.map(
               (exercise) => exercise.exerciseOrder
            )}
            strategy={verticalListSortingStrategy}
         >
            {workoutCompositionState.exercises.map((exercise) => (
               <ReorderExercise
                  key={exercise.exerciseOrder}
                  id={exercise.exerciseOrder}
                  exercise={exercise}
               />
            ))}
         </SortableContext>
      </ReorderExerciseWrapper>
   );
}
