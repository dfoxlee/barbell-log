import { useMemo } from "react";
import { useBarbellLogContext } from "../../../hooks/useBarbellLogContext";
import { FaCheckCircle, FaStepForward, FaTrash } from "react-icons/fa";

import styles from "./SetsTable.module.css";

export default function SetsTable() {
   const { barbellLogState, barbellLogDispatch } = useBarbellLogContext();
   const currentExercise = useMemo(
      () =>
         barbellLogState.completedExercises.find(
            (exercise) =>
               exercise.completedExerciseOrder ===
               barbellLogState.currentExercise
         ),
      [barbellLogState]
   );
   const currentSet = useMemo(
      () =>
         currentExercise
            ? currentExercise.completedSets.find(
                 (set) => set.setOrder === barbellLogState.currentSet
              )
            : null,
      [currentExercise, barbellLogState.currentSet]
   );

   const handleSkipToSetClick = (setOrder) => {
      if (setOrder === currentSet.setOrder) {
         return;
      }

      barbellLogDispatch({
         type: "SKIP-TO-SET",
         payload: setOrder,
      });
   };

   const handleUpdateCompleteSetClick = (setOrder, isComplete) => {
      const updatedSet = currentExercise.completedSets.find(
         (set) => set.setOrder === setOrder
      );

      barbellLogDispatch({
         type: "UPDATE-SET",
         payload: {
            ...updatedSet,
            isComplete,
         },
      });
   };

   const handleDeleteSetClick = (setOrder) => {
      barbellLogDispatch({
         type: "DELETE-SET",
         payload: setOrder,
      });
   };

   return (
      <table className={styles.tableContainer}>
         <thead>
            <tr>
               {/* <th></th> */}
               <th>Set</th>
               <th>Reps</th>
               <th>Weight</th>
               <th></th>
            </tr>
         </thead>
         <tbody>
            {currentExercise
               ? currentExercise.completedSets.map((set) => {
                    if (!set) {
                       return null;
                    }

                    return (
                       <tr key={`${set.exerciseSetId}-${set.setOrder}`}>
                          {/* <td>
                             <button
                                disabled={set.setOrder === currentSet.setOrder}
                                className={
                                   set.setOrder === currentSet.setOrder
                                      ? styles.currentSetSkipToSetBtn
                                      : styles.skipToSetBtn
                                }
                                onClick={(e) =>
                                   handleSkipToSetClick(set.setOrder)
                                }
                             >
                                <FaStepForward />
                             </button>
                          </td> */}
                          <td>{set.setOrder}</td>
                          <td>{set.completedReps}</td>
                          <td>{set.completedWeight}</td>
                          <td>
                             <button
                                className={styles.setCompleteBtn}
                                onClick={(e) =>
                                   handleUpdateCompleteSetClick(
                                      set.setOrder,
                                      !set.isComplete
                                   )
                                }
                             >
                                {set.isComplete ? (
                                   <FaCheckCircle
                                      className={styles.setCompleteIcon}
                                   />
                                ) : (
                                   <FaCheckCircle
                                      className={styles.incompleteSetIcon}
                                   />
                                )}
                             </button>
                             {currentExercise.completedSets.length > 1 ? (
                                <button
                                   className={styles.deleteSetBtn}
                                   onClick={(e) =>
                                      handleDeleteSetClick(set.setOrder)
                                   }
                                >
                                   <FaTrash />
                                </button>
                             ) : null}
                          </td>
                       </tr>
                    );
                 })
               : null}
         </tbody>
      </table>
   );
}
