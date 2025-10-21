import { FaGlasses, FaPencilAlt, FaRunning, FaTrash } from "react-icons/fa";
import type { WorkoutType } from "../../../types/workout.types";
import StandardIconBtn from "../../shared/StandardIconBtn";
import styles from "./WorkoutCard.module.css";
import { useFetchWorkoutTypes } from "../../../hooks/useFetchWorkoutTypes";
import { useNavigate } from "react-router-dom";
import { fetchDeleteWorkout } from "../../../services/workout.services";
import { useUserStore } from "../../../stores/user.store";
import toastify from "../../../utils/toastify";
import { useFetchWorkouts } from "../../../hooks/useFetchWorkouts";
import { useModalsStore } from "../../../stores/modals.store";

export default function WorkoutCard({ workout }: { workout: WorkoutType }) {
   const { workoutTypes } = useFetchWorkoutTypes();
   const token = useUserStore((state) => state.token);
   const { getWorkouts } = useFetchWorkouts();
   const navigate = useNavigate();
   const setViewWorkoutDetailsId = useModalsStore(
      (state) => state.setViewWorkoutDetailsId
   );

   const handleViewWorkoutClick = () => {
      if (workout?.workoutId) {
         setViewWorkoutDetailsId(workout?.workoutId);
      }
   };

   const handleStartWorkoutClick = () => {
      navigate(`/home/completed-workout/${workout.workoutId}`);
   };

   const handleEditWorkoutClick = () => {
      console.log("edit workout");
      navigate(`/home/create-workout/${workout.workoutId}`);
   };

   const handleDeleteWorkoutClick = async () => {
      try {
         if (token && workout.workoutId) {
            await fetchDeleteWorkout({
               token: token!,
               workoutId: workout.workoutId!,
            });
         }

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
               theme="INFO"
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
               theme="WARNING"
               onClick={handleDeleteWorkoutClick}
            />
         </div>
      </div>
   );
}
