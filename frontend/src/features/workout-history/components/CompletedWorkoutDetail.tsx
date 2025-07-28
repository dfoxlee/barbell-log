import { useEffect, useState } from "react";
import styles from "./CompletedWorkoutDetail.module.css";
import { FaChevronLeft } from "react-icons/fa";
import { fetchGetCompletedWorkout } from "../../../services/completedWorkoutServices";
import { useUserStore } from "../../../stores/userStore";
import toastify from "../../../utils/toastify";
import Loading from "../../shared/Loading";
import type { CompletedWorkoutType } from "../../../types/completedWorkoutTypes";

export default function CompletedWorkoutDetail({
   completedWorkoutId,
   updateViewCompletedWorkoutId,
}: {
   completedWorkoutId: string;
   updateViewCompletedWorkoutId: (id: string | null) => void;
}) {
   const [completedWorkout, setCompletedWorkout] =
      useState<CompletedWorkoutType | null>(null);
   const [completedWorkoutLoading, setCompletedWorkoutLoading] = useState(true);

   const user = useUserStore((state) => state.user);

   useEffect(() => {
      const getCompletedWorkout = async () => {
         const completedWorkout = await fetchGetCompletedWorkout({
            token: user?.token,
            completedWorkoutId,
         });

         setCompletedWorkout(completedWorkout);
      };

      if (completedWorkoutId && user?.token) {
         try {
            setCompletedWorkoutLoading(true);
            getCompletedWorkout();
         } catch (error) {
            console.error("Error fetching completed workout:", error);

            toastify({
               message: "Error fetching completed workout",
               type: "error",
            });
         } finally {
            setCompletedWorkoutLoading(false);
         }
      }
   }, [user?.token, completedWorkoutId]);

   const handleReturnClick = () => {
      updateViewCompletedWorkoutId(null);
   };

   if (completedWorkoutLoading) {
      return <Loading />;
   }
   console.log(completedWorkout);

   if (completedWorkout) {
      return (
         <div>
            <button className={`standardBtn`} onClick={handleReturnClick}>
               <FaChevronLeft />
               <span>Recent Workouts</span>
            </button>
            <h2>{completedWorkout.workoutName}</h2>
            <div>
               {completedWorkout.completedExercises.map((completedExercise) => (
                  <div key={completedExercise.completedExerciseId}>
                     <h3>{completedExercise.exerciseName}</h3>
                  </div>
               ))}
            </div>
         </div>
      );
   }
}
