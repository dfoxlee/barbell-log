import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { exerciseNames } from "../../constants/exercises";

import styles from "./ExerciseNameInput.module.css";

interface ExerciseNameInputPropsType {
   value: string;
   onChange: (value: string) => void;
}

export default function ExerciseNameInput({
   value,
   onChange,
}: ExerciseNameInputPropsType) {
   const inputRef = useRef(null);
   const [exerciseNameSuggestions, setExerciseNameSuggestions] = useState<
      string[]
   >([]);

   useEffect(() => {
      document.addEventListener("click", () => {
         if (inputRef.current !== document.activeElement) {
            setExerciseNameSuggestions([]);
         }
      });

      return () =>
         document.removeEventListener("click", () => {
            if (inputRef.current !== document.activeElement) {
               setExerciseNameSuggestions([]);
            }
         });
   }, []);

   const handleExerciseNameChange = (event: ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;

      onChange(inputValue);

      if (inputValue.trim().length) {
         const searchTerms = inputValue
            .toLowerCase()
            .trim()
            .split(/\s+/)
            .filter((term) => term.length > 0);

         if (searchTerms.length > 0) {
            const filteredExerciseNames = exerciseNames.filter((name) => {
               const lowerCaseName = name.toLowerCase();

               return searchTerms.every((term) => lowerCaseName.includes(term));
            });
            setExerciseNameSuggestions(filteredExerciseNames);
         } else {
            setExerciseNameSuggestions([]);
         }
      } else {
         setExerciseNameSuggestions([]);
      }
   };

   const handleExerciseNameOptionClick = (exerciseName: string) => {
      onChange(exerciseName);
      setExerciseNameSuggestions([]);
   };

   return (
      <div className={styles.container}>
         <input
            ref={inputRef}
            className={styles.input}
            value={value}
            onChange={handleExerciseNameChange}
            placeholder="exercise name..."
         />
         <div className={styles.dropdownWrapper}>
            {exerciseNameSuggestions.map((name) => (
               <button
                  key={name}
                  className={styles.exerciseNameOptionBtn}
                  onClick={() => handleExerciseNameOptionClick(name)}
               >
                  {name}
               </button>
            ))}
         </div>
      </div>
   );
}
