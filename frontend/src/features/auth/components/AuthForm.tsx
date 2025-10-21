import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toastify from "../../../utils/toastify";
import { useUserStore } from "../../../stores/user.store";
import { fetchLogin, fetchSignUp } from "../../../services/user.services";

import styles from "./AuthForm.module.css";
import {
   getPasswordComplianceMessage,
   validatePassword,
} from "../../../utils/validation";

export default function AuthForm({ authTitle }: { authTitle: string }) {
   const [emailInput, setEmailInput] = useState("");
   const [passwordInput, setPasswordInput] = useState("");
   const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const setToken = useUserStore((state) => state.setToken);
   const setWeightUnitPreference = useUserStore(
      (state) => state.setWeightUnitPreference
   );
   const setDistanceUnitPreference = useUserStore(
      (state) => state.setDistanceUnitPreference
   );
   const navigate = useNavigate();

   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmailInput(e.target.value);
   };

   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordInput(e.target.value);
   };

   const handleConfirmPasswordChange = (
      e: React.ChangeEvent<HTMLInputElement>
   ) => {
      setConfirmPasswordInput(e.target.value);
   };

   const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (emailInput === "" || passwordInput === "") {
         return toastify({
            message: "All fields are required.",
            type: "warn",
         });
      }

      // if (authTitle === "Sign Up") {
      //    if (confirmPasswordInput === "") {
      //       return toastify({
      //          message: "All fields are required.",
      //          type: "warn",
      //       });
      //    }

      //    if (passwordInput !== confirmPasswordInput) {
      //       return toastify({
      //          message: "Passwords must match.",
      //          type: "warn",
      //       });
      //    }

      //    if (!validatePassword(passwordInput)) {
      //       return toastify({
      //          message: getPasswordComplianceMessage(passwordInput),
      //          type: "info",
      //       });
      //    }
      // }

      try {
         if (authTitle === "Sign Up") {
            setIsLoading(true);

            await fetchSignUp({
               email: emailInput,
               password: passwordInput,
            });

            navigate("/sign-up-received");
         } else {
            setIsLoading(true);

            const loginRequest = await fetchLogin({
               email: emailInput,
               password: passwordInput,
            });

            setToken(loginRequest.token);
            setWeightUnitPreference(loginRequest.weightUnitPreference);
            setDistanceUnitPreference(loginRequest.distanceUnitPreference);

            navigate("/home");
         }
      } catch (error: any) {
         console.log(typeof error === typeof Error ? error.message : error);

         return toastify({
            message: error.message,
            type: "error",
         });
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <form className={styles.formWrapper} onSubmit={handleFormSubmit}>
         <div className={styles.inputsWrapper}>
            <div className={styles.inputWrapper}>
               <label
                  className={`subText ${styles.inputLabel}`}
                  htmlFor="email"
               >
                  email
               </label>
               <input
                  className={`standardInput ${styles.authInput}`}
                  type="email"
                  value={emailInput}
                  onChange={handleEmailChange}
                  inputMode="email"
               />
            </div>
            <div className={styles.inputWrapper}>
               <div>
                  <label
                     className={`subText ${styles.inputLabel}`}
                     htmlFor="password"
                  >
                     password
                  </label>
                  <input
                     className={`standardInput ${styles.authInput}`}
                     type="password"
                     value={passwordInput}
                     onChange={handlePasswordChange}
                  />
               </div>
            </div>
            {authTitle === "Sign Up" ? (
               <div className={styles.inputWrapper}>
                  <label
                     className={`subText ${styles.inputLabel}`}
                     htmlFor="confirm-password"
                  >
                     confirm password
                  </label>
                  <input
                     className={`standardInput ${styles.authInput}`}
                     type="password"
                     value={confirmPasswordInput}
                     onChange={handleConfirmPasswordChange}
                  />
               </div>
            ) : null}
         </div>
         <p className={styles.changeAuthWrapper}>
            {authTitle === "Sign Up" ? (
               <>
                  <span className={`regularText ${styles.changeAuthText}`}>
                     Already have an account?
                  </span>
                  <Link className={styles.changeAuthLink} to="/auth/login">
                     Login
                  </Link>
               </>
            ) : (
               <>
                  <span className={`regularText ${styles.changeAuthText}`}>
                     Need to create an account?
                  </span>
                  <Link
                     className={`regularText ${styles.changeAuthLink}`}
                     to="/auth/sign-up"
                  >
                     Sign Up
                  </Link>
               </>
            )}
         </p>
         <button
            className={`standardBtn ${styles.submitBtn}`}
            type="submit"
            disabled={isLoading}
         >
            {isLoading ? "loading..." : authTitle}
         </button>
      </form>
   );
}
