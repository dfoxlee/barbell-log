import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import ExerciseComposition from "./components/ExerciseComposition";
import Seperator from "../shared/Seperator";
import ReorderExercise from "./components/ReorderExercise";
import { useUserStore } from "../../stores/userStore";
import {
   verticalListSortingStrategy,
   SortableContext,
} from "@dnd-kit/sortable";
import ReorderExerciseWrapper from "./components/ReorderExerciseWrapper";

import styles from "./WorkoutComposition.module.css";
import { useWorkoutCompositionStore } from "../../stores/workoutCompositionStore";

export default function WorkoutComposition() {
   const params = useParams();
   const compositionType = params["composition-type"];
   const workoutId = params["workout-id"];
   const [isReorderExercise, setIsReorderExercise] = useState(false);
   const user = useUserStore((state) => state.user);
   const workoutComposition = useWorkoutCompositionStore(
      (state) => state.workoutComposition
   );

   useEffect(() => {}, [compositionType, user?.token, workoutId]);

   const handleWorkoutNameInput = (event) => {};

   const handleCreateExerciseClick = () => {};

   const handleReorderExerciseClick = () => {
      return setIsReorderExercise((prev) => !prev);
   };

   return (
      <div className={styles.container}>
         <input
            className={styles.workoutNameInput}
            type="text"
            placeholder="workout name..."
         />
         <button
            className={styles.reorderExerciseBtn}
            onClick={handleReorderExerciseClick}
         >
            {isReorderExercise ? `Break-out Sets` : `Reorder Exercises`}
         </button>
         <Seperator />
         {isReorderExercise ? (
            <ReorderExerciseWrapper>
               <SortableContext
                  items={workoutComposition.exercises.map(
                     (exercise) => exercise.exerciseOrder
                  )}
                  strategy={verticalListSortingStrategy}
               >
                  {workoutComposition.exercises.map((exercise) => (
                     <ReorderExercise
                        key={exercise.exerciseOrder}
                        id={exercise.exerciseOrder}
                        exercise={exercise}
                     />
                  ))}
               </SortableContext>
            </ReorderExerciseWrapper>
         ) : (
            <ExerciseComposition />
         )}
      </div>
   );
}
