import { useMemo } from "react";
import StandardIconBtn from "../../shared/StandardIconBtn";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

import styles from "./NutritionReadingCard.module.css";

export default function NutritionReadingCard({ nutritionReading }) {
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
      <div>
         <p>{formattedDate}</p>
         <h3>{formattedDescription}</h3>
         <div>
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
