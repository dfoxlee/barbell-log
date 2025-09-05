import { useState } from "react";
import { useUserStore } from "../../stores/userStore";
import Seperator from "../shared/Seperator";

import styles from "./Metrics.module.css";
import CustomMacros from "./components/CustomMacros";

export default function Metrics() {
   const user = useUserStore((state) => state.user);
   const [showCustomMacros, setShowCustomMacro] = useState(false);

   const toggleShowCustomMacro = () => {
      setShowCustomMacro((prev) => !prev);
   };

   return (
      <div className={styles.container}>
         <h2 className={`pageTitle`}>Metrics</h2>
         <Seperator />
         <div className={styles.weightInputWrapper}>
            <label className={`subText`} htmlFor="weight">
               Weight
            </label>
            <input
               className={`decimalValueInput`}
               id="weight"
               name="weight"
               type="number"
               inputMode="numeric"
            />
            <span className={`regularText`}>
               {user?.weightUnitPreference ?? "lb"}
            </span>
            <button className={`standardBtn`}>Add Reading</button>
         </div>
         <div className={styles.foodInputWrapper}>
            <input
               className={`standardInput`}
               type="text"
               placeholder="search for food..."
            />
            <button className={`standardBtn`}>Add Food</button>
         </div>
         <div className={styles.customMacroWrapper}>
            <button
               className={`standardBtn ${styles.customMacroBtn}`}
               onClick={toggleShowCustomMacro}
            >
               Enter Custom Macros
            </button>
            {showCustomMacros ? <CustomMacros /> : null}
         </div>
      </div>
   );
}
