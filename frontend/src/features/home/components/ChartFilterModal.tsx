import { FaTimes, FaToggleOff, FaToggleOn } from "react-icons/fa";
import StandardIconBtn from "../../shared/StandardIconBtn";
import { useModalsStore } from "../../../stores/modals.store";

import styles from "./ChartFilterModal.module.css";
import StandardBtn from "../../shared/StandardBtn";

export default function ChartFilterModal() {
   const toggleMetric = useModalsStore((state) => state.toggleMetric);
   const selectedMetrics = useModalsStore((state) => state.selectedMetrics);
   const toggleFilterMacrosModalOpen = useModalsStore(
      (state) => state.toggleFilterMacrosModalOpen
   );

   const metrics = [
      { key: "totalCalories", label: "Calories (kcal)", unit: "kcal" },
      { key: "totalProtein", label: "Protein (g)", unit: "g" },
      { key: "totalCarbohydrates", label: "Carbohydrates (g)", unit: "g" },
      { key: "totalAddedSugar", label: "Added Sugar (g)", unit: "g" },
      { key: "totalTotalFiber", label: "Total Fiber (g)", unit: "g" },
      { key: "totalTotalSugar", label: "Total Sugar (g)", unit: "g" },
      { key: "totalSodium", label: "Sodium (mg)", unit: "mg" },
      { key: "totalCholesterol", label: "Cholesterol (mg)", unit: "mg" },
   ];

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <StandardIconBtn
               Icon={FaTimes}
               onClick={toggleFilterMacrosModalOpen}
            />
            <h3 className={styles.title}>Filter Macros</h3>
            <div className={styles.metricsWrapper}>
               {metrics.map((metric) => (
                  <StandardBtn
                     Icon={
                        selectedMetrics.find((m) => m.key === metric.key)
                           ? FaToggleOn
                           : FaToggleOff
                     }
                     text={metric.label}
                     onClick={() => toggleMetric(metric)}
                  />
               ))}
            </div>
         </div>
      </div>
   );
}
