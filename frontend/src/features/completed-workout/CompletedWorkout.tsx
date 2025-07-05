import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toastify from "../../utils/toastify";
import { useAuthContext } from "../../hooks/useAuthContext";
import Loading from "../shared/Loading";
import { fetchGetCompletedWorkout } from "../../services/completedWorkoutServices";
import CompletedExercise from "./components/CompletedExercise";
import { FaChevronLeft } from "react-icons/fa";
import Seperator from "../shared/Seperator";

import styles from "./CompletedWorkout.module.css";

export default function CompletedWorkout() {
   const params = useParams();
   const completedWorkoutId = params["completed-workout-id"];
   const { user } = useAuthContext();
   const [completedWorkout, setCompletedWorkout] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      try {
         const getCompletedWorkoutRequest = async () => {
            const data = await fetchGetCompletedWorkout({
               token: user.token,
               completedWorkoutId,
            });

            setCompletedWorkout(data);
         };

         setIsLoading(true);
         getCompletedWorkoutRequest();
      } catch (error) {
         console.error(error);
         toastify({
            message: "Something went wrong. Try again later.",
            type: "error",
         });
      } finally {
         setIsLoading(false);
      }
   }, []);

   const handleBackClick = () => {
      navigate(-1);
   };

   if (isLoading) {
      <Loading />;
   }

   return (
      <div className={styles.container}>
         <button className={styles.backBtn} onClick={handleBackClick}>
            <FaChevronLeft />
            <span>Back</span>
         </button>
         <h2 className={styles.workoutName}>{completedWorkout.workoutName}</h2>
         <Seperator />
         {completedWorkout.completedExercises &&
            completedWorkout.completedExercises.map((exercise) => (
               <CompletedExercise
                  key={exercise.completedExerciseId}
                  completedExercise={exercise}
               />
            ))}
      </div>
   );
}
