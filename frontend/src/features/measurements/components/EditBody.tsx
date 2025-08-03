import { useState } from "react";
import { heightOptions, weightUnits } from "../../../enums/constants";
import { useUserStore } from "../../../stores/userStore";

// import styles from "./EditBody.module.css";

export default function EditBody() {
   const [heightType, setHeightType] = useState("in");
   const user = useUserStore((state) => state.user);

   const handleHeightTypeChange = (event) => {
      setHeightType(event.target.value);
   };

   return (
      <div>
         <div>
            <label htmlFor="height">Height</label>
            <select
               name="height-type"
               id="height-type"
               value={heightType}
               onChange={handleHeightTypeChange}
            >
               {heightOptions.map((option) => (
                  <option key={option} value={option}>
                     {option}
                  </option>
               ))}
            </select>
            {heightType === "ft-in" ? (
               <div>
                  <input
                     className={`standardInput`}
                     type="number"
                     inputMode="numeric"
                  />
                  <span>ft</span>
                  <input
                     className={`standardInput`}
                     type="number"
                     inputMode="numeric"
                  />
                  <span>in</span>
               </div>
            ) : (
               <div>
                  <input type="number" inputMode="decimal" />
                  <span>{heightType}</span>
               </div>
            )}
         </div>
         <div>
            <label htmlFor="body-weight">Weight</label>
            <input className={`standardInput`} type="text" />
            <select
               name="weight-unit"
               id="weight-unit"
               value={user?.weightUnitPreference ?? "lb"}
            >
               {weightUnits.map((unit) => (
                  <option key={unit.id} value={unit.label}>
                     {unit.label}
                  </option>
               ))}
            </select>
         </div>
         <div>
            <label htmlFor="body-fat">Body Fat Percentage</label>
            <input
               className={`standardInput`}
               type="number"
               inputMode="numeric"
            />
         </div>
         <div>
            <label htmlFor="neck-circumference">Neck Circumference</label>
            <input
               className={`standardInput`}
               type="number"
               inputMode="numeric"
            />
         </div>
         <div>
            <label htmlFor="chest-circumference">Chest Circumference</label>
            <input
               className={`standardInput`}
               type="number"
               inputMode="numeric"
            />
         </div>
         <div>
            <label htmlFor="bicep-circumference">Bicep Circumference</label>
            <input
               className={`standardInput`}
               type="number"
               inputMode="numeric"
            />
         </div>
         <div>
            <label htmlFor="forearm-circumference">Forearm Circumference</label>
            <input
               className={`standardInput`}
               type="number"
               inputMode="numeric"
            />
         </div>
         <div>
            <label htmlFor="waist-circumference">Waist Circumference</label>
            <input
               className={`standardInput`}
               type="number"
               inputMode="numeric"
            />
         </div>
         <div>
            <label htmlFor="thigh-circumference">Thigh Circumference</label>
            <input
               className={`standardInput`}
               type="number"
               inputMode="numeric"
            />
         </div>
         <div>
            <label htmlFor="calf-circumference">Calf Circumference</label>
            <input
               className={`standardInput`}
               type="number"
               inputMode="numeric"
            />
         </div>
      </div>
   );
}
