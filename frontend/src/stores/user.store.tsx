import { create } from "zustand";

export interface UserStoreType {
   token: string | null;
   weightUnitPreference: number | null;
   distanceUnitPreference: number | null;
   setUser: ({
      token,
      weightUnitPreference,
      distanceUnitPreference,
   }: {
      token: string;
      weightUnitPreference: number;
      distanceUnitPreference: number;
   }) => void;
   setToken: (token: string) => void;
   setWeightUnitPreference: (weightUnitPreference: number) => void;
   setDistanceUnitPreference: (distanceUnitPreference: number) => void;
   logout: () => void;
}

export const useUserStore = create<UserStoreType>((set, get) => ({
   token: null,
   weightUnitPreference: null,
   distanceUnitPreference: null,

   setUser: ({ token, weightUnitPreference, distanceUnitPreference }) => {
      localStorage.setItem(
         "barbell-log",
         JSON.stringify({
            token,
            weightUnitPreference,
            distanceUnitPreference,
         })
      );

      set({ token, weightUnitPreference, distanceUnitPreference });
   },

   setToken: (token) => {
      const weightUnitPreference = get().weightUnitPreference;
      const distanceUnitPreference = get().distanceUnitPreference;

      localStorage.setItem(
         "barbell-log",
         JSON.stringify({
            token,
            weightUnitPreference,
            distanceUnitPreference,
         })
      );

      set({ token });
   },

   setWeightUnitPreference: (weightUnitPreference: number) => {
      const token = get().token;
      const distanceUnitPreference = get().distanceUnitPreference;

      localStorage.setItem(
         "barbell-log",
         JSON.stringify({
            token,
            weightUnitPreference,
            distanceUnitPreference,
         })
      );
      set({ weightUnitPreference });
   },

   setDistanceUnitPreference: (distanceUnitPreference: number) => {
      const token = get().token;
      const weightUnitPreference = get().weightUnitPreference;

      localStorage.setItem(
         "barbell-log",
         JSON.stringify({
            token,
            weightUnitPreference,
            distanceUnitPreference,
         })
      );

      set({ distanceUnitPreference });
   },

   logout: () => {
      localStorage.removeItem("barbell-log");

      set({
         token: null,
         weightUnitPreference: null,
         distanceUnitPreference: null,
      });
   },
}));
