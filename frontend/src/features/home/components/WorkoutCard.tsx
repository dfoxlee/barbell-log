import { FaGlasses, FaPencilAlt, FaRunning, FaTrash } from "react-icons/fa";
import type { WorkoutType } from "../../../types/workout.types";
import StandardIconBtn from "../../shared/StandardIconBtn";
import styles from "./WorkoutCard.module.css";
import { useFetchWorkoutTypes } from "../../../hooks/useFetchWorkoutTypes";

export default function WorkoutCard({ workout }: { workout: WorkoutType }) {
   const { workoutTypes } = useFetchWorkoutTypes();

   const handleViewWorkoutClick = () => {
      console.log("view workout");
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
            <h4 className={styles.workoutName}>{workout.workoutName}</h4>
            <span className={styles.workoutType}>
               {workoutTypes?.find(
                  (wt) => wt.workoutTypeId == workout.workoutType
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
