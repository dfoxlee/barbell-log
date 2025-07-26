import { create } from "zustand";
import type { BarbellLogType } from "../types/barbellLogTypes";
import { fetchGetBarbellLog } from "../services/barbellLogServices";

export interface BarbellLogStoreType {
   barbellLog: BarbellLogType | null;
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
   updateBarbellLog: (updatedBarbellLog: BarbellLogType) => void;
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
         const barbellLog = await fetchGetBarbellLog({
            token,
            workoutId,
            completedWorkoutId,
         });

         set({
            barbellLog: {
               ...barbellLog,
               currentExerciseOrder: 1,
            },
         });
      } catch (error: any) {
         set({
            barbellLogError:
               typeof error === typeof Error
                  ? error.message
                  : "Something went wrong getting completed workout.",
         });
      } finally {
         set({ barbellLogLoading: false });
      }
   },
   updateBarbellLog: (updatedBarbellLog: BarbellLogType) =>
      set({ barbellLog: updatedBarbellLog }),
}));
