import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useWorkoutCompositionContext } from "../../hooks/useWorkoutCompositionContext";
import ExerciseComposition from "./components/ExerciseComposition";
import Seperator from "../shared/Seperator";
import ReorderExercise from "./components/ReorderExercise";
import { useAuthContext } from "../../hooks/useAuthContext";
import { fetchGetWorkout } from "../../services/workoutServices";
import {
   verticalListSortingStrategy,
   SortableContext,
} from "@dnd-kit/sortable";
import ReorderExerciseWrapper from "./components/ReorderExerciseWrapper";

import styles from "./WorkoutComposition.module.css";

export default function WorkoutComposition() {
   const { workoutCompositionState, workoutCompositionDispatch } =
      useWorkoutCompositionContext();
   const params = useParams();
   const [isReorderExercise, setIsReorderExercise] = useState(false);
   const { user } = useAuthContext();
   const compositionType = params["composition-type"];
   const workoutId = params["workout-id"];

   useEffect(() => {
      const getEditingWorkout = async () => {
         try {
            const req = await fetchGetWorkout({ token: user.token, workoutId });

            workoutCompositionDispatch({
               type: "UPDATE-WORKOUT",
               payload: req,
            });
         } catch (error) {
            console.error(error);
            return alert("Something went wrong. Try again later.");
         }
      };
      if (compositionType === "edit") {
         getEditingWorkout();
      }
   }, [compositionType, user.token, workoutId, workoutCompositionDispatch]);

   const handleWorkoutNameInput = (event) => {
      workoutCompositionDispatch({
         type: "UPDATE-WORKOUT-NAME",
         payload: event.target.value,
      });
   };

   const handleCreateExerciseClick = () => {
      workoutCompositionDispatch({
         type: "NEW-EXERCISE",
      });
   };

   const handleReorderExerciseClick = () => {
      return setIsReorderExercise((prev) => !prev);
   };

   return (
      <div className={styles.container}>
         <input
            className={styles.workoutNameInput}
            type="text"
            placeholder="workout name..."
            onChange={handleWorkoutNameInput}
            value={workoutCompositionState.workoutName}
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
         ) : (
            workoutCompositionState.exercises.map((exercise) => (
               <ExerciseComposition
                  key={exercise.exerciseOrder}
                  exercise={exercise}
               />
            ))
         )}
         <button
            className={styles.addExerciseBtn}
            onClick={handleCreateExerciseClick}
         >
            <FaPlusCircle className={styles.addExerciseIcon} />
            <span className={styles.addExerciseText}>Exercise</span>
         </button>
      </div>
   );
}
