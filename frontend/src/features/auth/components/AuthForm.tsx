import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toastify from "../../../utils/toastify";

import styles from "./AuthForm.module.css";
import { useUserStore } from "../../../stores/userStore";

export default function AuthForm({ authTitle }: { authTitle: string }) {
   const [emailInput, setEmailInput] = useState("");
   const [passwordInput, setPasswordInput] = useState("");
   const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
   const { user, login, signUp, authError } = useUserStore();
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

      if (authTitle === "Sign Up") {
         if (confirmPasswordInput === "") {
            return toastify({
               message: "All fields are required.",
               type: "warn",
            });
         }

         if (passwordInput !== confirmPasswordInput) {
            return toastify({
               message: "Passwords must match.",
               type: "warn",
            });
         }
      }

      if (authTitle === "Sign Up") {
         await signUp({ email: emailInput, password: passwordInput });
      } else {
         await login({ email: emailInput, password: passwordInput });
      }

      if (authError) {
         return toastify({
            message: authError,
            type: "error",
         });
      }

      if (user?.token) {
         navigate("/home");
      }
   };

   return (
      <form className={styles.formWrapper} onSubmit={handleFormSubmit}>
         <div className={styles.inputsWrapper}>
            <div className={styles.inputWrapper}>
               <label className={styles.inputLabel} htmlFor="email">
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
                  <label className={styles.inputLabel} htmlFor="password">
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
                     className={styles.inputLabel}
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
                  <span className={styles.changeAuthText}>
                     Already have an account?
                  </span>
                  <Link className={styles.changeAuthLink} to="/auth/login">
                     Login
                  </Link>
               </>
            ) : (
               <>
                  <span className={styles.changeAuthText}>
                     Need to create an account?
                  </span>
                  <Link className={styles.changeAuthLink} to="/auth/sign-up">
                     Sign Up
                  </Link>
               </>
            )}
         </p>
         <button className={`standardBtn ${styles.submitBtn}`} type="submit">
            {authTitle}
         </button>
      </form>
   );
}
