import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import Seperator from "../shared/Seperator";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { fetchUpdateWeightPreference } from "../../services/userServices";
import toastify from "../../utils/toastify";

import styles from "./Settings.module.css";

export default function Settings() {
   const { user, updateUser, removeUser } = useAuthContext();
   const navigate = useNavigate();

   const handleLogoutClick = () => {
      removeUser();

      navigate("/");
   };

   const handleWeightUnitPreferenceToggleClick = async () => {
      const newWeightPreference =
         user?.weightUnitPreference === "lb" ? "kg" : "lb";

      try {
         await fetchUpdateWeightPreference({
            token: user?.token,
            weightUnitPreference: newWeightPreference,
         });

         const newUser = {
            ...user,
            weightUnitPreference: newWeightPreference,
         };

         updateUser(newUser);
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
         <div>
            <h3 className={styles.weightPreferenceTitle}>Weight Preference</h3>
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
