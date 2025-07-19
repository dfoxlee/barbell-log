import { create } from "zustand";
import type { ExerciseType, WorkoutType } from "../types/workoutTypes";
import { exercises } from "../enums/constants";

export interface WorkoutCompositionStoreProps {
   workoutComposition: WorkoutType;
   workoutCompositionLoading: boolean;
   workoutCompositionError: string | null;
   currentExerciseViewOrder: number;
   currentExerciseSetViewOrder: number;
   updateExercise: (updatedExercise: ExerciseType) => void;
}

export const useWorkoutCompositionStore = create<WorkoutCompositionStoreProps>(
   (set) => ({
      workoutComposition: {
         workoutName: "",
         exercises: [
            {
               exerciseOrder: 1,
               exerciseName: "",
               exerciseSets: [
                  {
                     exerciseSetOrder: 1,
                     isTimed: false,
                     isDistance: false,
                     isWarmup: false,
                     hasReps: true,
                     reps: 0,
                     weight: 0,
                     weightUnit: "lb",
                     hr: 0,
                     min: 0,
                     sec: 0,
                     distance: 0,
                     distanceUnit: "mi",
                  },
               ],
            },
         ],
      },
      workoutCompositionLoading: false,
      workoutCompositionError: null,
      currentExerciseViewOrder: 1,
      currentExerciseSetViewOrder: 1,
      updateExercise: (updatedExercise: ExerciseType) => {
         set(({ workoutComposition }) => {
            const updatedExercises = [...workoutComposition.exercises];

            const indexOfUpdatedExercise = updatedExercises.findIndex(
               (exercise) =>
                  exercise.exerciseOrder === updatedExercise.exerciseOrder
            );

            if (indexOfUpdatedExercise === -1) {
               return {
                  workoutComposition,
               };
            }

            updatedExercises.splice(indexOfUpdatedExercise, 1, updatedExercise);

            const updatedWorkoutComposition = {
               ...workoutComposition,
               exercises: updatedExercises,
            };

            return {
               workoutComposition: updatedWorkoutComposition,
            };
         });
      },
   })
);
