import { create } from "zustand";
import type { CompletedWorkoutType } from "../types/completedWorkoutTypes";

export interface CompletedWorkoutsStoreType {
   completedWorkouts: CompletedWorkoutType;
   completedWorkoutsDataState: {
      take: number;
      skip: number;
   };
   completedWorkoutsLoading: boolean;
   completedWorkoutsError: string | null;
   getCompletedWorkouts: ({ token }: { token: string }) => Promise<void>;
}

export const useWorkoutsStore = create(() => ({
   completedWorkouts: {},
   completedWorkoutsDataState: {
      take: 10,
      skip: 0,
   },
   completedWorkoutsLoading: false,
   completedWorkoutsError: null,
   getCompletedWorkouts: async ({ token }: { token: string }) => {},
}));
