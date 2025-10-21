import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import StandardIconBtn from "../../shared/StandardIconBtn";
import WholeValueInput from "../../shared/WholeValueInput";

import styles from "./RepsInput.module.css";

import toastify from "../../../utils/toastify";

interface RepsInputProps {
   completedReps: number;
   updateCompletedWorkout: ({
      field,
      value,
   }: {
      field: string;
      value: number | string;
   }) => void;
}

export default function RepsInput({
   completedReps,
   updateCompletedWorkout,
}: RepsInputProps) {
   const handleRepsIncrementClick = () => {
      const newReps = completedReps + 1;

      updateCompletedWorkout({
         field: "completedReps",
         value: newReps,
      });
   };

   const handleRepsDecrementClick = () => {
      if (completedReps <= 0) {
         return toastify({
            message: "Only positive values are allowed.",
            type: "info",
         });
      }

      const newReps = completedReps - 1;

      updateCompletedWorkout({
         field: "completedReps",
         value: newReps,
      });
   };

   const handleRepsChange = (completedReps: number) => {
      const decimalRegex = /^\d*\.?\d{0,2}$/;

      if (decimalRegex.test(completedReps.toString())) {
         updateCompletedWorkout({
            field: "completedReps",
            value: completedReps,
         });
      }
   };

   return (
      <div className={styles.container}>
         <StandardIconBtn
            Icon={FaChevronUp}
            onClick={handleRepsIncrementClick}
         />
         <WholeValueInput value={completedReps} onBlur={handleRepsChange} />
         <StandardIconBtn
            Icon={FaChevronDown}
            onClick={handleRepsDecrementClick}
         />
      </div>
   );
}
