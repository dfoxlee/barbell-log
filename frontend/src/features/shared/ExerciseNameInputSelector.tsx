import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import StandardIconBtn from "./StandardIconBtn";
import { useEffect, useRef, useState, useMemo } from "react";
import { filterExerciseSuggestions } from "../../utils/filters";

import styles from "./ExerciseNameInputSelector.module.css";

interface ExerciseNameInputSelectorProps {
   name: string;
   options?: string[] | null;
   onNameChange: (name: string) => void;
   onOrderChange: (name: string) => void;
}

type DropdownType = "CURRENT_EXERCISES" | "SUGGESTIONS" | null;

export default function ExerciseNameInputSelector({
   name,
   options,
   onNameChange,
   onOrderChange,
}: ExerciseNameInputSelectorProps) {
   const [dropdownType, setDropdownType] = useState<DropdownType>(null);
   const ref = useRef<HTMLDivElement>(null);

   const suggestions = useMemo(
      () =>
         dropdownType === "SUGGESTIONS" ? filterExerciseSuggestions(name) : [],
      [name, dropdownType]
   );

   useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
         if (ref.current && !ref.current.contains(event.target as Node)) {
            setDropdownType(null);
         }
      };

      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
         document.removeEventListener("mousedown", handleOutsideClick);
      };
   }, []);

   const handleDropdownClick = () => {
      setDropdownType((prev) =>
         prev === "CURRENT_EXERCISES" ? null : "CURRENT_EXERCISES"
      );
   };

   const handleOptionClick = (option: string) => {
      onOrderChange(option);
      setDropdownType(null);
   };

   const handleSuggestionClick = (suggestion: string) => {
      onNameChange(suggestion);
      setDropdownType(null);
   };

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newName = event.target.value;
      onNameChange(newName);

      if (newName.trim().length > 0) {
         setDropdownType("SUGGESTIONS");
      } else {
         setDropdownType(null);
      }
   };

   const dropdownContent = useMemo(() => {
      if (!dropdownType) return null;

      if (dropdownType === "CURRENT_EXERCISES" && options) {
         const filteredOptions = options.filter((o) => o !== name);
         const title = "Change Exercise";

         return {
            title,
            items: filteredOptions.map((o) => ({
               name: o === "" ? "New Exercise" : o,
               onClick: () => handleOptionClick(o),
            })),
         };
      }

      if (dropdownType === "SUGGESTIONS" && suggestions.length > 0) {
         const title = "Search Results";
         return {
            title,
            items: suggestions.map((name) => ({
               name,
               onClick: () => handleSuggestionClick(name),
            })),
         };
      }

      return null;
   }, [dropdownType, options, suggestions, name]);

   const isDropdownOpen = !!dropdownType;

   const availableOptions =
      options && options.length > 1
         ? options
         : options?.filter((o) => o !== "");

   return (
      <div className={styles.container} ref={ref}>
         <div className={styles.inputContainer}>
            <input
               className={styles.nameInput}
               type="text"
               value={name}
               onChange={handleInputChange}
               aria-expanded={isDropdownOpen}
               aria-controls="exercise-options"
               placeholder="Enter exercise name..."
            />
            {options && availableOptions && availableOptions.length > 0 && (
               <StandardIconBtn
                  Icon={
                     isDropdownOpen && dropdownType === "CURRENT_EXERCISES"
                        ? FaChevronUp
                        : FaChevronDown
                  }
                  onClick={handleDropdownClick}
                  aria-label={
                     isDropdownOpen && dropdownType === "CURRENT_EXERCISES"
                        ? "Close exercise list"
                        : "Open exercise list to change exercise"
                  }
               />
            )}
         </div>

         {isDropdownOpen && dropdownContent && (
            <div id="exercise-options" className={styles.dropdownWrapper}>
               <div className={styles.optionsList}>
                  <h5 className={styles.dropdownTitle}>
                     {dropdownContent.title}
                  </h5>
                  <div className={styles.seperator}></div>
                  {dropdownContent.items.map((item) => (
                     <button
                        className={styles.optionBtn}
                        key={item.name}
                        onClick={item.onClick}
                        type="button"
                     >
                        {item.name}
                     </button>
                  ))}
               </div>
            </div>
         )}
      </div>
   );
}
