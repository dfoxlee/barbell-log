import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import StandardIconBtn from "../../shared/StandardIconBtn";
import FractionalValueInput from "../../shared/FractionalValueInput";
import DistanceUnitSelector from "../../shared/DistanceUnitSelector";
import type { ChangeEvent } from "react";

import styles from "./DistanceInput.module.css";
import toastify from "../../../utils/toastify";

interface DistanceInputProps {
   completedDistance: number;
   completedDistanceUnit: number;
   updateCompletedWorkout: ({
      field,
      value,
   }: {
      field: string;
      value: number | string;
   }) => void;
}

export default function DistanceInput({
   completedDistance,
   completedDistanceUnit,
   updateCompletedWorkout,
}: DistanceInputProps) {
   const handleIncrementClick = () => {
      const newValue = completedDistance + 1;

      updateCompletedWorkout({
         field: "completedDistance",
         value: newValue,
      });
   };

   const handleDistanceChange = (value: number) => {
      const wholeNumberRegex = /^\d*$/;

      if (wholeNumberRegex.test(value.toString())) {
         updateCompletedWorkout({
            field: "completedDistance",
            value,
         });
      }
   };

   const handleDecrementClick = () => {
      const updatedValue = completedDistance - 1;

      if (updatedValue < 0) {
         return toastify({
            message: "Distance must be positive.",
            type: "info",
         });
      }

      updateCompletedWorkout({
         field: "completedDistance",
         value: updatedValue,
      });
   };

   const handleDistanceUnitChange = (event: ChangeEvent<HTMLSelectElement>) => {
      updateCompletedWorkout({
         field: "completedDistanceUnit",
         value: event.target.value,
      });
   };

   return (
      <div className={styles.container}>
         <div className={styles.inputWrapper}>
            <StandardIconBtn
               Icon={FaChevronUp}
               onClick={handleIncrementClick}
            />
            <FractionalValueInput
               value={completedDistance}
               onBlur={handleDistanceChange}
            />
            <StandardIconBtn
               Icon={FaChevronDown}
               onClick={handleDecrementClick}
            />
         </div>
         <DistanceUnitSelector
            value={completedDistanceUnit}
            onChange={handleDistanceUnitChange}
         />
      </div>
   );
}
