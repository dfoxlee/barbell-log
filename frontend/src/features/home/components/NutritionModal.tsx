import { FaTimes } from "react-icons/fa";
import StandardIconBtn from "../../shared/StandardIconBtn";
import StandardBtn from "../../shared/StandardBtn";
import { useState } from "react";

import styles from "./NutritionModal.module.css";
import AddNutritionForm from "./AddNutritionForm";
import { useReadingsStore } from "../../../stores/reading.store";
import { useFetchNutritionReadings } from "../../../hooks/useFetchNutritionReadings";
import NutritionReadingCard from "./NutritionReadingCard";

interface NutritionModalPropsType {
   toggleNutritionModal: () => void;
}

export default function NutritionModal({
   toggleNutritionModal,
}: NutritionModalPropsType) {
   const [modalType, setModalType] = useState<"edit" | "add" | "history">(
      "history"
   );

   const nutritionReadings = useReadingsStore(
      (state) => state.nutritionReadings
   );

   const { getNutritionReadings } = useFetchNutritionReadings();

   const handleCloseModalClick = () => {
      setModalType("edit");

      toggleNutritionModal();
   };

   const handleAddNutritionClick = () => {
      if (modalType !== "add") {
         return setModalType("add");
      }

      setModalType("history");
   };

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <StandardIconBtn Icon={FaTimes} onClick={handleCloseModalClick} />
            <h3 className={styles.title}>Nutrition</h3>
            <div>
               {nutritionReadings?.map((reading) => (
                  <NutritionReadingCard
                     key={reading.dateGroup}
                     nutritionReading={reading}
                  />
               ))}
            </div>
            <div className={styles.addNutritionBtnWrapper}>
               <StandardBtn
                  text={modalType === "add" ? "Cancel" : "Add Nutrition"}
                  onClick={handleAddNutritionClick}
               />
            </div>
            {modalType === "add" ? (
               <AddNutritionForm
                  handleCloseModalClick={handleCloseModalClick}
               />
            ) : null}
         </div>
      </div>
   );
}
