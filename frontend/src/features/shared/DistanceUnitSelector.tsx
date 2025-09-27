import { useEffect, type ChangeEvent } from "react";
import { useUnitStore } from "../../stores/units.store";
import { useUserStore } from "../../stores/user.store";
import toastify from "../../utils/toastify";
import { fetchGetDistanceUnits } from "../../services/common.services";

import styles from "./DistanceUnitSelector.module.css";

interface DistanceUnitSelectorPropsType {
   value: number;
   onChange:
      | ((event: ChangeEvent<HTMLSelectElement>) => void)
      | ((event: ChangeEvent<HTMLSelectElement>) => Promise<void>);
}

export default function DistanceUnitSelector({
   value,
   onChange,
}: DistanceUnitSelectorPropsType) {
   const distanceUnits = useUnitStore((state) => state.distanceUnits);
   const setDistanceUnits = useUnitStore((state) => state.setDistanceUnits);
   const token = useUserStore((state) => state.token);

   useEffect(() => {
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

      if (!distanceUnits && token) {
         getDistanceUnits();
      }
   }, [token]);

   return (
      <select
         className={styles.selector}
         name="distance-unit-selector"
         id="distance-unit-selector"
         onChange={onChange}
         value={value}
      >
         {distanceUnits?.map((unit) => (
            <option key={unit.unitId} value={unit.unitId}>
               {unit.unitAbbreviation}
            </option>
         ))}
      </select>
   );
}
