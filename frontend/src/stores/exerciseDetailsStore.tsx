import { create } from "zustand";
import { type ExerciseDetailType } from "../types/types";
import { EXERCISE_DETAILS } from "../data/exerciseDetails";

export interface ExerciseDetailsStoreType {
   exerciseDetails: ExerciseDetailType[];
   exerciseDetailsLoading: boolean;
   exerciseDetailsError: string | null;
   getExerciseDetails: () => Promise<void>;
}

export const useExerciseDetailsStore = create<ExerciseDetailsStoreType>(
   (set, get) => ({
      exerciseDetails: [],
      exerciseDetailsLoading: false,
      exerciseDetailsError: null,
      getExerciseDetails: async () => {
         const isLoading = get().exerciseDetailsLoading;

         if (isLoading) {
            return;
         }

         set({ exerciseDetailsLoading: true, exerciseDetailsError: null });

         try {
            const request = EXERCISE_DETAILS;

            set({ exerciseDetails: request });
         } catch (error: any) {
            set({
               exerciseDetailsError:
                  typeof error === typeof Error
                     ? error.message
                     : "Something went wrong getting exercise details.",
            });
         } finally {
            set({ exerciseDetailsLoading: false });
         }
      },
   })
);
