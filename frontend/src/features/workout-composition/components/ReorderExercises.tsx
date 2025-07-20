import {
   SortableContext,
   verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ReorderExerciseWrapper from "./ReorderExerciseWrapper";
import { useWorkoutCompositionStore } from "../../../stores/workoutCompositionStore";
import ReorderExercise from "./ReorderExercise";

import styles from "./ReorderExercises.module.css";

export default function ReorderExercises() {
   const workoutCompsition = useWorkoutCompositionStore(
      (state) => state.workoutComposition
   );

   return (
      <ReorderExerciseWrapper>
         <SortableContext
            items={workoutCompsition.exercises.map(
               (exercise) => exercise.exerciseOrder
            )}
            strategy={verticalListSortingStrategy}
         >
            {workoutCompsition.exercises.map((exercise) => (
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
