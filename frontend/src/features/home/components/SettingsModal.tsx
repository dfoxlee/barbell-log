import { FaTimes } from "react-icons/fa";
import StandardIconBtn from "../../shared/StandardIconBtn";
import styles from "./SettingsModal.module.css";
import WeightUnitSelector from "../../shared/WeightUnitSelector";
import type { ChangeEvent } from "react";
import DistanceUnitSelector from "../../shared/DistanceUnitSelector";
import { useUserStore } from "../../../stores/user.store";
import toastify from "../../../utils/toastify";
import { fetchUpdateUnitPreference } from "../../../services/user.services";
import StandardBtn from "../../shared/StandardBtn";
import Seperator from "../../shared/Seperator";

interface SettingsModalPropsType {
   toggleSettingsModalOpen: () => void;
}

export default function SettingsModal({
   toggleSettingsModalOpen,
}: SettingsModalPropsType) {
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

   const handleWeightUnitPreferenceChange = async (
      event: ChangeEvent<HTMLSelectElement>
   ) => {
      try {
         await fetchUpdateUnitPreference({
            token,
            weightUnitPreference: event.target.value,
            distanceUnitPreference,
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
            token,
            weightUnitPreference,
            distanceUnitPreference: event.target.value,
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

   const handlePreviousPasswordChange = (
      event: ChangeEvent<HTMLInputElement>
   ) => {
      console.log(event.target.value);
   };

   const handleNewPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.value);
   };

   const handleConfirmNewPasswordChange = (
      event: ChangeEvent<HTMLInputElement>
   ) => {
      console.log(event.target.value);
   };

   const handleDeleteAllWorkoutData = () => {
      console.log("delete all data");
   };

   const handleDeleteAccount = () => {
      console.log("delete account");
   };

   const handleSavePasswordClick = () => {
      console.log("savePassword");
   };

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <StandardIconBtn Icon={FaTimes} onClick={toggleSettingsModalOpen} />
            <h2 className={`modalTitle`}>Settings</h2>
            <Seperator />
            <div className={styles.content}>
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
                        htmlFor="previous-password"
                     >
                        previous password
                     </label>
                     <input
                        className={styles.changePasswordInput}
                        type="password"
                        id="previous-password"
                        name="previous-password"
                        onChange={handlePreviousPasswordChange}
                     />
                  </div>
                  <div className={styles.changePasswordInputWrapper}>
                     <label
                        className={styles.changePasswordLabel}
                        htmlFor="new-password"
                     >
                        new password
                     </label>
                     <input
                        className={styles.changePasswordInput}
                        type="password"
                        id="new-password"
                        name="new-password"
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
                     <input
                        className={styles.changePasswordInput}
                        type="password"
                        id="confirm-new-password"
                        name="confirm-new-password"
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
