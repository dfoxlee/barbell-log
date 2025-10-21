import { useEffect } from "react";
import { useUnitStore } from "../stores/units.store";
import { useUserStore } from "../stores/user.store";
import { fetchGetDistanceUnits } from "../services/common.services";
import toastify from "../utils/toastify";

export const useFetchDistanceUnits = () => {
   const distanceUnits = useUnitStore((state) => state.distanceUnits);
   const setDistanceUnits = useUnitStore((state) => state.setDistanceUnits);
   const token = useUserStore((state) => state.token);

   const getDistanceUnits = async () => {
      try {
         const distanceUnitsRequest = await fetchGetDistanceUnits({ token });

         setDistanceUnits(distanceUnitsRequest.distanceUnits);
      } catch (error) {
         console.error(
            "An error occurred getting distance units. Please try again later.",
            error
         );

         toastify({
            message:
               "An error occurred getting distance units. Please try again later.",
            type: "error",
         });
      }
   };

   useEffect(() => {
      if (!distanceUnits && token) {
         getDistanceUnits();
      }
   }, [token]);

   return { distanceUnits, getDistanceUnits };
};
