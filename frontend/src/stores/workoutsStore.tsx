import { create } from "zustand";
import type { WorkoutType } from "../types/workoutTypes";
import { fetchGetWorkouts } from "../services/workoutServices";

export interface WorkoutsStoreType {
   workouts: WorkoutType[] | [];
   workoutsLoading: boolean;
   workoutsError: string | null;
   getWorkouts: (token: string) => Promise<void>;
}

export const useWorkoutsStore = create<WorkoutsStoreType>((set) => ({
   workouts: [],
   workoutsLoading: false,
   workoutsError: null,
   getWorkouts: async (token: string) => {
      set({ workoutsLoading: true, workoutsError: null });

      try {
         const workoutRequest = await fetchGetWorkouts({ token });

         set({ workouts: workoutRequest });
      } catch (error: any) {
         set({
            workoutsError:
               typeof error === typeof Error
                  ? error.message
                  : "Something went wrong while getting workouts.",
         });
      } finally {
         set({ workoutsLoading: false });
      }
   },
}));
