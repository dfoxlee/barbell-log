import { create } from "zustand";
import type { WorkoutType } from "../types/workoutTypes";

export interface WorkoutCompositionStoreProps {
   workoutComposition: WorkoutType;
   workoutCompositionLoading: boolean;
   workoutCompositionError: string | null;
   currentExerciseViewOrder: number;
   currentExerciseSetViewOrder: number;
}

export const useWorkoutCompositionStore = create<WorkoutCompositionStoreProps>(
   () => ({
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
   })
);
