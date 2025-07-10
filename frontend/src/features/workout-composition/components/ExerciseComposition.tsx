import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { useWorkoutCompositionContext } from "../../../hooks/useWorkoutCompositionContext";

import styles from "./ExerciseComposition.module.css";

export default function ExerciseComposition({ exercise }) {
   const { workoutCompositionDispatch } = useWorkoutCompositionContext();

   const handleExerciseNameInput = (event) => {
      const newExercise = {
         ...exercise,
         exerciseName: event.target.value,
      };

      workoutCompositionDispatch({
         type: "UPDATE-EXERCISE",
         payload: newExercise,
      });
   };

   const handleDeleteExerciseClick = () => {
      workoutCompositionDispatch({
         type: "DELETE-EXERCISE",
         payload: exercise.exerciseOrder,
      });
   };

   const handleDeleteSetClick = (deleteSetOrder) => {
      const updatedSets = exercise.sets.filter(
         (set) => set.setOrder !== deleteSetOrder
      );

      const updatedExercise = {
         ...exercise,
         sets: updatedSets.map((set, index) => ({
            ...set,
            setOrder: index + 1,
         })),
      };

      workoutCompositionDispatch({
         type: "UPDATE-EXERCISE",
         payload: updatedExercise,
      });
   };

   const handleRepsInput = (setOrder, reps) => {
      const updateSet = exercise.sets.find((set) => set.setOrder === setOrder);

      const newSets = exercise.sets.map((set) => {
         if (set.setOrder === setOrder) {
            return {
               ...updateSet,
               reps: reps,
            };
         }

         return set;
      });

      const newExercise = {
         ...exercise,
         sets: newSets,
      };

      workoutCompositionDispatch({
         type: "UPDATE-EXERCISE",
         payload: newExercise,
      });
   };

   const handleWeightInput = (setOrder, weight) => {
      const updateSet = exercise.sets.find((set) => set.setOrder === setOrder);

      const newSets = exercise.sets.map((set) => {
         if (set.setOrder === setOrder) {
            return {
               ...updateSet,
               weight: weight,
            };
         }

         return set;
      });

      const newExercise = {
         ...exercise,
         sets: newSets,
      };

      workoutCompositionDispatch({
         type: "UPDATE-EXERCISE",
         payload: newExercise,
      });
   };

   const handleCreateSetClick = () => {
      const previousSet = exercise.sets[exercise.sets.length - 1];
      const newSet = {
         setOrder: exercise.sets.length + 1,
         reps: previousSet ? previousSet.reps : 0,
         weight: previousSet ? previousSet.weight : 0,
      };

      const updatedExercise = {
         ...exercise,
         sets: [...exercise.sets, newSet],
      };

      workoutCompositionDispatch({
         type: "UPDATE-EXERCISE",
         payload: updatedExercise,
      });
   };

   return (
      <div className={styles.container}>
         <div className={styles.titleWrapper}>
            <input
               className={styles.exerciseNameInput}
               type="text"
               placeholder="exercise name..."
               onChange={handleExerciseNameInput}
               value={exercise.exerciseName}
            />
            <button
               className={styles.deleteExerciseBtn}
               onClick={handleDeleteExerciseClick}
            >
               <FaTrash />
            </button>
         </div>
         <table className={styles.tableWrapper}>
            <thead>
               <tr>
                  {/* <th className={styles.tableHeader}>Shuffle</th> */}
                  <th className={styles.tableHeader}>Set</th>
                  <th className={styles.tableHeader}>Reps</th>
                  <th className={styles.tableHeader}>Weight</th>
                  <th className={styles.tableHeader}>Options</th>
               </tr>
            </thead>
            <tbody>
               {exercise.sets.map((set) => (
                  <tr key={set.setOrder}>
                     <td className={styles.tableData}>{set.setOrder}</td>
                     <td className={styles.tableData}>
                        <input
                           className={styles.repsInput}
                           type="number"
                           inputMode="decimal"
                           value={set.reps}
                           onChange={(event) =>
                              handleRepsInput(set.setOrder, event.target.value)
                           }
                        />
                     </td>
                     <td className={styles.tableData}>
                        <input
                           className={styles.weightInput}
                           type="number"
                           inputMode="decimal"
                           value={set.weight}
                           onChange={(event) =>
                              handleWeightInput(
                                 set.setOrder,
                                 event.target.value
                              )
                           }
                        />
                     </td>
                     <td className={styles.tableData}>
                        <button
                           className={styles.deleteSetBtn}
                           onClick={() => handleDeleteSetClick(set.setOrder)}
                        >
                           <FaTrash />
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         <button className={styles.addSetBtn} onClick={handleCreateSetClick}>
            <FaPlusCircle />
            <span className={styles.addSetText}>Set</span>
         </button>
         <div className={styles.seperator}></div>
      </div>
   );
}
