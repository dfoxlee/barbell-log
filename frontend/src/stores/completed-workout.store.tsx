import { create } from "zustand";
import type { CompletedWorkoutType } from "../types/completed-workout.types";

interface CompletedWorkoutStoreType {
   completedWorkout: CompletedWorkoutType | null;
   completedWorkouts: CompletedWorkoutType[] | null;
   currentCompletedExerciseOrder: number;
   currentCompletedExerciseSetOrder: number;
   
   setCompletedWorkout: (completedWorkout: CompletedWorkoutType) => void;
   setCompletedWorkouts: (completedWorkouts: CompletedWorkoutType[]) => void;
   setCurrentCompletedExerciseOrder: (
      currentCompletedExerciseOrder: number
   ) => void;
   setCurrentCompletedExerciseSetOrder: (
      currentCompletedExerciseSetOrder: number
   ) => void;
   resetCompletedWorkout: () => void;
}

export const useCompletedWorkoutStore = create<CompletedWorkoutStoreType>(
   (set) => ({
      completedWorkout: null,
      completedWorkouts: null,
      currentCompletedExerciseOrder: 1,
      currentCompletedExerciseSetOrder: 1,

      setCompletedWorkout: (completedWorkout) => set({ completedWorkout }),

      setCompletedWorkouts: (completedWorkouts) => set({ completedWorkouts }),

      setCurrentCompletedExerciseOrder: (currentCompletedExerciseOrder) =>
         set({ currentCompletedExerciseOrder }),

      setCurrentCompletedExerciseSetOrder: (currentCompletedExerciseSetOrder) =>
         set({
            currentCompletedExerciseSetOrder,
         }),

      resetCompletedWorkout: () =>
         set({
            completedWorkout: null,
            currentCompletedExerciseOrder: 1,
            currentCompletedExerciseSetOrder: 1,
         }),
   })
);
