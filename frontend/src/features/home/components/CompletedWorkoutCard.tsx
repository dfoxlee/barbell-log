import { FaGlasses, FaPencilAlt, FaRunning, FaTrash } from "react-icons/fa";
import { useFetchWorkoutTypes } from "../../../hooks/useFetchWorkoutTypes";
import type { CompletedWorkoutType } from "../../../types/completed-workout.types";
import StandardIconBtn from "../../shared/StandardIconBtn";
import styles from "./CompletedWorkoutCard.module.css";
import { dateFormat } from "../../../utils/formatting";
import { useModalsStore } from "../../../stores/modals.store";
import { useNavigate } from "react-router-dom";
import { useFetchCompletedWorkouts } from "../../../hooks/useFetchCompletedWorkouts";
import toastify from "../../../utils/toastify";
import { fetchDeleteCompletedWorkout } from "../../../services/completed-workout.services";
import { useUserStore } from "../../../stores/user.store";

interface CompletedWorkoutCardProps {
   completedWorkout: CompletedWorkoutType;
}

export default function CompletedWorkoutCard({
   completedWorkout,
}: CompletedWorkoutCardProps) {
   const { workoutTypes } = useFetchWorkoutTypes();
   const token = useUserStore((state) => state.token);
   const setViewCompletedWorkoutDetailsId = useModalsStore(
      (state) => state.setViewCompletedWorkoutDetailsId
   );
   const { getWorkouts } = useFetchCompletedWorkouts();
   const navigate = useNavigate();

   const handleViewWorkoutClick = () => {
      if (completedWorkout?.completedWorkoutId) {
         setViewCompletedWorkoutDetailsId(
            completedWorkout!.completedWorkoutId!
         );
      }
   };

   const handleEditWorkoutClick = () => {
      navigate(
         `/home/completed-workout/completed/${completedWorkout.completedWorkoutId}`
      );
   };

   const handleDeleteWorkoutClick = async () => {
      try {
         if (token && completedWorkout?.completedWorkoutId)
            await fetchDeleteCompletedWorkout({
               token,
               completedWorkoutId: completedWorkout.completedWorkoutId,
            });
         getWorkouts();
      } catch (error) {
         console.error(error);

         return toastify({
            message:
               "An error occurred while deleting the workout. Please try again later.",
            type: "error",
         });
      }
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
               theme={"INFO"}
               onClick={handleViewWorkoutClick}
            />
            <StandardIconBtn
               Icon={FaPencilAlt}
               onClick={handleEditWorkoutClick}
            />
            <StandardIconBtn
               Icon={FaTrash}
               theme="WARNING"
               onClick={handleDeleteWorkoutClick}
            />
         </div>
      </div>
   );
}
