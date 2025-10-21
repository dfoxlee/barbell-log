import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import StandardIconBtn from "../../shared/StandardIconBtn";
import WholeValueInput from "../../shared/WholeValueInput";

import styles from "./TimedInput.module.css";
import toastify from "../../../utils/toastify";

interface TimedInputProps {
   completedHr: number;
   completedMin: number;
   completedSec: number;
   updateCompletedWorkout: ({
      field,
      value,
   }: {
      field: string;
      value: number | string;
   }) => void;
}

export default function TimedInput({
   completedHr,
   completedMin,
   completedSec,
   updateCompletedWorkout,
}: TimedInputProps) {
   const handleIncrementHr = () => {
      const updatedHr = completedHr + 1;

      updateCompletedWorkout({
         field: "completedHr",
         value: updatedHr,
      });
   };

   const handleHrChange = (value: number) => {
      const decimalRegex = /^\d*\.?\d{0,2}$/;

      if (decimalRegex.test(value.toString())) {
         updateCompletedWorkout({
            field: "completedHr",
            value: value,
         });
      }
   };

   const handleDecrementHr = () => {
      if (completedHr <= 0) {
         return toastify({
            message: "Hours must be positive.",
            type: "info",
         });
      }

      const updatedHr = completedHr - 1;

      updateCompletedWorkout({
         field: "completedHr",
         value: updatedHr,
      });
   };

   const handleIncrementMin = () => {
      const updatedMin = completedMin + 1;

      updateCompletedWorkout({
         field: "completedMin",
         value: updatedMin,
      });
   };

   const handleMinChange = (value: number) => {
      const decimalRegex = /^\d*\.?\d{0,2}$/;

      if (decimalRegex.test(value.toString())) {
         updateCompletedWorkout({
            field: "completedMin",
            value: value,
         });
      }
   };

   const handleDecrementMin = () => {
      if (completedMin <= 0) {
         return toastify({
            message: "Minutes must be positive.",
            type: "info",
         });
      }

      const updatedMin = completedMin - 1;

      updateCompletedWorkout({
         field: "completedMin",
         value: updatedMin,
      });
   };

   const handleIncrementSec = () => {
      const updatedSec = completedSec + 1;

      updateCompletedWorkout({
         field: "completedSec",
         value: updatedSec,
      });
   };

   const handleSecChange = (value: number) => {
      const decimalRegex = /^\d*\.?\d{0,2}$/;

      if (decimalRegex.test(value.toString())) {
         updateCompletedWorkout({
            field: "completedSec",
            value: value,
         });
      }
   };

   const handleDecrementSec = () => {
      if (completedSec <= 0) {
         return toastify({
            message: "Minutes must be positive.",
            type: "info",
         });
      }

      const updatedSec = completedSec - 1;

      updateCompletedWorkout({
         field: "completedSec",
         value: updatedSec,
      });
   };

   return (
      <div className={styles.container}>
         <div className={styles.inputWrapper}>
            <StandardIconBtn Icon={FaChevronUp} onClick={handleIncrementHr} />
            <WholeValueInput value={completedHr} onBlur={handleHrChange} />
            <StandardIconBtn Icon={FaChevronDown} onClick={handleDecrementHr} />
         </div>
         <div className={styles.inputWrapper}>
            <StandardIconBtn Icon={FaChevronUp} onClick={handleIncrementMin} />
            <WholeValueInput value={completedMin} onBlur={handleMinChange} />
            <StandardIconBtn
               Icon={FaChevronDown}
               onClick={handleDecrementMin}
            />
         </div>
         <div className={styles.inputWrapper}>
            <StandardIconBtn Icon={FaChevronUp} onClick={handleIncrementSec} />
            <WholeValueInput value={completedSec} onBlur={handleSecChange} />
            <StandardIconBtn
               Icon={FaChevronDown}
               onClick={handleDecrementSec}
            />
         </div>
      </div>
   );
}
