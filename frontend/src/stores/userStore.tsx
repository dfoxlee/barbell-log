import { create } from "zustand";
import type { UserType } from "../types/commonTypes";
import type { AuthCredentialType } from "../features/auth/types/authTypes";
import { fetchLogin, fetchSignUp } from "../services/userServices";

export interface UserStoreType {
   user: UserType | null;
   authLoading: boolean;
   authError: null;
   login: (userCredentials: AuthCredentialType) => Promise<void>;
   signUp: (userCredentials: AuthCredentialType) => Promise<void>;
   updateWeightUnitPreference: (weightUnitPreference: string) => void;
   updateDistanceUnitPreference: (distanceUnitPreference: string) => void;
   logout: () => void;
}

export const useUserStore = create<UserStoreType>((set) => ({
   user: localStorage.getItem("barbell-log")
      ? JSON.parse(localStorage.getItem("barbell-log")!)
      : null,
   authLoading: false,
   authError: null,
   login: async (userCredentials: AuthCredentialType) => {
      const email = userCredentials.email;
      const password = userCredentials.password;

      try {
         set({ authLoading: true, authError: null });

         const loginRequest = await fetchLogin({ email, password });

         const user = {
            token: loginRequest.token,
            weightUnitPreference: loginRequest.weightUnitPreference,
            distanceUnitPreference: loginRequest.distanceUnitPreference,
         };

         localStorage.setItem("barbell-log", JSON.stringify(user));

         set({
            user,
         });
      } catch (error: any) {
         set({
            authError:
               typeof error === typeof Error
                  ? error.message
                  : "Something went wrong logging in user.",
         });
      } finally {
         set({
            authLoading: false,
         });
      }
   },
   signUp: async (userCredentials: AuthCredentialType) => {
      const email = userCredentials.email;
      const password = userCredentials.password;

      try {
         set({ authLoading: true, authError: null });

         const signUpRequest = await fetchSignUp({ email, password });

         const user = {
            token: signUpRequest.token,
            weightUnitPreference: signUpRequest.weightUnitPreference,
            distanceUnitPreference: signUpRequest.distanceUnitPreference,
         };

         localStorage.setItem("barbell-log", JSON.stringify(user));

         set({
            user,
         });
      } catch (error: any) {
         set({
            authError:
               typeof error === typeof Error
                  ? error.message
                  : "Something went wrong logging in user.",
         });
      } finally {
         set({
            authLoading: false,
         });
      }
   },
   updateWeightUnitPreference: (weightUnitPreference: string) =>
      set((state) => {
         if (!state.user) return {};
         return {
            user: {
               ...state.user,
               weightUnitPreference,
            },
         };
      }),
   updateDistanceUnitPreference: (distanceUnitPreference: string) =>
      set((state) => {
         if (!state.user) return {};
         return {
            user: {
               ...state.user,
               distanceUnitPreference,
            },
         };
      }),
   logout: () => set({ user: null }),
}));
