import StandardBtn from "../../shared/StandardBtn";
import { useFetchNutritionReadings } from "../../../hooks/useFetchNutritionReadings";
import { useReadingsStore } from "../../../stores/reading.store";

import styles from "./NutritionSection.module.css";
import NutritionChart from "./NutritionChart";

interface NutritionSectionPropsType {
   toggleNutritionModal: () => void;
}

export default function NutritionSection({
   toggleNutritionModal,
}: NutritionSectionPropsType) {
   const handleAddEditNutritionData = () => {
      toggleNutritionModal();
   };
   const groupedNutritionReadings = useReadingsStore(
      (state) => state.groupedNutritionReadings
   );

   const { getGroupedNutritionReadings } = useFetchNutritionReadings();

   return (
      <div className={styles.container}>
         <h2 className={styles.sectionTitle}>Nutrition</h2>
         {groupedNutritionReadings && (
            <NutritionChart nutritionData={groupedNutritionReadings} />
         )}
         <StandardBtn
            text="Add/Edit Nutrition Data"
            onClick={handleAddEditNutritionData}
         />
      </div>
   );
}
