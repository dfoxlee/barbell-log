import { create } from "zustand";
import type { WorkoutType } from "../types/workoutTypes";
import {
   fetchDeleteWorkout,
   fetchGetWorkouts,
} from "../services/workoutServices";

export interface WorkoutsStoreType {
   workouts: WorkoutType[] | [];
   workoutsLoading: boolean;
   workoutsError: string | null;
   getWorkouts: (token: string) => Promise<void>;
   deleteWorkout: ({
      token,
      workoutId,
   }: {
      token: string;
      workoutId: string;
   }) => Promise<void>;
}

export const useWorkoutsStore = create<WorkoutsStoreType>((set, get) => ({
   workouts: [],
   workoutsLoading: false,
   workoutsError: null,
   getWorkouts: async (token: string) => {
      set({ workoutsLoading: true, workoutsError: null });

      try {
         const workoutRequest = await fetchGetWorkouts({ token });
         console.log(workoutRequest);

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
   deleteWorkout: async ({ token, workoutId }) => {
      set({ workoutsLoading: true, workoutsError: null });

      try {
         await fetchDeleteWorkout({ token, workoutId });

         get().getWorkouts(token);
      } catch (error: any) {
         set({
            workoutsError:
               typeof error === typeof Error
                  ? error.message
                  : "Something went wrong deleting the workout.",
         });
      } finally {
         set({ workoutsLoading: false });
      }
   },
}));
