import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, type ChangeEvent } from "react";
import toastify from "../../utils/toastify";
import {
   fetchAddCompletedWorkout,
   fetchGetNewCompletedWorkout,
} from "../../services/completed-workout.services";
import { useUserStore } from "../../stores/user.store";
import { useCompletedWorkoutStore } from "../../stores/completed-workout.store";
import Loading from "../shared/Loading";
import StandardBtn from "../shared/StandardBtn";
import WorkoutNameInput from "../shared/WorkoutNameInput";
import WorkoutTypeSelector from "../shared/WorkoutTypeSelector";
import Seperator from "../shared/Seperator";
import { useTimerStore } from "../../stores/timer.store";
import type { CompletedWorkoutType } from "../../types/completed-workout.types";

import styles from "./CompletedWorkout.module.css";
import CompletedExerciseComposition from "./components/CompletedExerciseComposition";
import CompletedExercisesOverview from "./components/CompletedExercisesOverview";

export default function CompletedWorkout() {
   const params = useParams();
   const workoutId = params["workout-id"];
   // const completedWorkoutId = params["completed-workout-id"];
   const token = useUserStore((state) => state.token);
   const completedWorkout = useCompletedWorkoutStore(
      (state) => state.completedWorkout
   );
   const setCompletedWorkout = useCompletedWorkoutStore(
      (state) => state.setCompletedWorkout
   );
   const resetCompletedWorkout = useCompletedWorkoutStore(
      (state) => state.resetCompletedWorkout
   );
   const startTimer = useTimerStore((state) => state.startTimer);
   const pauseTimer = useTimerStore((state) => state.pauseTimer);
   const restartTimer = useTimerStore((state) => state.restartTimer);
   const [isLoading, setIsLoading] = useState(false);
   const [viewState, setViewState] = useState<"EXERCISE" | "OVERVIEW">(
      "EXERCISE"
   );
   const navigate = useNavigate();

   useEffect(() => {
      startTimer("Workout started");
   }, []);

   useEffect(() => {
      const getCompletedWorkout = async () => {
         try {
            setIsLoading(true);
            const completedWorkoutRequest = await fetchGetNewCompletedWorkout({
               token,
               workoutId,
            });

            setCompletedWorkout(completedWorkoutRequest.completedWorkout);
         } catch (error) {
            console.error(
               "An error occurred getting new completed workout.",
               error
            );

            toastify({
               message: "An error occurred getting new completed workout.",
               type: "error",
            });
         } finally {
            setIsLoading(false);
         }
      };

      if (token && workoutId) {
         getCompletedWorkout();
      }
   }, [token]);

   const handleCancelClick = () => {
      console.log("cancel completed workout");
      pauseTimer();
      restartTimer();
      resetCompletedWorkout();
      navigate(-1);
   };

   const handleCompleteWorkoutClick = async () => {
      console.log("complete workout");
      try {
         if (token && completedWorkout) {
            await fetchAddCompletedWorkout({ token, completedWorkout });
            navigate("/home");
         }
      } catch (error) {
         console.error(error);

         return toastify({
            message:
               "An error occurred while saving workout. Please try again later.",
            type: "error",
         });
      }
   };

   const handleExercisesOverviewClick = () => {
      setViewState((prev) => (prev === "EXERCISE" ? "OVERVIEW" : "EXERCISE"));
   };

   const handleCompletedWorkoutNameChange = (
      event: ChangeEvent<HTMLInputElement>
   ) => {
      const updatedWorkout = {
         ...completedWorkout,
         completedWorkoutName: event.target.value,
      };

      setCompletedWorkout(updatedWorkout as CompletedWorkoutType);
   };

   const handleCompletedWorkoutTypeChange = (
      event: ChangeEvent<HTMLSelectElement>
   ) => {
      const updatedWorkout = {
         ...completedWorkout,
         completedWorkoutType: parseInt(event.target.value),
      };

      setCompletedWorkout(updatedWorkout as CompletedWorkoutType);
   };

   if (isLoading) {
      return <Loading />;
   }

   return (
      <div className={styles.container}>
         <div className={styles.headerOptionsWrapper}>
            <StandardBtn text="Cancel" onClick={handleCancelClick} />
            <StandardBtn
               text="Complete Workout"
               onClick={handleCompleteWorkoutClick}
               theme="SUCCESS"
            />
         </div>
         <div className={styles.workoutNameInputWrapper}>
            <WorkoutNameInput
               value={completedWorkout?.completedWorkoutName}
               onChange={handleCompletedWorkoutNameChange}
            />
         </div>
         <div className={styles.headerOptionsWrapper}>
            <WorkoutTypeSelector
               value={completedWorkout?.completedWorkoutType ?? 12}
               onChange={handleCompletedWorkoutTypeChange}
            />
            <StandardBtn
               text="Exercises Overview"
               onClick={handleExercisesOverviewClick}
               theme="INFO"
            />
         </div>
         <Seperator />
         {viewState === "EXERCISE" ? (
            <CompletedExerciseComposition />
         ) : (
            <CompletedExercisesOverview
               handleExercisesOverviewClick={handleExercisesOverviewClick}
            />
         )}
      </div>
   );
}
