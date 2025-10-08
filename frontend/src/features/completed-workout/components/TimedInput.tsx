import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import StandardIconBtn from "../../shared/StandardIconBtn";
import WholeValueInput from "../../shared/WholeValueInput";

import styles from "./TimedInput.module.css";

export default function TimedInput() {
   const handleIncrementHr = () => {
      console.log("increment hr");
   };

   const handleHrChange = (value: number) => {
      console.log("hr change", value);
   };

   const handleDecrementHr = () => {
      console.log("decrement hr");
   };

   const handleIncrementMin = () => {
      console.log("increment min");
   };

   const handleMinChange = (value: number) => {
      console.log("min change", value);
   };

   const handleDecrementMin = () => {
      console.log("decrement min");
   };

   const handleIncrementSec = () => {
      console.log("increment sec");
   };

   const handleSecChange = (value: number) => {
      console.log("sec change", value);
   };

   const handleDecrementSec = () => {
      console.log("decrement sec");
   };

   return (
      <div className={styles.container}>
         <div className={styles.inputWrapper}>
            <StandardIconBtn Icon={FaChevronUp} onClick={handleIncrementHr} />
            <WholeValueInput value={0} onBlur={handleHrChange} />
            <StandardIconBtn Icon={FaChevronDown} onClick={handleDecrementHr} />
         </div>
         <div className={styles.inputWrapper}>
            <StandardIconBtn Icon={FaChevronUp} onClick={handleIncrementMin} />
            <WholeValueInput value={0} onBlur={handleMinChange} />
            <StandardIconBtn
               Icon={FaChevronDown}
               onClick={handleDecrementMin}
            />
         </div>
         <div className={styles.inputWrapper}>
            <StandardIconBtn Icon={FaChevronUp} onClick={handleIncrementSec} />
            <WholeValueInput value={0} onBlur={handleSecChange} />
            <StandardIconBtn
               Icon={FaChevronDown}
               onClick={handleDecrementSec}
            />
         </div>
      </div>
   );
}
