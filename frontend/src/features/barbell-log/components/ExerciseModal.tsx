import { FaDumbbell, FaTimesCircle } from "react-icons/fa";
import { useBarbellLogContext } from "../../../hooks/useBarbellLogContext";
import Exercise from "./Exercise";
import ReorderCompletedExerciseWrapper from "./ReorderCompletedExerciseWrapper";
import {
   SortableContext,
   verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Seperator from "../../shared/Seperator";

import styles from "./ExerciseModal.module.css";

export default function ExerciseModal({
   exerciseModalOpen,
   toggleExerciseModal,
}) {
   const { barbellLogState } = useBarbellLogContext();

   const handleCloseModalClick = () => {
      toggleExerciseModal();
   };

   return (
      <div
         className={
            exerciseModalOpen
               ? `${styles.container} ${styles.containerOpen}`
               : styles.container
         }
      >
         <div className={styles.wrapper}>
            <button onClick={handleCloseModalClick} className={styles.closeBtn}>
               <FaTimesCircle />
            </button>
            <h3 className={styles.workoutName}>
               {barbellLogState.workoutName}
            </h3>
            <Seperator />
            <ReorderCompletedExerciseWrapper>
               <SortableContext
                  items={barbellLogState.completedExercises.map(
                     (exercise) => exercise.completedExerciseOrder
                  )}
                  strategy={verticalListSortingStrategy}
               >
                  {barbellLogState.completedExercises.map((exercise) => (
                     <Exercise
                        key={`${exercise.exerciseId}-${exercise.completedExerciseOrder}`}
                        id={exercise.completedExerciseOrder}
                        exercise={exercise}
                        closeExerciseModal={toggleExerciseModal}
                     />
                  ))}
               </SortableContext>
            </ReorderCompletedExerciseWrapper>
         </div>
      </div>
   );
}
