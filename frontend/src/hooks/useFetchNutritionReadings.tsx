import { useEffect } from "react";
import {
   fetchGetGroupedNutritionReadings,
   fetchGetNutritionReadings,
} from "../services/nutrition.services";
import { useReadingsStore } from "../stores/reading.store";
import { useUserStore } from "../stores/user.store";
import toastify from "../utils/toastify";

export const useFetchNutritionReadings = () => {
   const nutritionReadings = useReadingsStore(
      (state) => state.nutritionReadings
   );
   const groupedNutritionReadings = useReadingsStore(
      (state) => state.groupedNutritionReadings
   );
   const setNutritionReadings = useReadingsStore(
      (state) => state.setNutritionReadings
   );
   const setGroupedNutritionReadings = useReadingsStore(
      (state) => state.setGroupedNutritionReadings
   );
   const token = useUserStore((state) => state.token);

   const getNutritionReadings = async () => {
      try {
         const nutritionReadingsRequest = await fetchGetNutritionReadings({
            token: token!,
         });
         setNutritionReadings(nutritionReadingsRequest.nutritionReadings);
      } catch (error) {
         console.error("An error occurred getting nutrition readings.", error);

         toastify({
            message:
               "An error occurred getting nutrition readings. Please try again later.",
            type: "error",
         });
      }
   };

   const getGroupedNutritionReadings = async () => {
      try {
         const nutritionReadingsRequest =
            await fetchGetGroupedNutritionReadings({
               token: token!,
            });
         setGroupedNutritionReadings(
            nutritionReadingsRequest.nutritionReadings
         );
      } catch (error) {
         console.error("An error occurred getting nutrition readings.", error);

         toastify({
            message:
               "An error occurred getting nutrition readings. Please try again later.",
            type: "error",
         });
      }
   };

   useEffect(() => {
      if (!nutritionReadings && token) {
         getNutritionReadings();
      }

      if (!groupedNutritionReadings && token) {
         getGroupedNutritionReadings();
      }
   }, [token]);

   return { getNutritionReadings, getGroupedNutritionReadings };
};
