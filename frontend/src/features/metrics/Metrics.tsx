import { useState } from "react";
import Seperator from "../shared/Seperator";
import AddMetric from "./components/AddMetric";

import styles from "./Metrics.module.css";
import BodyweightChart from "./components/BodyweightChart";
import NutritionChart from "./components/NutritionChart";

export default function Metrics() {
   const [showAddMetric, setShowAddMetric] = useState(false);

   const toggleShowAddMetric = () => {
      setShowAddMetric((prev) => !prev);
   };

   return (
      <div className={styles.container}>
         <h2 className={`pageTitle`}>Metrics</h2>
         <Seperator />
         <button
            className={`standardBtn ${styles.addMetricBtn}`}
            onClick={toggleShowAddMetric}
         >
            {showAddMetric ? "Hide Metric Input" : "Add Metric"}
         </button>
         {showAddMetric ? (
            <AddMetric />
         ) : (
            <>
               <BodyweightChart />
               <NutritionChart />
            </>
         )}
      </div>
   );
}
