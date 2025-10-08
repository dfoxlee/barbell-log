import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import StandardIconBtn from "../../shared/StandardIconBtn";
import FractionalValueInput from "../../shared/FractionalValueInput";
import DistanceUnitSelector from "../../shared/DistanceUnitSelector";
import type { ChangeEvent } from "react";

import styles from "./DistanceInput.module.css";

export default function DistanceInput() {
   const handleIncrementClick = () => {
      console.log("distance increment");
   };

   const handleDistanceChange = (value: number) => {
      console.log("distance change", value);
   };

   const handleDecrementClick = () => {
      console.log("distance decrement");
   };

   const handleDistanceUnitChange = (event: ChangeEvent<HTMLSelectElement>) => {
      console.log("distance unit change", event.target.value);
   };

   return (
      <div className={styles.container}>
         <div className={styles.inputWrapper}>
            <StandardIconBtn
               Icon={FaChevronUp}
               onClick={handleIncrementClick}
            />
            <FractionalValueInput value={0} onBlur={handleDistanceChange} />
            <StandardIconBtn
               Icon={FaChevronDown}
               onClick={handleDecrementClick}
            />
         </div>
         <DistanceUnitSelector value={0} onChange={handleDistanceUnitChange} />
      </div>
   );
}
