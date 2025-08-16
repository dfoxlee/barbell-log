import { useState } from "react";
import { useUserStore } from "../../stores/userStore";
import Seperator from "../shared/Seperator";

import styles from "./Metrics.module.css";

export default function Metrics() {
   const user = useUserStore((state) => state.user);
   const [customMacroEntry, setCustomMacroEntry] = useState();

   return (
      <div className={styles.container}>
         <h2 className={`pageTitle`}>Metrics</h2>
         <Seperator />
         <div>
            <label htmlFor="weight">Weight</label>
            <input
               id="weight"
               name="weight"
               type="number"
               inputMode="numeric"
            />
            <span>{user?.weightUnitPreference ?? "lb"}</span>
            <button>Add Reading</button>
         </div>
         <div>
            <input type="text" placeholder="search for food..." />
            <button>Add Food</button>
            <button>Enter Custom Macros</button>
         </div>
      </div>
   );
}
