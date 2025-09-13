import { useEffect, useRef, useState } from "react";
import {
   fetchAddBodyweightReading,
   fetchAddNutritionMetric,
   fetchGetNutritionSearch,
} from "../../../services/metricsServices";
import type { NutritionType } from "../../../types/metricTypes";
import toastify from "../../../utils/toastify";
import CustomMacros from "./CustomMacros";
import { useUserStore } from "../../../stores/userStore";

import styles from "./AddMetric.module.css";

export default function AddMetric() {
   const user = useUserStore((state) => state.user);
   const searchInputRef = useRef<HTMLInputElement>(null);
   const [bodyweightInput, setBodyweightInput] = useState(0);
   const [foodSearchResults, setFoodSearchResults] = useState<NutritionType[]>(
      []
   );
   const [nutritionInput, setNutritionInput] = useState<NutritionType | null>({
      nutritionId: "",
      description: "",
      energy: 0,
      protein: 0,
      totalFat: 0,
      carbohydrates: 0,
      fiber: 0,
      totalSugar: 0,
      addedSugar: 0,
      cholesterol: 0,
      sodium: 0,
   });

   useEffect(() => {
      const handleDocumentClick = (event) => {
         if (
            searchInputRef.current &&
            !searchInputRef.current.contains(event.target)
         ) {
            setFoodSearchResults([]);
         }
      };

      document.addEventListener("click", handleDocumentClick);

      return () => {
         document.removeEventListener("click", handleDocumentClick);
      };
   }, []);

   useEffect(() => {
      if (nutritionInput?.description === "" || nutritionInput?.nutritionId)
         return;

      const getFoodSearchResults = async () => {
         try {
            const foodSearch = await fetchGetNutritionSearch({
               token: user!.token,
               searchValue: nutritionInput?.description,
            });

            setFoodSearchResults(foodSearch.nutritionData);
         } catch (error) {
            console.error(
               "An error occurred fetching food search results",
               error
            );
            toastify({
               message:
                  "There was an error fetching food search results. Please try again.",
               type: "error",
            });
         }
      };

      getFoodSearchResults();
   }, [nutritionInput]);

   const handleAddBodyweightReading = async () => {
      if (bodyweightInput <= 0) {
         toastify({
            message: "Please enter a valid bodyweight reading",
            type: "warning",
         });
         return;
      }

      try {
         await fetchAddBodyweightReading({
            token: user!.token,
            bodyweightReading: bodyweightInput,
         });

         toastify({
            message: "Successfully added bodyweight reading",
            type: "success",
         });

         setBodyweightInput(0);
      } catch (error) {
         console.error(error);
         toastify({
            message: "There was an error adding your bodyweight reading",
            type: "error",
         });
      }
   };

   const handleBodyweightInputChange = (event) => {
      if (Number.isNaN(Number(event.target.value))) {
         return;
      } else {
         setBodyweightInput(event.target.value);
      }
   };

   const handleFoodInputChange = (event) => {
      setNutritionInput(null);

      if (event.target.value === "") {
         setFoodSearchResults([]);
         setNutritionInput({
            nutritionId: "",
            description: "",
            energy: 0,
            protein: 0,
            totalFat: 0,
            carbohydrates: 0,
            fiber: 0,
            totalSugar: 0,
            addedSugar: 0,
            cholesterol: 0,
            sodium: 0,
         });
         return;
      }

      setNutritionInput((prev) => ({
         nutritionId: prev?.nutritionId ?? "",
         description: event.target.value,
         energy: prev?.energy ?? 0,
         protein: prev?.protein ?? 0,
         totalFat: prev?.totalFat ?? 0,
         carbohydrates: prev?.carbohydrates ?? 0,
         fiber: prev?.fiber ?? 0,
         totalSugar: prev?.totalSugar ?? 0,
         addedSugar: prev?.addedSugar ?? 0,
         cholesterol: prev?.cholesterol ?? 0,
         sodium: prev?.sodium ?? 0,
      }));
   };

   const updateSearchInput = (nutrition: NutritionType) => {
      setNutritionInput(nutrition);
      setFoodSearchResults([]);
   };

   const updateNutritionInput = (macros) => {
      setNutritionInput((prev) => ({
         nutritionId: "",
         description: prev?.description ?? "",
         energy: macros?.energy ?? prev?.energy ?? 0,
         protein: macros?.protein ?? prev?.protein ?? 0,
         totalFat: macros?.totalFat ?? prev?.totalFat ?? 0,
         carbohydrates: macros?.carbohydrates ?? prev?.carbohydrates ?? 0,
         fiber: macros?.fiber ?? prev?.fiber ?? 0,
         totalSugar: macros?.totalSugar ?? prev?.totalSugar ?? 0,
         addedSugar: macros?.addedSugar ?? prev?.addedSugar ?? 0,
         cholesterol: macros?.cholesterol ?? prev?.cholesterol ?? 0,
         sodium: macros?.sodium ?? prev?.sodium ?? 0,
      }));
   };

   const handleAddNutritionMetricClick = async () => {
      try {
         if (!nutritionInput?.description) {
            toastify({
               message: "Please enter a food item",
               type: "warning",
            });
            return;
         }

         if (
            !nutritionInput?.energy &&
            !nutritionInput?.protein &&
            !nutritionInput?.totalFat &&
            !nutritionInput?.carbohydrates &&
            !nutritionInput?.fiber &&
            !nutritionInput?.totalSugar &&
            !nutritionInput?.addedSugar &&
            !nutritionInput?.cholesterol &&
            !nutritionInput?.sodium
         ) {
            toastify({
               message: "Please enter at least one macronutrient value",
               type: "warning",
            });

            return;
         }

         await fetchAddNutritionMetric({
            token: user!.token,
            nutritionMetric: nutritionInput!,
         });

         toastify({
            message: "Successfully added nutrition metric",
            type: "success",
         });

         setNutritionInput({
            nutritionId: "",
            description: "",
            energy: 0,
            protein: 0,
            totalFat: 0,
            carbohydrates: 0,
            fiber: 0,
            totalSugar: 0,
            addedSugar: 0,
            cholesterol: 0,
            sodium: 0,
         });

         setFoodSearchResults([]);
      } catch (error) {
         console.error(error);

         toastify({
            message: "An error occurred while adding your nutrition metric",
            type: "error",
         });
      }
   };

   return (
      <div className={styles.container}>
         <div className={styles.bodyweightWrapper}>
            <h2 className={`sectionTitle ${styles.bodyWeightTitle}`}>
               Bodyweight
            </h2>
            <div className={styles.weightInputWrapper}>
               <input
                  className={`decimalValueInput`}
                  id="weight"
                  name="weight"
                  type="text"
                  inputMode="numeric"
                  onChange={handleBodyweightInputChange}
                  value={bodyweightInput}
               />
               <label htmlFor="weight">lb</label>
            </div>
            <button
               className={`standardBtn ${styles.addBodyweightBtn}`}
               onClick={handleAddBodyweightReading}
            >
               Add Bodyweight Metric
            </button>
         </div>
         <div className={styles.foodInputWrapper}>
            <h2 className={`sectionTitle`}>Nutrition</h2>
            <div className={styles.foodSearchInputWrapper}>
               <input
                  ref={searchInputRef}
                  className={`standardInput`}
                  type="text"
                  placeholder="search for food or add your own..."
                  value={nutritionInput?.description}
                  onChange={handleFoodInputChange}
               />
               <div className={styles.foodSearchDropdown}>
                  {foodSearchResults.map((foodItem: NutritionType) => (
                     <button
                        key={foodItem.nutritionId}
                        className={styles.foodSearchResultBtn}
                        onClick={() => updateSearchInput(foodItem)}
                     >
                        {foodItem.description}
                     </button>
                  ))}
               </div>
            </div>
            <CustomMacros
               nutritionInput={nutritionInput}
               updateNutritionInput={updateNutritionInput}
            />
            <button
               className={`standardBtn ${styles.addFoodBtn}`}
               onClick={handleAddNutritionMetricClick}
            >
               Add Nutrition Metric
            </button>
         </div>
      </div>
   );
}
