import { useEffect, useState } from "react";
import { useModalsStore } from "../../../stores/modals.store";
import styles from "./ViewWorkoutModal.module.css";
import type { WorkoutType } from "../../../types/workout.types";
import { fetchGetWorkout } from "../../../services/workout.services";
import { useUserStore } from "../../../stores/user.store";
import toastify from "../../../utils/toastify";
import Loading from "../../shared/Loading";
import StandardIconBtn from "../../shared/StandardIconBtn";
import { FaTimes } from "react-icons/fa";
import ViewExerciseSetsTable from "./ViewExerciseSetsTable";

export default function ViewWorkoutModal() {
   const viewWorkoutModalId = useModalsStore(
      (state) => state.viewWorkoutDetailsId
   );
   const setViewWorkoutDetailsId = useModalsStore(
      (state) => state.setViewWorkoutDetailsId
   );
   const [isLoading, setIsLoading] = useState(false);
   const [workout, setWorkout] = useState<WorkoutType | null>(null);
   const token = useUserStore((state) => state.token);

   useEffect(() => {
      const getWorkout = async () => {
         try {
            setIsLoading(true);
            const workoutReq = await fetchGetWorkout({
               token: token!,
               workoutId: viewWorkoutModalId ?? -1,
            });

            setWorkout(workoutReq.workout);
         } catch (error) {
            console.log(error);

            return toastify({
               message:
                  "An error occurred while getting the workout. Please try again later.",
               type: "error",
            });
         } finally {
            setIsLoading(false);
         }
      };

      if (token && viewWorkoutModalId) {
         getWorkout();
      }
   }, [viewWorkoutModalId]);

   const handleCloseViewModalClick = () => {
      setViewWorkoutDetailsId(null);
   };

   if (isLoading) {
      return <Loading />;
   }

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <StandardIconBtn
               Icon={FaTimes}
               onClick={handleCloseViewModalClick}
            />
            <h3 className={styles.title}>{workout?.workoutName}</h3>
            <div>
               {workout &&
                  workout.exercises.map((e) => (
                     <ViewExerciseSetsTable
                        exerciseName={e.exerciseName}
                        exerciseSets={e.exerciseSets}
                     />
                  ))}
            </div>
         </div>
      </div>
   );
}
