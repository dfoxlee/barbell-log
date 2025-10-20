import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import StandardIconBtn from "../../shared/StandardIconBtn";
import { useEffect, useRef, useState, useMemo, type ChangeEvent } from "react";
import { filterExerciseSuggestions } from "../../../utils/filters";
import { useCompletedWorkoutStore } from "../../../stores/completed-workout.store";
import type { CompletedWorkoutType } from "../../../types/completed-workout.types";

import styles from "./CompletedExerciseNameInputSelector.module.css";

export default function CompletedExerciseNameInputSelector() {
   const completedWorkout = useCompletedWorkoutStore(
      (state) => state.completedWorkout
   );
   const setCompletedWorkout = useCompletedWorkoutStore(
      (state) => state.setCompletedWorkout
   );
   const currentCompletedExerciseOrder = useCompletedWorkoutStore(
      (state) => state.currentCompletedExerciseOrder
   );
   const setCurrentCompletedExerciseOrder = useCompletedWorkoutStore(
      (state) => state.setCurrentCompletedExerciseOrder
   );
   const setCurrentCompletedExerciseSetOrder = useCompletedWorkoutStore(
      (state) => state.setCurrentCompletedExerciseSetOrder
   );
   const [dropdownType, setDropdownType] = useState<
      "SEARCH" | "NAVIGATE" | null
   >(null);
   const [filteredExercises, setFilteredExercises] = useState<string[] | null>(
      null
   );
   const currentExercise = useMemo(() => {
      return completedWorkout?.completedExercises.find(
         (e) => e.completedExerciseOrder === currentCompletedExerciseOrder
      );
   }, [completedWorkout?.completedExercises, currentCompletedExerciseOrder]);

   const ref = useRef<HTMLDivElement>(null);

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
      setDropdownType((prev) => (prev === "NAVIGATE" ? null : "NAVIGATE"));
   };

   const handleExerciseNameChange = (event: ChangeEvent<HTMLInputElement>) => {
      setFilteredExercises(filterExerciseSuggestions(event.target.value));
      console.log(filterExerciseSuggestions(event.target.value));

      const updatedExercise = {
         ...currentExercise,
         exerciseName: event.target.value,
      };

      const updatedWorkout = {
         ...completedWorkout,
         exercises: completedWorkout?.completedExercises.map((e) =>
            e.completedExerciseOrder === updatedExercise.completedExerciseOrder
               ? updatedExercise
               : e
         ),
      };

      setCompletedWorkout(updatedWorkout as CompletedWorkoutType);

      if (event.target.value.trim().length) {
         setDropdownType("SEARCH");
      } else {
         setDropdownType(null);
      }
   };

   const handleExerciseNavigationClick = (exerciseOrder: number) => {
      setDropdownType(null);
      setCurrentCompletedExerciseSetOrder(1);
      setCurrentCompletedExerciseOrder(exerciseOrder);
   };

   const handleOptionSelection = (option: string) => {
      setDropdownType(null);

      const updatedExercise = {
         ...currentExercise,
         exerciseName: option,
      };

      const updatedWorkout = {
         ...completedWorkout,
         exercises: completedWorkout?.completedExercises.map((e) =>
            e.completedExerciseOrder === updatedExercise.completedExerciseOrder
               ? updatedExercise
               : e
         ),
      };

      setCompletedWorkout(updatedWorkout as CompletedWorkoutType);
   };

   return (
      <div className={styles.container} ref={ref}>
         <div className={styles.inputContainer}>
            <input
               className={styles.nameInput}
               type="text"
               value={currentExercise?.completedExerciseName ?? ""}
               placeholder="Enter exercise name..."
               onChange={handleExerciseNameChange}
            />
            <StandardIconBtn
               Icon={dropdownType === "NAVIGATE" ? FaChevronUp : FaChevronDown}
               onClick={handleDropdownClick}
            />
         </div>
         {dropdownType && (
            <div id="exercise-options" className={styles.dropdownWrapper}>
               <div className={styles.optionsList}>
                  <h5 className={styles.dropdownTitle}>
                     {dropdownType === "NAVIGATE"
                        ? "Change Exercise"
                        : "Common Exercises"}
                  </h5>
                  <div className={styles.seperator}></div>
                  {dropdownType === "NAVIGATE"
                     ? completedWorkout?.completedExercises?.map((e) => (
                          <button
                             key={e.completedExerciseOrder}
                             className={
                                e.completedExerciseOrder ===
                                currentExercise?.completedExerciseOrder
                                   ? `${styles.optionBtn} ${styles.currentOption}`
                                   : styles.optionBtn
                             }
                             disabled={
                                e.completedExerciseOrder ===
                                currentExercise?.completedExerciseOrder
                             }
                             onClick={() =>
                                handleExerciseNavigationClick(
                                   e.completedExerciseOrder
                                )
                             }
                          >
                             {e.completedExerciseName.length
                                ? `${e.completedExerciseOrder}. ${e.completedExerciseName}`
                                : `Exercise ${e.completedExerciseOrder}`}
                          </button>
                       ))
                     : filteredExercises?.length
                     ? filteredExercises?.map((e) => (
                          <button
                             className={styles.optionBtn}
                             key={e}
                             onClick={() => handleOptionSelection(e)}
                          >
                             {e}
                          </button>
                       ))
                     : "No exercise matches"}
               </div>
            </div>
         )}
      </div>
   );
}
