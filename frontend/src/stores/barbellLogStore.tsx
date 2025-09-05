import { create } from "zustand";
import {
   fetchGetCompletedWorkout,
   fetchGetNewCompletedWorkout,
} from "../services/completedWorkoutServices";
import type { CompletedWorkoutType } from "../types/completedWorkoutTypes";

export interface BarbellLogStoreType {
   barbellLog: CompletedWorkoutType | null;
   barbellLogLoading: boolean;
   barbellLogError: string | null;
   getBarbellLog: ({
      token,
      workoutId,
      completedWorkoutId,
   }: {
      token: string;
      workoutId: string;
      completedWorkoutId?: string;
   }) => Promise<void>;
   updateBarbellLog: (updatedBarbellLog: CompletedWorkoutType) => void;
}

export const useBarbellLogStore = create<BarbellLogStoreType>((set) => ({
   barbellLog: null,
   barbellLogLoading: false,
   barbellLogError: null,

   getBarbellLog: async ({
      token,
      workoutId,
      completedWorkoutId,
   }: {
      token: string;
      workoutId: string;
      completedWorkoutId?: string;
   }) => {
      set({ barbellLogLoading: true, barbellLogError: null });

      try {
         if (completedWorkoutId) {
            const request = await fetchGetCompletedWorkout({
               token,
               completedWorkoutId,
            });

            set({
               barbellLog: {
                  ...request.completedWorkout,
                  currentExerciseOrder: 1,
               },
            });
         } else {
            const request = await fetchGetNewCompletedWorkout({
               token,
               workoutId,
            });

            set({
               barbellLog: {
                  ...request.completedWorkout,
                  currentExerciseOrder: 1,
               },
            });
         }
      } catch (error: unknown) {
         if (error instanceof Error) {
            set({
               barbellLogError: error.message,
            });
         } else {
            set({
               barbellLogError:
                  "Something went wrong getting completed workout.",
            });
         }
      } finally {
         set({ barbellLogLoading: false });
      }
   },

   updateBarbellLog: (updatedBarbellLog: CompletedWorkoutType) => {
      set({ barbellLog: updatedBarbellLog });
   },
}));
