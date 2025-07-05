import { arrayMove } from "@dnd-kit/sortable";

const initialBarbellLog = {
   workoutId: "",
   workoutName: "",
   createdDate: "",
   completedExercises: [],
   currentExercise: 1,
   currentSet: 1,
};

const barbellLogReducer = (state, action) => {
   switch (action.type) {
      case "UPDATE-WORKOUT": {
         const workoutId = action.payload.workoutId;
         const completedWorkoutId = action.payload.completedWorkoutId;
         const workoutName = action.payload.workoutName;

         if (completedWorkoutId) {
            return {
               ...state,
               ...action.payload,
            };
         }

         const exercises = action.payload.exercises;

         const completedExercises = exercises.map((exercise) => {
            const sets = exercise.sets;

            const completedSets = sets.map((set) => ({
               exerciseSetId: set.exerciseSetId,
               completedWeight: set.weight,
               completedReps: set.reps,
               setOrder: set.setOrder,
               isComplete: set.isComplete || false,
               notes: set.notes || "",
            }));

            completedSets.sort((a, b) => a.setOrder - b.setOrder);

            return {
               exerciseId: exercise.exerciseId,
               exerciseName: exercise.exerciseName,
               completedExerciseOrder: exercise.exerciseOrder,
               completedSets,
            };
         });

         completedExercises.sort(
            (a, b) => a.completedExerciseOrder - b.completedExerciseOrder
         );

         const newWorkout = {
            workoutId,
            workoutName,
            completedExercises,
            currentExercise: 1,
            currentSet: 1,
         };

         return newWorkout;
      }

      case "SKIP-TO-EXERCISE": {
         const newCurrentExercise = action.payload;

         const newCurrentSet = 1;

         return {
            ...state,
            currentExercise: newCurrentExercise,
            currentSet: newCurrentSet,
         };
      }

      case "SKIP-TO-SET": {
         const newCurrentSet = action.payload;

         return {
            ...state,
            currentSet: newCurrentSet,
         };
      }

      case "MOVE-EXERCISE": {
         const { dragExerciseOrder, hoverExerciseOrder } = action.payload;

         const currentExercises = [...state.completedExercises];

         const updatedExercises = arrayMove(
            currentExercises,
            dragExerciseOrder - 1,
            hoverExerciseOrder - 1
         );

         const reorderedExercises = updatedExercises.map((exercise, index) => ({
            ...exercise,
            exerciseOrder: index + 1,
         }));

         const newState = {
            ...state,
            completedExercises: reorderedExercises,
         };

         return newState;
      }

      case "UPDATE-SET": {
         const updatedSet = action.payload;

         const updatedExercise = state.completedExercises.find(
            (exercise) =>
               exercise.completedExerciseOrder === state.currentExercise
         );

         if (!updatedExercise) {
            return state;
         }

         const updatedSets = updatedExercise.completedSets.map((set) => {
            if (set.setOrder === updatedSet.setOrder) {
               return {
                  ...set,
                  ...updatedSet,
               };
            }
            return set;
         });

         const updatedExercises = state.completedExercises.map((exercise) => {
            if (exercise.completedExerciseOrder === state.currentExercise) {
               return {
                  ...exercise,
                  completedSets: updatedSets,
               };
            }
            return exercise;
         });

         return {
            ...state,
            completedExercises: updatedExercises,
         };
      }

      case "ADD-SET": {
         const updatedExercise = state.completedExercises.find(
            (exercise) => exercise.completedExerciseOrder === action.payload
         );

         const newSet =
            updatedExercise.completedSets[
               updatedExercise.completedSets.length - 1
            ];

         const newSetOrder = newSet.setOrder + 1;

         updatedExercise.completedSets.push({
            ...newSet,
            setOrder: newSetOrder,
            isComplete: false,
         });

         const updatedExercises = state.completedExercises.map((exercise) => {
            if (
               exercise.completedExerciseOrder ===
               updatedExercise.completedExerciseOrder
            ) {
               return {
                  ...updatedExercise,
               };
            }

            return exercise;
         });

         return {
            ...state,
            completedExercises: updatedExercise,
            currentSet: newSetOrder,
         };
      }

      case "DELETE-SET": {
         const setOrderToDelete = action.payload;
         const updatedExercise = state.completedExercises.find(
            (exercise) =>
               exercise.completedExerciseOrder === state.currentExercise
         );

         if (!updatedExercise) {
            return state;
         }

         const updatedSets = updatedExercise.completedSets.filter(
            (set) => set.setOrder !== setOrderToDelete
         );

         const updatedExercises = state.completedExercises.map((exercise) => {
            if (
               exercise.completedExerciseOrder ===
               updatedExercise.completedExerciseOrder
            ) {
               return {
                  ...updatedExercise,
                  completedSets: [
                     ...updatedSets.map((set, index) => ({
                        ...set,
                        setOrder: index + 1,
                     })),
                  ],
               };
            }
            return exercise;
         });

         return {
            ...state,
            completedExercises: updatedExercises,
            currentSet: Math.max(1, state.currentSet - 1),
         };
      }

      default:
         return state;
   }
};

export { initialBarbellLog, barbellLogReducer };
