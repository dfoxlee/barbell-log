import { exercises } from "../enums/constants";
import { arrayMove } from "@dnd-kit/sortable";

const initialCompositionState = {
   workoutId: null,
   workoutName: "",
   exercises: [
      {
         exerciseOrder: 1,
         exerciseName: "",
         sets: [
            {
               setOrder: 1,
               reps: 0,
               weight: 0,
            },
         ],
      },
   ],
};

const workoutCompositionReducer = (state, action) => {
   switch (action.type) {
      case "UPDATE-WORKOUT": {
         const newState = {
            ...action.payload,
         };

         const sortedExercises = newState.exercises.sort(
            (a, b) => a.exerciseOrder - b.exerciseOrder
         );

         const sortedSetsExercises = sortedExercises.map((exercise) => {
            exercise.sets.sort((a, b) => a.setOrder - b.setOrder);
            return exercise;
         });

         return { ...newState, exercises: sortedSetsExercises };
      }

      case "UPDATE-WORKOUT-NAME": {
         const newState = {
            ...state,
            workoutName: action.payload,
         };

         return newState;
      }

      case "NEW-EXERCISE": {
         const newExercise = {
            exerciseOrder: state.exercises.length + 1,
            exerciseName: "",
            sets: [
               {
                  setOrder: 1,
                  reps: 0,
                  weight: 0,
               },
            ],
         };

         const newState = {
            ...state,
            exercises: [...state.exercises, newExercise],
         };

         return newState;
      }

      case "UPDATE-EXERCISE": {
         const exerciseToUpdate = action.payload;

         const updatedExercises = state.exercises.map((exercise) => {
            if (exercise.exerciseOrder === exerciseToUpdate.exerciseOrder) {
               return {
                  ...exercise,
                  ...exerciseToUpdate,
               };
            }

            return exercise;
         });

         const newState = {
            ...state,
            exercises: updatedExercises,
         };

         return newState;
      }

      case "MOVE-EXERCISE": {
         const { dragExerciseOrder, hoverExerciseOrder } = action.payload;

         // console.log("drag", dragExerciseOrder, "hover", hoverExerciseOrder);

         const currentExercises = [...state.exercises];

         // console.log("current", currentExercises);

         const updatedExercises = arrayMove(
            currentExercises,
            dragExerciseOrder - 1,
            hoverExerciseOrder - 1
         );

         const reorderedExercises = updatedExercises.map((exercise, index) => ({
            ...exercise,
            exerciseOrder: index + 1,
         }));

         // console.log("updated", updatedExercises);
         // console.log("reordered", reorderedExercises);

         const newState = {
            ...state,
            exercises: reorderedExercises,
         };

         return newState;
      }

      case "DELETE-EXERCISE": {
         const exerciseOrderToDelete = action.payload;

         const updatedExercises = state.exercises.filter(
            (exercise) => exercise.exerciseOrder !== exerciseOrderToDelete
         );

         const newState = {
            ...state,
            exercises: updatedExercises.map((exercise, index) => ({
               ...exercise,
               exerciseOrder: index + 1,
            })),
         };

         return newState;
      }

      case "RESET-WORKOUT": {
         return initialCompositionState;
      }

      default:
         return state;
   }
};

export { initialCompositionState, workoutCompositionReducer };
