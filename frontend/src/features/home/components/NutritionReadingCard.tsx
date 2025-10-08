import { useMemo } from "react";
import StandardIconBtn from "../../shared/StandardIconBtn";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

import styles from "./NutritionReadingCard.module.css";
import type { NutritionInfo } from "../../../types/nutrient.types";

export default function NutritionReadingCard({
   nutritionReading,
}: {
   nutritionReading: NutritionInfo;
}) {
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

   return (
      <div className={styles.container}>
         <div className={styles.nutritionInfoWrapper}>
            <p className={styles.nutritionDate}>{formattedDate}</p>
            <h3 className={styles.description}>{formattedDescription}</h3>
         </div>
         <div className={styles.nutritionOptions}>
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
