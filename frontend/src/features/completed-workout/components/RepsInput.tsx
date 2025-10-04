import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import StandardIconBtn from "../../shared/StandardIconBtn";

import styles from "./RepsInput.module.css";
import WholeValueInput from "../../shared/WholeValueInput";
import type { ChangeEvent } from "react";

export default function RepsInput({ reps }) {
   const handleRepsIncrementClick = () => {
      console.log("increment reps");
   };

   const handleRepsDecrementClick = () => {
      console.log("decrement reps");
   };

   const handleRepsChange = (reps: number) => {
      console.log("reps change", reps);
   };

   return (
      <div className={styles.container}>
         <StandardIconBtn
            Icon={FaChevronUp}
            onClick={handleRepsIncrementClick}
         />
         <WholeValueInput value={reps} onBlur={handleRepsChange} />
         <StandardIconBtn
            Icon={FaChevronDown}
            onClick={handleRepsDecrementClick}
         />
      </div>
   );
}
