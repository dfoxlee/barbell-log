import { FaTimes } from "react-icons/fa";
import StandardIconBtn from "../../shared/StandardIconBtn";
import ViewCompletedExerciseSetsTable from "./ViewCompletedExerciseSetsTable";
import { useModalsStore } from "../../../stores/modals.store";
import { useFetchCompletedWorkout } from "../../../hooks/useFetchCompletedWorkout";

import styles from "./ViewWorkoutModal.module.css";

export default function ViewCompletedWorkoutModal() {
   const setViewCompletedWorkoutDetailsId = useModalsStore(
      (state) => state.setViewCompletedWorkoutDetailsId
   );
   const { completedWorkout } = useFetchCompletedWorkout();

   const handleCloseViewModalClick = () => {
      setViewCompletedWorkoutDetailsId(null);
   };

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <StandardIconBtn
               Icon={FaTimes}
               onClick={handleCloseViewModalClick}
            />
            <h3 className={styles.title}>
               {completedWorkout?.completedWorkoutName}
            </h3>
            <div>
               {completedWorkout &&
                  completedWorkout.completedExercises.map((e) => (
                     <ViewCompletedExerciseSetsTable
                        key={e.completedExerciseId}
                        exerciseName={e.completedExerciseName}
                        exerciseSets={e.completedExerciseSets}
                     />
                  ))}
            </div>
         </div>
      </div>
   );
}
