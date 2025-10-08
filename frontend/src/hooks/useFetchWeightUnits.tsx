import { useEffect } from "react";
import { useUnitStore } from "../stores/units.store";
import { useUserStore } from "../stores/user.store";
import { fetchGetWeightUnits } from "../services/common.services";
import toastify from "../utils/toastify";

export const useFetchWeightUnits = () => {
   const weightUnits = useUnitStore((state) => state.weightUnits);
   const setWeightUnits = useUnitStore((state) => state.setWeightUnits);
   const token = useUserStore((state) => state.token);

   const getWeightUnits = async () => {
      try {
         const weightUnitsRequest = await fetchGetWeightUnits({ token });

         setWeightUnits(weightUnitsRequest.weightUnits);
      } catch (error) {
         console.error("An error occurred getting weight units: ", error);

         toastify({
            message:
               "An error occurred getting weight units. Please try again later.",
            type: "error",
         });
      }
   };

   useEffect(() => {
      if (!weightUnits && token) {
         getWeightUnits();
      }
   }, [token]);

   return { weightUnits, getWeightUnits };
};
