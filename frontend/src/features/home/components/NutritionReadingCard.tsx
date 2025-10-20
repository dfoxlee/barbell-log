import { useMemo } from "react";
import StandardIconBtn from "../../shared/StandardIconBtn";
import { FaPencilAlt, FaPlusCircle, FaTrash } from "react-icons/fa";
import type { NutritionInfo } from "../../../types/nutrient.types";
import { useUserStore } from "../../../stores/user.store";
import { fetchCreateNutritionReading } from "../../../services/nutrition.services";
import { useFetchNutritionReadings } from "../../../hooks/useFetchNutritionReadings";

import styles from "./NutritionReadingCard.module.css";

export default function NutritionReadingCard({
   nutritionReading,
}: {
   nutritionReading: NutritionInfo;
}) {
   const token = useUserStore((state) => state.token);
   const { getNutritionReadings } = useFetchNutritionReadings();
   const formattedDescription = useMemo(
      () =>
         nutritionReading.description.replace(/\s*\(USDA type: [^)]+\)$/, ""),
      [nutritionReading.description]
   );
   const formattedDate = useMemo(
      () => new Date(nutritionReading.dateRecorded).toLocaleDateString(),
      [nutritionReading.dateRecorded]
   );

   const handleDeleteNutritionReadingClick = () => {
      console.log("delete nutrition reading");
   };

   const handleEditNutritionReading = () => {
      console.log("delete nutrition reading");
   };

   const handleAddFoodClick = async () => {
      if (token) {
         await fetchCreateNutritionReading({
            token,
            nutritionReading,
         });

         getNutritionReadings();
      }
   };

   return (
      <div className={styles.container}>
         <div className={styles.nutritionInfoWrapper}>
            <p className={styles.nutritionDate}>{formattedDate}</p>
            <h3 className={styles.description}>{formattedDescription}</h3>
         </div>
         <div className={styles.nutritionOptions}>
            <StandardIconBtn Icon={FaPlusCircle} onClick={handleAddFoodClick} />
            <StandardIconBtn
               Icon={FaPencilAlt}
               onClick={handleEditNutritionReading}
            />
            <StandardIconBtn
               Icon={FaTrash}
               onClick={handleDeleteNutritionReadingClick}
            />
         </div>
      </div>
   );
}
