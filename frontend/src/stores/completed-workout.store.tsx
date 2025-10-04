import { create } from "zustand";
import type { CompletedWorkoutType } from "../types/completed-workout.types";

interface CompletedWorkoutStoreType {
   completedWorkout: CompletedWorkoutType | null;
   currentCompletedExerciseOrder: number;
   currentCompletedExerciseSetOrder: number;
   setCompletedWorkout: (completedWorkout: CompletedWorkoutType) => void;
}

export const useCompletedWorkoutStore = create<CompletedWorkoutStoreType>(
   (set) => ({
      completedWorkout: null,
      currentCompletedExerciseOrder: 1,
      currentCompletedExerciseSetOrder: 1,

      setCompletedWorkout: (completedWorkout) => set({ completedWorkout }),
   })
);
