import { useState } from "react";
import Seperator from "../shared/Seperator";

import styles from "./Measurements.module.css";
import Body from "./components/Body";
import Nutrition from "./components/Nutrition";

export default function Measurements() {
   const [measurementType, setMeasurementType] = useState("body");

   const handleBodyClick = () => {
      setMeasurementType("body");
   };

   const handleNutritionClick = () => {
      setMeasurementType("nutrition");
   };

   return (
      <div className={styles.container}>
         <h2 className={styles.title}>Measurements</h2>
         <Seperator />
         <div className={styles.typeBtnsWrapper}>
            <button
               className={`standardBtn ${
                  measurementType === "body"
                     ? styles.activeTypeBtn
                     : styles.inactiveTypeBtn
               }`}
               onClick={handleBodyClick}
            >
               Body
            </button>
            <button
               className={`standardBtn ${
                  measurementType === "nutrition"
                     ? styles.activeTypeBtn
                     : styles.inactiveTypeBtn
               }`}
               onClick={handleNutritionClick}
            >
               Nutrition
            </button>
         </div>
         {measurementType === "body" ? <Body /> : <Nutrition />}
      </div>
   );
}
