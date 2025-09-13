import type { NutritionType } from "../../../types/metricTypes";
import styles from "./CustomMacros.module.css";

export default function CustomMacros({
   nutritionInput,
   updateNutritionInput,
}: {
   nutritionInput: NutritionType | null;
   updateNutritionInput: (updatedInput: Partial<NutritionType>) => void;
}) {
   const handleEnergyChange = (event) => {
      updateNutritionInput({
         ...nutritionInput,
         energy: Number(event.target.value),
      });
   };

   const handleProteinChange = (event) => {
      updateNutritionInput({
         ...nutritionInput,
         protein: Number(event.target.value),
      });
   };

   const handleCarbohydratesChange = (event) => {
      updateNutritionInput({
         ...nutritionInput,
         carbohydrates: Number(event.target.value),
      });
   };

   const handleFiberChange = (event) => {
      updateNutritionInput({
         ...nutritionInput,
         fiber: Number(event.target.value),
      });
   };

   const handleTotalSugarChange = (event) => {
      updateNutritionInput({
         ...nutritionInput,
         totalSugar: Number(event.target.value),
      });
   };

   const handleAddedSugarChange = (event) => {
      updateNutritionInput({
         ...nutritionInput,
         addedSugar: Number(event.target.value),
      });
   };

   const handleFatChange = (event) => {
      updateNutritionInput({
         ...nutritionInput,
         totalFat: Number(event.target.value),
      });
   };

   const handleSodiumChange = (event) => {
      updateNutritionInput({
         ...nutritionInput,
         sodium: Number(event.target.value),
      });
   };

   const handleCholesterolChange = (event) => {
      updateNutritionInput({
         ...nutritionInput,
         cholesterol: Number(event.target.value),
      });
   };

   return (
      <div className={styles.container}>
         <div className={styles.inputWrapper}>
            <label
               className={`subText ${styles.metricInputLabel}`}
               htmlFor="calories"
            >
               calories / energy (kcal)
            </label>
            <input
               className={`decimalValueInput`}
               type="number"
               inputMode="numeric"
               name="calories"
               id="calories"
               value={nutritionInput.energy}
               onChange={handleEnergyChange}
            />
         </div>
         <div className={styles.inputWrapper}>
            <label
               className={`subText ${styles.metricInputLabel}`}
               htmlFor="protien"
            >
               protien (g)
            </label>
            <input
               className={`decimalValueInput`}
               type="number"
               inputMode="numeric"
               name="protien"
               id="protien"
               value={nutritionInput?.protein}
               onChange={handleProteinChange}
            />
         </div>
         <div className={styles.inputWrapper}>
            <label
               className={`subText ${styles.metricInputLabel}`}
               htmlFor="carbohydrates"
            >
               carbohydrates (g)
            </label>
            <input
               className={`decimalValueInput`}
               type="number"
               inputMode="numeric"
               name="carbohydrates"
               id="carbohydrates"
               value={nutritionInput?.carbohydrates}
               onChange={handleCarbohydratesChange}
            />
         </div>
         <div className={styles.inputWrapper}>
            <label
               className={`subText ${styles.metricInputLabel}`}
               htmlFor="fiber"
            >
               fiber (g)
            </label>
            <input
               className={`decimalValueInput`}
               type="number"
               inputMode="numeric"
               name="fiber"
               id="fiber"
               value={nutritionInput?.fiber}
               onChange={handleFiberChange}
            />
         </div>
         <div className={styles.inputWrapper}>
            <label
               className={`subText ${styles.metricInputLabel}`}
               htmlFor="added-sugars"
            >
               total sugars (g)
            </label>
            <input
               className={`decimalValueInput`}
               type="number"
               inputMode="numeric"
               name="added-sugars"
               id="added-sugars"
               value={nutritionInput?.totalSugar}
               onChange={handleTotalSugarChange}
            />
         </div>
         <div className={styles.inputWrapper}>
            <label
               className={`subText ${styles.metricInputLabel}`}
               htmlFor="added-sugars"
            >
               added sugars (g)
            </label>
            <input
               className={`decimalValueInput`}
               type="number"
               inputMode="numeric"
               name="added-sugars"
               id="added-sugars"
               value={nutritionInput?.addedSugar}
               onChange={handleAddedSugarChange}
            />
         </div>
         <div className={styles.inputWrapper}>
            <label
               className={`subText ${styles.metricInputLabel}`}
               htmlFor="fat"
            >
               fat (g)
            </label>
            <input
               className={`decimalValueInput`}
               type="number"
               inputMode="numeric"
               name="fat"
               id="fat"
               value={nutritionInput?.totalFat}
               onChange={handleFatChange}
            />
         </div>
         <div className={styles.inputWrapper}>
            <label
               className={`subText ${styles.metricInputLabel}`}
               htmlFor="sodium"
            >
               sodium (mg)
            </label>
            <input
               className={`decimalValueInput`}
               type="number"
               inputMode="numeric"
               name="sodium"
               id="sodium"
               value={nutritionInput?.sodium}
               onChange={handleSodiumChange}
            />
         </div>
         <div className={styles.inputWrapper}>
            <label
               className={`subText ${styles.metricInputLabel}`}
               htmlFor="cholesterol"
            >
               cholesterol (mg)
            </label>
            <input
               className={`decimalValueInput`}
               type="number"
               inputMode="numeric"
               name="cholesterol"
               id="cholesterol"
               value={nutritionInput?.cholesterol}
               onChange={handleCholesterolChange}
            />
         </div>
      </div>
   );
}
