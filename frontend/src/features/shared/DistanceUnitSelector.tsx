import { useEffect, type ChangeEvent } from "react";
import { useUnitStore } from "../../stores/units.store";
import { useUserStore } from "../../stores/user.store";
import toastify from "../../utils/toastify";
import { fetchGetDistanceUnits } from "../../services/common.services";

import styles from "./DistanceUnitSelector.module.css";
import { useFetchDistanceUnits } from "../../hooks/useFetchDistanceUnits";

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
   const { distanceUnits } = useFetchDistanceUnits();

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
