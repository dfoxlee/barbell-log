import { useEffect, type ChangeEvent } from "react";
import { useUnitStore } from "../../stores/units.store";
import { useUserStore } from "../../stores/user.store";
import { fetchGetWeightUnits } from "../../services/common.services";
import toastify from "../../utils/toastify";

import styles from "./WeightUnitSelector.module.css";

interface WeightUnitSelectorPropsType {
   value: number;
   onChange:
      | ((event: ChangeEvent<HTMLSelectElement>) => void)
      | ((event: ChangeEvent<HTMLSelectElement>) => Promise<void>);
}

export default function WeightUnitSelector({
   value,
   onChange,
}: WeightUnitSelectorPropsType) {
   const weightUnits = useUnitStore((state) => state.weightUnits);
   const setWeightUnits = useUnitStore((state) => state.setWeightUnits);
   const token = useUserStore((state) => state.token);

   useEffect(() => {
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

      if (!weightUnits && token) {
         getWeightUnits();
      }
   }, [token]);

   return (
      <select
         className={styles.selector}
         name="weight-unit-selector"
         id="weight-unit-selector"
         onChange={onChange}
         value={value}
      >
         {weightUnits?.map((weightUnit) => (
            <option key={weightUnit.unitId} value={weightUnit.unitId}>
               {weightUnit.unitAbbreviation}
            </option>
         ))}
      </select>
   );
}
