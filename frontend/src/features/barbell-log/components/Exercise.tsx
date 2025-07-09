import { FaGripVertical, FaStepForward } from "react-icons/fa";
import { useBarbellLogContext } from "../../../hooks/useBarbellLogContext";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import styles from "./Exercise.module.css";

export default function Exercise({ exercise, closeExerciseModal, id }) {
   const { barbellLogState, barbellLogDispatch } = useBarbellLogContext();
   const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });

   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
   };

   const handleSkipToExerciseClick = (completedExerciseOrder) => {
      if (completedExerciseOrder === barbellLogState.currentExercise) {
         return;
      }

      barbellLogDispatch({
         type: "SKIP-TO-EXERCISE",
         payload: completedExerciseOrder,
      });

      closeExerciseModal();
   };

   return (
      <div className={styles.container} key={exercise.exerciseId} style={style}>
         <button
            className={styles.reorderBtn}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
         >
            <FaGripVertical />
         </button>
         <div className={styles.contentWrapper}>
            <h4 className={styles.exerciseName}>{exercise.exerciseName}</h4>
            <p className={styles.completedSets}>
               {`${exercise.completedSets.reduce(
                  (acc, set) => (set.isComplete ? acc + 1 : acc),
                  0
               )} / ${exercise.completedSets.length} Completed`}
            </p>
         </div>
         <button
            className={styles.skipBtn}
            onClick={(e) =>
               handleSkipToExerciseClick(exercise.completedExerciseOrder)
            }
         >
            <FaStepForward />
         </button>
      </div>
   );
}
