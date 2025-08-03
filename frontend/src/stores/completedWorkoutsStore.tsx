import { create } from "zustand";
import type { CompletedWorkoutType } from "../types/completedWorkoutTypes";
import { fetchGetCompletedWorkouts } from "../services/completedWorkoutServices";

export interface CompletedWorkoutsStoreType {
   completedWorkouts: CompletedWorkoutType[] | null;
   totalCompletedWorkouts?: number;
   completedWorkoutsDataState: {
      take: number;
      skip: number;
   };
   completedWorkoutsLoading: boolean;
   completedWorkoutsError: string | null;
   getCompletedWorkouts: ({ token }: { token: string }) => Promise<void>;
   updateCompletedWorkoutsDataState: (newState: {
      take: number;
      skip: number;
      token: string;
   }) => void;
}

export const useCompletedWorkoutsStore = create<CompletedWorkoutsStoreType>(
   (set, get) => ({
      completedWorkouts: null,
      totalCompletedWorkouts: 0,
      completedWorkoutsDataState: {
         take: 10,
         skip: 0,
      },
      completedWorkoutsLoading: false,
      completedWorkoutsError: null,
      getCompletedWorkouts: async ({ token }: { token: string }) => {
         set({
            completedWorkoutsLoading: true,
            completedWorkoutsError: null,
         });

         try {
            const { skip, take } = get().completedWorkoutsDataState;

            const request = await fetchGetCompletedWorkouts({
               token,
               skip,
               take,
            });

            set({
               completedWorkouts: request.workouts,
               totalCompletedWorkouts: request.totalWorkouts,
            });
         } catch (error: any) {
            set({
               completedWorkoutsError:
                  typeof error === typeof Error
                     ? error.message
                     : "Something went wrong getting completed workouts.",
            });
         } finally {
            set({
               completedWorkoutsLoading: false,
            });
         }
      },
      updateCompletedWorkoutsDataState: ({
         token,
         skip,
         take,
      }: {
         take: number;
         skip: number;
         token: string;
      }) => {
         set({
            completedWorkoutsDataState: {
               skip,
               take,
            },
         });

         get().getCompletedWorkouts({ token });
      },
   })
);
