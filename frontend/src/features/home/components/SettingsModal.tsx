import { FaTimes } from "react-icons/fa";
import StandardIconBtn from "../../shared/StandardIconBtn";
import WeightUnitSelector from "../../shared/WeightUnitSelector";
import { useState, type ChangeEvent } from "react";
import DistanceUnitSelector from "../../shared/DistanceUnitSelector";
import { useUserStore } from "../../../stores/user.store";
import toastify from "../../../utils/toastify";
import {
   fetchUpdatePassword,
   fetchUpdateUnitPreference,
} from "../../../services/user.services";
import StandardBtn from "../../shared/StandardBtn";
import Seperator from "../../shared/Seperator";
import PasswordChangeInput from "./PasswordChangeInput";

import styles from "./SettingsModal.module.css";
import { useNavigate } from "react-router-dom";
import {
   getPasswordComplianceMessage,
   validatePassword,
} from "../../../utils/validation";

interface SettingsModalPropsType {
   toggleSettingsModalOpen: () => void;
}

export default function SettingsModal({
   toggleSettingsModalOpen,
}: SettingsModalPropsType) {
   const [newPassword, setNewPassword] = useState("");
   const [confirmNewPassword, setConfirmNewPassword] = useState("");

   const weightUnitPreference = useUserStore(
      (state) => state.weightUnitPreference
   );
   const setWeightUnitPreference = useUserStore(
      (state) => state.setWeightUnitPreference
   );
   const distanceUnitPreference = useUserStore(
      (state) => state.distanceUnitPreference
   );
   const setDistanceUnitPreference = useUserStore(
      (state) => state.setDistanceUnitPreference
   );
   const token = useUserStore((state) => state.token);
   const logout = useUserStore((state) => state.logout);
   const navigate = useNavigate();

   const handleWeightUnitPreferenceChange = async (
      event: ChangeEvent<HTMLSelectElement>
   ) => {
      try {
         await fetchUpdateUnitPreference({
            token: token!,
            weightUnitPreference: parseInt(event.target.value),
            distanceUnitPreference: distanceUnitPreference!,
         });

         setWeightUnitPreference(parseInt(event.target.value));
      } catch (error) {
         console.error(
            "An error occurred updating weight unit preference. Please try again later.",
            error
         );

         toastify({
            message:
               "An error occurred updating weight unit preference. Please try again later.",
            type: "error",
         });
      }
   };

   const handleDistanceUnitPreferenceChange = async (
      event: ChangeEvent<HTMLSelectElement>
   ) => {
      try {
         await fetchUpdateUnitPreference({
            token: token!,
            weightUnitPreference: weightUnitPreference!,
            distanceUnitPreference: parseInt(event.target.value),
         });

         setDistanceUnitPreference(parseInt(event.target.value));
      } catch (error) {
         console.error(
            "An error occurred updating distance unit preference. Please try again later.",
            error
         );

         toastify({
            message:
               "An error occurred updating distance unit preference. Please try again later.",
            type: "error",
         });
      }
   };

   const handleDeleteAllWorkoutData = () => {
      console.log("delete all data");
   };

   const handleDeleteAccount = () => {
      console.log("delete account");
   };

   const handleSavePasswordClick = async () => {
      if (!newPassword || !newPassword.length) {
         return toastify({
            message: "Password cannot be blank.",
            type: "info",
         });
      }

      if (newPassword !== confirmNewPassword) {
         return toastify({
            message: "Confirmation password must match the new password.",
            type: "warning",
         });
      }

      if (!validatePassword(newPassword)) {
         return toastify({
            message: getPasswordComplianceMessage(newPassword),
            type: "info",
         });
      }

      if (token) {
         try {
            await fetchUpdatePassword({ token, newPassword });
         } catch (error) {
            console.error(error);

            return toastify({
               message:
                  "An error occurred while updating the password. Please try again later.",
               type: "error",
            });
         }
      }

      toastify({
         message: "Password changed successfully",
         type: "success",
      });
      setNewPassword("");
      setConfirmNewPassword("");
   };

   const handleNewPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
      setNewPassword(event.target.value);
   };

   const handleConfirmNewPasswordChange = (
      event: ChangeEvent<HTMLInputElement>
   ) => {
      setConfirmNewPassword(event.target.value);
   };

   const handleLogoutClick = () => {
      logout();
      navigate("/");
   };

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <StandardIconBtn Icon={FaTimes} onClick={toggleSettingsModalOpen} />
            <h2 className={`modalTitle`}>Settings</h2>
            <Seperator />
            <div className={styles.content}>
               <div className={styles.logoutBtnWrapper}>
                  <StandardBtn text="Logout" onClick={handleLogoutClick} />
               </div>
               <h3 className={styles.sectionTitle}>Update Unit Preferences</h3>
               <div>
                  <div className={styles.unitPreferenceWrapper}>
                     <label htmlFor="weight-unit-selector">
                        Weight Unit Preference
                     </label>
                     <WeightUnitSelector
                        value={weightUnitPreference ?? 1}
                        onChange={handleWeightUnitPreferenceChange}
                     />
                  </div>
                  <div className={styles.unitPreferenceWrapper}>
                     <label htmlFor="distance-unit-selector">
                        Distance Unit Preference
                     </label>
                     <DistanceUnitSelector
                        value={distanceUnitPreference ?? 1}
                        onChange={handleDistanceUnitPreferenceChange}
                     />
                  </div>
               </div>
               <h3 className={styles.sectionTitle}>Change Password</h3>
               <div className={styles.changePasswordWrapper}>
                  <div className={styles.changePasswordInputWrapper}>
                     <label
                        className={styles.changePasswordLabel}
                        htmlFor="new-password"
                     >
                        new password
                     </label>
                     <PasswordChangeInput
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                     />
                  </div>
                  <div className={styles.changePasswordInputWrapper}>
                     <label
                        className={styles.changePasswordLabel}
                        htmlFor="confirm-new-password"
                     >
                        confirm new password
                     </label>
                     <PasswordChangeInput
                        value={confirmNewPassword}
                        onChange={handleConfirmNewPasswordChange}
                     />
                  </div>
                  <StandardBtn
                     text="Save Password"
                     onClick={handleSavePasswordClick}
                  />
               </div>
               <Seperator />
               <StandardBtn
                  text="Delete All Workout and Nutrition Data"
                  onClick={handleDeleteAllWorkoutData}
               />
               <StandardBtn
                  text="Delete Account"
                  onClick={handleDeleteAccount}
               />
            </div>
         </div>
      </div>
   );
}
