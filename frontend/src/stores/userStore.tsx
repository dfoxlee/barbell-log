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
}

export const useUserStore = create<UserStoreType>((set) => ({
   user: null,
   authLoading: false,
   authError: null,
   validateToken: async () => {
      if (!user) {
         return false;
      }

      
   },
   login: async (userCredentials: AuthCredentialType) => {
      const email = userCredentials.email;
      const password = userCredentials.password;

      try {
         set({ authLoading: true, authError: null });

         const loginRequest = await fetchLogin({ email, password });

         set({
            user: {
               token: loginRequest.token,
               weightUnitPreference: loginRequest.weightUnitPreference,
               distanceUnitPreference: loginRequest.distanceUnitPreference,
            },
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

         set({
            user: {
               token: signUpRequest.token,
               weightUnitPreference: signUpRequest.weightUnitPreference,
               distanceUnitPreference: signUpRequest.distanceUnitPreference,
            },
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
}));
