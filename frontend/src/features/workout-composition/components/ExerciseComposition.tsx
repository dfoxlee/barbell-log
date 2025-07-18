import {
   FaChevronLeft,
   FaChevronRight,
   FaPencilAlt,
   FaPlus,
   FaPlusCircle,
   FaToggleOff,
   FaTrash,
   FaTrashAlt,
} from "react-icons/fa";
import ExerciseSetRow from "./ExerciseSetRow";

import styles from "./ExerciseComposition.module.css";
import { useWorkoutCompositionStore } from "../../../stores/workoutCompositionStore";
import { useMemo } from "react";

export default function ExerciseComposition() {
   const workoutComposition = useWorkoutCompositionStore(
      (state) => state.workoutComposition
   );
   const currentExerciseViewOrder = useWorkoutCompositionStore(
      (state) => state.currentExerciseViewOrder
   );
   const currentExercise = useMemo(() => {
      return workoutComposition.exercises.find(
         (exercise) => exercise.exerciseOrder === currentExerciseViewOrder
      );
   }, [currentExerciseViewOrder, workoutComposition.exercises]);

   return (
      <div className={styles.container}>
         <div className={styles.exerciseNameInputWrapper}>
            <button className={styles.changeExerciseBtn}>
               <FaChevronLeft />
            </button>
            <input
               type="text"
               className="standardInput"
               placeholder="Exercise name..."
            />
            <button className={styles.changeExerciseBtn}>
               <FaChevronRight />
            </button>
         </div>
         <table className={styles.tableWrapper}>
            <thead>
               <tr>
                  <th className={styles.tableHeader}></th>
                  <th className={styles.tableHeader}>Set</th>
                  <th className={styles.tableHeader}>Reps</th>
                  <th className={styles.tableHeader}>Weight</th>
                  <th className={styles.tableHeader}></th>
               </tr>
            </thead>
            <tbody>
               {currentExercise.exerciseSets.map((exerciseSet) => {
                       exerciseSet.exerciseSetOrder ===
                       workoutComposition.currentExerciseSetViewOrder ? (
                          <tr key={exerciseSet.exerciseSetOrder}>
                             <th>
                                <div className={styles.toggleBtnsWrapper}>
                                   <div className={styles.toggleBtnWrapper}>
                                      <button
                                         className={`standardIconBtn ${styles.toggleBtn}`}
                                      >
                                         <FaToggleOff />
                                      </button>
                                      <span
                                         className={styles.toggleSetOptionText}
                                      >
                                         Warmup?
                                      </span>
                                   </div>
                                   <div className={styles.toggleBtnWrapper}>
                                      <button
                                         className={`standardIconBtn ${styles.toggleBtn}`}
                                      >
                                         <FaToggleOff />
                                      </button>
                                      <span
                                         className={styles.toggleSetOptionText}
                                      >
                                         Timed?
                                      </span>
                                   </div>
                                   <div className={styles.toggleBtnWrapper}>
                                      <button
                                         className={`standardIconBtn ${styles.toggleBtn}`}
                                      >
                                         <FaToggleOff />
                                      </button>
                                      <span
                                         className={styles.toggleSetOptionText}
                                      >
                                         Distance?
                                      </span>
                                   </div>
                                   <div className={styles.toggleBtnWrapper}>
                                      <button
                                         className={`standardIconBtn ${styles.toggleBtn}`}
                                      >
                                         <FaToggleOff />
                                      </button>
                                      <span
                                         className={styles.toggleSetOptionText}
                                      >
                                         Reps?
                                      </span>
                                   </div>
                                </div>
                             </th>
                             <th>{exerciseSet.exerciseSetOrder}</th>
                             <th>{exerciseSet.reps}</th>
                             <th>{exerciseSet.weight}</th>
                             <th className={styles.optionsWrapper}>
                                <button>
                                   <FaPencilAlt />
                                </button>
                                <button>
                                   <FaTrashAlt />
                                </button>
                             </th>
                          </tr>
                       ) : (
                          <ExerciseSetRow exerciseSet={exerciseSet} />
                       );
                    })}
            </tbody>
         </table>
         <button>
            <FaPlus />
            <span>Set</span>
         </button>
      </div>
   );
}
