import { FaGlasses, FaPencilAlt, FaRunning, FaTrash } from "react-icons/fa";
import { useFetchWorkoutTypes } from "../../../hooks/useFetchWorkoutTypes";
import type { CompletedWorkoutType } from "../../../types/completed-workout.types";
import StandardIconBtn from "../../shared/StandardIconBtn";
import styles from "./CompletedWorkoutCard.module.css";
import { dateFormat } from "../../../utils/formatting";
import { useModalsStore } from "../../../stores/modals.store";

interface CompletedWorkoutCardProps {
   completedWorkout: CompletedWorkoutType;
}

export default function CompletedWorkoutCard({
   completedWorkout,
}: CompletedWorkoutCardProps) {
   const { workoutTypes } = useFetchWorkoutTypes();
   const setViewCompletedWorkoutDetailsId = useModalsStore(
      (state) => state.setViewCompletedWorkoutDetailsId
   );

   const handleViewWorkoutClick = () => {
      if (completedWorkout?.completedWorkoutId) {
         setViewCompletedWorkoutDetailsId(
            completedWorkout!.completedWorkoutId!
         );
      }
   };

   const handleStartWorkoutClick = () => {
      console.log("start workout");
   };

   const handleEditWorkoutClick = () => {
      console.log("edit workout");
   };

   const handleDeleteWorkoutClick = () => {
      console.log("delete workout");
   };

   return (
      <div className={styles.container}>
         <div className={styles.textWrapper}>
            <h4 className={styles.workoutName}>
               {completedWorkout.completedWorkoutName}
            </h4>
            <span className={styles.workoutDate}>
               {completedWorkout?.completedDate
                  ? `Completed: ${dateFormat(
                       new Date(completedWorkout?.completedDate)
                    )}`
                  : ""}
            </span>
            <span className={styles.workoutType}>
               {workoutTypes?.find(
                  (wt) =>
                     wt.workoutTypeId == completedWorkout.completedWorkoutType
               )?.workoutType ?? ""}
            </span>
         </div>
         <div className={styles.optionsWrapper}>
            <StandardIconBtn
               Icon={FaGlasses}
               onClick={handleViewWorkoutClick}
            />
            <StandardIconBtn
               Icon={FaRunning}
               onClick={handleStartWorkoutClick}
            />
            <StandardIconBtn
               Icon={FaPencilAlt}
               onClick={handleEditWorkoutClick}
            />
            <StandardIconBtn
               Icon={FaTrash}
               onClick={handleDeleteWorkoutClick}
            />
         </div>
      </div>
   );
}
