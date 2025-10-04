import { useEffect, useRef, useState, type ChangeEvent } from "react";
import {
   fetchCreateNutritionReading,
   fetchGetNutritionSearchResults,
} from "../../../services/nutrition.services";
import { useUserStore } from "../../../stores/user.store";
import StandardIconBtn from "../../shared/StandardIconBtn";
import { FaSave, FaTimes } from "react-icons/fa";
import { formatNutritionSearchResult } from "../../../utils/formatting";
import FractionalValueInput from "../../shared/FractionalValueInput";
import StandardBtn from "../../shared/StandardBtn";
import toastify from "../../../utils/toastify";
import type {
   NutrientInfo,
   NutritionInfo,
   UsdaFoodObject,
} from "../../../types/nutrient.types";

import styles from "./AddNutritionForm.module.css";

export default function AddNutritionForm({ handleCloseModalClick }) {
   const [searchResults, setSearchResults] = useState<UsdaFoodObject[]>([]);
   const [nutritionInfo, setNutritionInfo] = useState<NutritionInfo>({
      fdcId: 0,
      dataType: "",
      brandName: "",
      servingSize: "",
      description: "",
      quantity: 0,
      calories: 0,
      totalFat: 0,
      protein: 0,
      carbohydrates: 0,
      addedSugar: 0,
      totalFiber: 0,
      totalSugar: 0,
      cholesterol: 0,
      sodium: 0,
   });
   const [itemSelected, setItemSelected] = useState(false);
   const [showResults, setShowResults] = useState(false);
   const searchInputRef = useRef<HTMLInputElement>(null);

   const token = useUserStore((state) => state.token);

   useEffect(() => {
      if (!itemSelected) {
         if (!nutritionInfo.description.trim()) {
            setSearchResults([]);
            return;
         }

         const delaySearch = setTimeout(async () => {
            const results = await fetchGetNutritionSearchResults({
               query: nutritionInfo.description,
               token: token!,
            });

            setSearchResults(results.data.foods);

            if (searchInputRef.current === document.activeElement) {
               setShowResults(true);
            }
         }, 500);

         return () => {
            clearTimeout(delaySearch);
         };
      }
   }, [nutritionInfo.description]);

   const getNutrientValue = (
      foodNutrients: NutrientInfo[],
      searchId: number,
      fallbackName?: string
   ): number => {
      const nutrient = foodNutrients.find(
         (n) =>
            n.nutrientId === searchId ||
            (fallbackName &&
               n.nutrientName.toLowerCase() === fallbackName.toLowerCase())
      );

      // Return the value, or 0 if the nutrient is not found
      return nutrient ? nutrient.value : 0;
   };

   const handleSearchResultsClick = (foodItem: UsdaFoodObject) => {
      const {
         fdcId,
         dataType,
         brandName,
         servingSize,
         servingSizeUnit,
         description,
         foodNutrients,
      } = foodItem;

      // The USDA nutrient IDs for the core "Macronutrients" and key "Micronutrients" are:
      // Energy (Calories): 1008
      // Protein: 1003
      // Total Lipid (Fat): 1004
      // Carbohydrate, by difference: 1005
      // Total Sugars: 2000
      // Fiber, total dietary: 1079
      // Cholesterol: 1253
      // Sodium: 1093

      // Note on Added Sugar: The USDA API may not always provide 'Added Sugar' (nutrientId 2054)
      const totalSugars = getNutrientValue(foodNutrients, 2000, "Total Sugars");

      const extractedInfo: NutritionInfo = {
         fdcId: fdcId,
         dataType: dataType,
         brandName: brandName || "N/A",
         servingSize: servingSize ? `${servingSize} ${servingSizeUnit}` : "",
         quantity: 1,
         description: description,
         calories: Math.round(
            getNutrientValue(foodNutrients, 1008, "Energy") > 0
               ? getNutrientValue(foodNutrients, 1008, "Energy")
               : getNutrientValue(
                    foodNutrients,
                    1008,
                    "Energy (Atwater General Factors)"
                 )
         ),
         totalFat: getNutrientValue(foodNutrients, 1004, "Total lipid (fat)"),
         protein: getNutrientValue(foodNutrients, 1003, "Protein"),
         carbohydrates: getNutrientValue(
            foodNutrients,
            1005,
            "Carbohydrate, by difference"
         ),
         addedSugar: getNutrientValue(foodNutrients, 2054, "Added sugars"),
         totalFiber: getNutrientValue(
            foodNutrients,
            1079,
            "Fiber, total dietary"
         ),
         totalSugar: totalSugars,
         cholesterol: getNutrientValue(foodNutrients, 1253, "Cholesterol"),
         sodium: getNutrientValue(foodNutrients, 1093, "Sodium, Na"),
      };

      setNutritionInfo(extractedInfo);
      setNutritionInfo((prev) => ({
         ...prev,
         description: formatNutritionSearchResult(foodItem),
      }));
      setSearchResults([]);
      setItemSelected(true);
      setShowResults(false);
   };

   const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      setNutritionInfo((prev) => ({
         ...prev,
         description: event.target.value,
      }));
      setItemSelected(false);
      setShowResults(false);
   };

   const handleClearInputClick = () => {
      setNutritionInfo((prev) => ({
         ...prev,
         description: "",
      }));
      setSearchResults([]);
      setItemSelected(false);
      setNutritionInfo({
         fdcId: 0,
         dataType: "",
         brandName: "",
         servingSize: "",
         description: "",
         quantity: 0,
         calories: 0,
         totalFat: 0,
         protein: 0,
         carbohydrates: 0,
         addedSugar: 0,
         totalFiber: 0,
         totalSugar: 0,
         cholesterol: 0,
         sodium: 0,
      });
      setShowResults(false);
   };

   const handleQuantityBlur = (value: number) => {
      console.log("quantity changed", value);
   };

   const handleCaloriesBlur = (value: number) => {
      console.log("calories change", value);
   };

   const handleFatBlur = (value: number) => {
      console.log("fat change", value);
   };

   const handleProteinBlur = (value: number) => {
      console.log("protein change", value);
   };

   const handleCarbsBlur = (value: number) => {
      console.log("carbs change", value);
   };

   const handleAddedSugarBlur = (value: number) => {
      console.log("added sugar change", value);
   };

   const handleFiberBlur = (value: number) => {
      console.log("fiber change", value);
   };

   const handleTotalSugarBlur = (value: number) => {
      console.log("total sugars change", value);
   };

   const handleCholesterolBlur = (value: number) => {
      console.log("cholesterol change", value);
   };

   const handleSodiumBlur = (value: number) => {
      console.log("sodium change", value);
   };

   const handleSaveNutritionClick = async () => {
      if (!nutritionInfo.description) {
         return toastify({
            message: "You must enter a food description.",
            type: "warning",
         });
      }

      if (
         !nutritionInfo.calories &&
         !nutritionInfo.protein &&
         !nutritionInfo.carbohydrates
      ) {
         return toastify({
            message: "Please enter calorie, protein, or carbohydrates value.",
            type: "warning",
         });
      }

      if (token) {
         await fetchCreateNutritionReading({
            token,
            nutritionReading: nutritionInfo,
         });
      }

      handleCloseModalClick();
   };

   const handleInputFocus = () => {
      setShowResults(true);
   };

   const handleInputBlur = () => {
      setTimeout(() => {
         setShowResults(false);
      }, 150);
   };

   return (
      <div className={styles.container}>
         <div className={styles.searchWrapper}>
            <div className={styles.searchInputWrapper}>
               <input
                  className={styles.searchInput}
                  ref={searchInputRef}
                  type="text"
                  placeholder="search or add custom food..."
                  value={nutritionInfo.description}
                  onChange={handleSearchInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
               />
               <StandardIconBtn
                  Icon={FaTimes}
                  onClick={handleClearInputClick}
               />
            </div>
            {nutritionInfo.servingSize ? (
               <span
                  className={styles.servingSizeInformation}
               >{`Listed Serving Size: ${nutritionInfo.servingSize}`}</span>
            ) : null}
            <div className={styles.searchResultsWrapper}>
               {showResults &&
                  searchResults.map((result) => (
                     <button
                        className={styles.resultBtn}
                        key={result.fdcId}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleSearchResultsClick(result)}
                     >
                        {formatNutritionSearchResult(result)}
                     </button>
                  ))}
            </div>
         </div>
         <div>
            <div className={styles.inputsRow}>
               <div className={styles.inputWrapper}>
                  <span className={styles.inputLabel}>Quantity</span>
                  <FractionalValueInput
                     value={nutritionInfo.quantity}
                     onBlur={handleQuantityBlur}
                  />
               </div>
               <div className={styles.inputWrapper}>
                  <span className={styles.inputLabel}>Calories (kcal)</span>
                  <FractionalValueInput
                     value={nutritionInfo.calories}
                     onBlur={handleCaloriesBlur}
                  />
               </div>
            </div>
            <div className={styles.inputsRow}>
               <div className={styles.inputWrapper}>
                  <span className={styles.inputLabel}>Total Fat (g)</span>
                  <FractionalValueInput
                     value={nutritionInfo.totalFat}
                     onBlur={handleFatBlur}
                  />
               </div>
               <div className={styles.inputWrapper}>
                  <span className={styles.inputLabel}>Protein (g)</span>
                  <FractionalValueInput
                     value={nutritionInfo.protein}
                     onBlur={handleProteinBlur}
                  />
               </div>
               <div className={styles.inputWrapper}>
                  <span className={styles.inputLabel}> Carbs (g)</span>
                  <FractionalValueInput
                     value={nutritionInfo.carbohydrates}
                     onBlur={handleCarbsBlur}
                  />
               </div>
            </div>
            <div className={styles.inputsRow}>
               <div className={styles.inputWrapper}>
                  <span className={styles.inputLabel}>Added Sugar (g)</span>
                  <FractionalValueInput
                     value={nutritionInfo.addedSugar}
                     onBlur={handleAddedSugarBlur}
                  />
               </div>
               <div className={styles.inputWrapper}>
                  <span className={styles.inputLabel}>Total Fiber (g)</span>
                  <FractionalValueInput
                     value={nutritionInfo.totalFiber}
                     onBlur={handleFiberBlur}
                  />
               </div>
               <div className={styles.inputWrapper}>
                  <span className={styles.inputLabel}>Total Sugar (g)</span>
                  <FractionalValueInput
                     value={nutritionInfo.totalSugar}
                     onBlur={handleTotalSugarBlur}
                  />
               </div>
            </div>
            <div className={styles.inputsRow}>
               <div className={styles.inputWrapper}>
                  <span className={styles.inputLabel}>Sodium (mg)</span>
                  <FractionalValueInput
                     value={nutritionInfo.sodium}
                     onBlur={handleSodiumBlur}
                  />
               </div>
               <div className={styles.inputWrapper}>
                  <span className={styles.inputLabel}>Cholesterol (g)</span>
                  <FractionalValueInput
                     value={nutritionInfo.cholesterol}
                     onBlur={handleCholesterolBlur}
                  />
               </div>
            </div>
         </div>
         <div className={styles.saveNutritionBtn}>
            <StandardBtn
               text="Save"
               Icon={FaSave}
               onClick={handleSaveNutritionClick}
            />
         </div>
      </div>
   );
}
