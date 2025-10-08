import { type ChangeEvent } from "react";
import { useFetchWeightUnits } from "../../hooks/useFetchWeightUnits";

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
   const { weightUnits } = useFetchWeightUnits();

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
