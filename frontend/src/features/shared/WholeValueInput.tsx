import { useEffect, useState, type ChangeEvent } from "react";
import styles from "./WholeValueInput.module.css";

interface WholeValueInputPropsType {
   value: number;
   onBlur: (value: number) => void;
}

export default function WholeValueInput({
   value,
   onBlur,
}: WholeValueInputPropsType) {
   const [inputValue, setInputValue] = useState("");

   useEffect(() => {
      setInputValue(value.toString());
   }, [value]);

   const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (
         !parseInt(event.target.value) &&
         event.target.value !== "0" &&
         event.target.value !== ""
      ) {
         return;
      }

      setInputValue(event.target.value);
   };

   const handleInputBlur = () => {
      console.log("blur", inputValue);
      if (inputValue === "" || !parseInt(inputValue)) {
         setInputValue("0");
         return onBlur(0);
      }

      onBlur(parseInt(inputValue));
   };

   return (
      <input
         className={styles.input}
         value={inputValue}
         type="text"
         inputMode="numeric"
         onChange={handleInputChange}
         onBlur={handleInputBlur}
      />
   );
}
