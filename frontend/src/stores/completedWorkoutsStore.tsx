import { create } from "zustand";
import type { CompletedWorkoutType } from "../types/completedWorkoutTypes";

export interface CompletedWorkoutsStoreType {
   completedWorkouts: CompletedWorkoutType;
}

export const useWorkoutsStore = create(() => ({
   completedWorkouts: {},
}));
