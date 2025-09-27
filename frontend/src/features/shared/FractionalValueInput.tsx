import { useEffect, useState, type ChangeEvent } from "react";
import styles from "./FractionalValueInput.module.css";

interface FractionalValueInputPropsType {
   value: number;
   onBlur: (value: number) => void;
}

export default function FractionalValueInput({
   value,
   onBlur,
}: FractionalValueInputPropsType) {
   const [inputValue, setInputValue] = useState("");

   useEffect(() => {
      setInputValue(value.toString());
   }, [value]);

   const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (
         !parseFloat(event.target.value) &&
         event.target.value !== "0" &&
         event.target.value !== "" &&
         event.target.value !== "."
      ) {
         return;
      }

      setInputValue(event.target.value);
   };

   const handleInputBlur = () => {
      if (inputValue === "" || inputValue === ".") {
         setInputValue("0");
         return onBlur(0);
      }

      onBlur(parseFloat(inputValue));
   };

   return (
      <input
         className={styles.input}
         value={inputValue}
         type="text"
         inputMode="decimal"
         onChange={handleInputChange}
         onBlur={handleInputBlur}
      />
   );
}
