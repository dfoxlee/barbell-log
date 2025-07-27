import { useNavigate } from "react-router-dom";
import Seperator from "../shared/Seperator";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { fetchUpdateWeightUnitPreference } from "../../services/userServices";
import toastify from "../../utils/toastify";

import styles from "./Settings.module.css";
import { useUserStore } from "../../stores/userStore";
import { distanceUnits } from "../../enums/constants";

export default function Settings() {
   const user = useUserStore((state) => state.user);
   const logout = useUserStore((state) => state.logout);
   const navigate = useNavigate();

   const handleLogoutClick = () => {
      logout();

      navigate("/");
   };

   const handleWeightUnitPreferenceToggleClick = async () => {
      const newWeightPreference =
         user?.weightUnitPreference === "lb" ? "kg" : "lb";

      try {
         await fetchUpdateWeightUnitPreference({
            token: user?.token,
            weightUnitPreference: newWeightPreference,
         });

         const newUser = {
            ...user,
            weightUnitPreference: newWeightPreference,
         };

         console.log("Updated weight unit preference", newUser);
      } catch (error) {
         console.error(error);

         return toastify({
            message: "Something went wrong. Try again later.",
            type: "error",
         });
      }
   };

   return (
      <div className={styles.container}>
         <h2 className={styles.title}>Settings</h2>
         <Seperator />
         <button className={styles.logoutBtn} onClick={handleLogoutClick}>
            Logout
         </button>
         <div className={styles.unitPreferencesWrapper}>
            <div className={styles.unitPreferenceWrapper}>
               <h3 className={styles.unitPreferenceTitle}>Weight Preference</h3>
               <div className={styles.weightUnitToggleWrapper}>
                  <span className={styles.weightUnitLabel}>kg</span>
                  <button
                     className={styles.weightUnitBtn}
                     onClick={handleWeightUnitPreferenceToggleClick}
                  >
                     {user?.weightUnitPreference === "lb" ? (
                        <FaToggleOn />
                     ) : (
                        <FaToggleOff />
                     )}
                  </button>
                  <span className={styles.weightUnitLabel}>lb</span>
               </div>
            </div>
            <div className={styles.unitPreferenceWrapper}>
               <h3 className={styles.unitPreferenceTitle}>
                  Distance Preference
               </h3>
               <select
                  className={styles.distanceUnitSelect}
                  name="distance-preference"
                  id="distance-preference"
               >
                  {distanceUnits.map((unit) => (
                     <option key={unit.id} value={unit.label}>
                        {unit.label}
                     </option>
                  ))}
               </select>
            </div>
         </div>
         <div className={styles.accountOptionsWrapper}>
            <button className={`standardBtn ${styles.accountOptionBtn}`}>
               Change Email
            </button>
            <button className={`standardBtn ${styles.accountOptionBtn}`}>
               Reset Password
            </button>
         </div>
         <button className={`standardBtn ${styles.deleteAccountBtn}`}>
            Delete Account
         </button>
      </div>
   );
}
