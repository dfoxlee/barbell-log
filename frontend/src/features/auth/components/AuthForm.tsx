import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { fetchLogin, fetchSignUp } from "../../../services/userServices";
import toastify from "../../../utils/toastify";

import styles from "./AuthForm.module.css";

export default function AuthForm({ authTitle }) {
   const [emailInput, setEmailInput] = useState("");
   const [passwordInput, setPasswordInput] = useState("");
   const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
   const { updateUser } = useAuthContext();
   const navigate = useNavigate();

   const handleEmailChange = (e) => {
      setEmailInput(e.target.value);
   };

   const handlePasswordChange = (e) => {
      setPasswordInput(e.target.value);
   };

   const handleConfirmPasswordChange = (e) => {
      setConfirmPasswordInput(e.target.value);
   };

   const handleFormSubmit = async (e) => {
      e.preventDefault();

      if (authTitle === "Sign Up") {
         if (
            passwordInput === "" ||
            emailInput === "" ||
            confirmPasswordInput === ""
         ) {
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

         try {
            const signUpRequest = await fetchSignUp({
               email: emailInput,
               password: passwordInput,
            });

            updateUser(signUpRequest);

            return navigate("/home");
         } catch (error) {
            return toastify({
               message: error.message,
               type: "error",
            });
         }
      } else {
         if (passwordInput === "" || emailInput === "") {
            return toastify({
               message: "All fields required.",
               type: "warn",
            });
         }

         try {
            const loginRequest = await fetchLogin({
               email: emailInput,
               password: passwordInput,
            });

            updateUser(loginRequest);

            return navigate("/home");
         } catch (error) {
            return toastify({
               message: error.message,
               type: "error",
            });
         }
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
         <button className={styles.authSubmitBtn} type="submit">
            {authTitle}
         </button>
      </form>
   );
}
