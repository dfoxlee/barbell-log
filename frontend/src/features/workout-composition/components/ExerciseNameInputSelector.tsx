import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import StandardIconBtn from "../../shared/StandardIconBtn";
import { useEffect, useRef, useState, useMemo, type ChangeEvent } from "react";
import { filterExerciseSuggestions } from "../../../utils/filters";
import { useWorkoutStore } from "../../../stores/workout.store";
import type { WorkoutType } from "../../../types/workout.types";

import styles from "./ExerciseNameInputSelector.module.css";

export default function ExerciseNameInputSelector() {
   const workoutComposition = useWorkoutStore(
      (state) => state.workoutComposition
   );
   const setWorkoutComposition = useWorkoutStore(
      (state) => state.setWorkoutComposition
   );
   const currentExerciseOrder = useWorkoutStore(
      (state) => state.currentExerciseOrder
   );
   const setCurrentExerciseOrder = useWorkoutStore(
      (state) => state.setCurrentExerciseOrder
   );
   const [dropdownType, setDropdownType] = useState<
      "SEARCH" | "NAVIGATE" | null
   >(null);
   const [filteredExercises, setFilteredExercises] = useState<string[] | null>(
      null
   );
   const currentExercise = useMemo(() => {
      return workoutComposition?.exercises.find(
         (e) => e.exerciseOrder === currentExerciseOrder
      );
   }, [workoutComposition?.exercises, currentExerciseOrder]);

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

      const updatedExercise = {
         ...currentExercise,
         exerciseName: event.target.value,
      };

      const updatedWorkout = {
         ...workoutComposition,
         exercises: workoutComposition?.exercises.map((e) =>
            e.exerciseOrder === updatedExercise.exerciseOrder
               ? updatedExercise
               : e
         ),
      };

      setWorkoutComposition(updatedWorkout as WorkoutType);

      if (event.target.value.trim().length) {
         setDropdownType("SEARCH");
      } else {
         setDropdownType(null);
      }
   };

   const handleExerciseNavigationClick = (exerciseOrder: number) => {
      setDropdownType(null);
      setCurrentExerciseOrder(exerciseOrder);
   };

   const handleOptionSelection = (option: string) => {
      setDropdownType(null);

      const updatedExercise = {
         ...currentExercise,
         exerciseName: option,
      };

      const updatedWorkout = {
         ...workoutComposition,
         exercises: workoutComposition?.exercises.map((e) =>
            e.exerciseOrder === updatedExercise.exerciseOrder
               ? updatedExercise
               : e
         ),
      };

      setWorkoutComposition(updatedWorkout as WorkoutType);
   };

   return (
      <div className={styles.container} ref={ref}>
         <div className={styles.inputContainer}>
            <input
               className={styles.nameInput}
               type="text"
               value={currentExercise?.exerciseName ?? ""}
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
                     ? workoutComposition?.exercises?.map((e) => (
                          <button
                             className={
                                e.exerciseOrder ===
                                currentExercise?.exerciseOrder
                                   ? `${styles.optionBtn} ${styles.currentOption}`
                                   : styles.optionBtn
                             }
                             disabled={
                                e.exerciseOrder ===
                                currentExercise?.exerciseOrder
                             }
                             onClick={() =>
                                handleExerciseNavigationClick(e.exerciseOrder)
                             }
                          >
                             {e.exerciseName.length
                                ? `${e.exerciseOrder}. ${e.exerciseName}`
                                : `Exercise ${e.exerciseOrder}`}
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
