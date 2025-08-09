import { create } from "zustand";
import type { UserType } from "../types/commonTypes";

export interface UserStoreType {
   user: UserType | null;

   setUser: (user: UserType) => void;
   updateWeightUnitPreference: (weightUnitPreference: string) => void;
   updateDistanceUnitPreference: (distanceUnitPreference: string) => void;
   logout: () => void;
}

export const useUserStore = create<UserStoreType>((set) => ({
   user: localStorage.getItem("barbell-log")
      ? JSON.parse(localStorage.getItem("barbell-log")!)
      : null,

   setUser: (user: UserType) => set({ user }),

   updateWeightUnitPreference: (weightUnitPreference: string) =>
      set(({ user }) => {
         if (!user) {
            return {};
         }

         return {
            user: {
               ...user,
               weightUnitPreference,
            },
         };
      }),

   updateDistanceUnitPreference: (distanceUnitPreference: string) =>
      set(({ user }) => {
         if (!user) {
            return {};
         }

         return {
            user: {
               ...user,
               distanceUnitPreference,
            },
         };
      }),

   logout: () => set({ user: null }),
}));
