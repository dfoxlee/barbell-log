import { useEffect, useState } from "react";
import { useUserStore } from "../../stores/userStore";
import Seperator from "../shared/Seperator";

import styles from "./Metrics.module.css";
import CustomMacros from "./components/CustomMacros";
import {
   fetchAddBodyweightReading,
   fetchGetNutritionSearch,
} from "../../services/metricsServices";
import toastify from "../../utils/toastify";

export default function Metrics() {
   const user = useUserStore((state) => state.user);
   const [bodyweightInput, setBodyweightInput] = useState(0);
   const [foodInput, setFoodInput] = useState("");
   const [foodSearchResults, setFoodSearchResults] = useState([]);

   useEffect(() => {
      if (foodInput.length === 0) return;

      const getFoodSearchResults = async () => {
         try {
            const foodSearch = await fetchGetNutritionSearch({
               token: user!.token,
               searchValue: foodInput,
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
   }, [foodInput]);

   console.log(foodSearchResults);

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
      console.log(event.target.value, isNaN(Number(event.target.value)));

      if (Number.isNaN(Number(event.target.value))) {
         return;
      } else {
         setBodyweightInput(event.target.value);
      }
   };

   const handleFoodInputChange = (event) => {
      setFoodInput(event.target.value);
   };

   return (
      <div className={styles.container}>
         <h2 className={`pageTitle`}>Metrics</h2>
         <Seperator />
         <div className={styles.weightInputWrapper}>
            <label className={`subText`} htmlFor="weight">
               Weight
            </label>
            <input
               className={`decimalValueInput`}
               id="weight"
               name="weight"
               type="text"
               inputMode="numeric"
               onChange={handleBodyweightInputChange}
               value={bodyweightInput}
            />
            <span className={`regularText`}>
               {user?.weightUnitPreference ?? "lb"}
            </span>
            <button
               className={`standardBtn`}
               onClick={handleAddBodyweightReading}
            >
               Add Reading
            </button>
         </div>
         <div className={styles.foodInputWrapper}>
            <div>
               <input
                  className={`standardInput`}
                  type="text"
                  placeholder="search for food or enter custom..."
                  value={foodInput}
                  onChange={handleFoodInputChange}
               />
               <div>
                  {foodSearchResults.map((foodItem) => (
                     <p key={foodItem.nutritionId}>{foodItem.description}</p>
                  ))}
               </div>
            </div>
            <button className={`standardBtn`}>Add Food</button>
         </div>
         <CustomMacros />
      </div>
   );
}
