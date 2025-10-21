import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, type ChangeEvent } from "react";
import toastify from "../../utils/toastify";
import {
   fetchAddCompletedWorkout,
   fetchGetCompletedWorkoutById,
   fetchGetNewCompletedWorkout,
   fetchUpdateCompletedWorkout,
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
import CompletedExerciseComposition from "./components/CompletedExerciseComposition";
import CompletedExercisesOverview from "./components/CompletedExercisesOverview";

import styles from "./CompletedWorkout.module.css";

export default function CompletedWorkout() {
   const params = useParams();
   const workoutId = params["workout-id"];
   const completedWorkoutId = params["completed-workout-id"];
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
      if (!completedWorkoutId) {
         startTimer("Workout started");
      }
   }, []);

   useEffect(() => {
      const getCompletedWorkout = async () => {
         try {
            setIsLoading(true);

            if (completedWorkoutId) {
               const completedWorkoutRequest =
                  await fetchGetCompletedWorkoutById({
                     token: token!,
                     completedWorkoutId,
                  });

               setCompletedWorkout(completedWorkoutRequest.completedWorkout);
            } else {
               const completedWorkoutRequest =
                  await fetchGetNewCompletedWorkout({
                     token: token!,
                     workoutId: workoutId!,
                  });

               setCompletedWorkout(completedWorkoutRequest.completedWorkout);
            }
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
   }, [token, workoutId, completedWorkoutId]);

   const handleCancelClick = () => {
      console.log("cancel completed workout");
      pauseTimer();
      restartTimer();
      resetCompletedWorkout();
      navigate(-1);
   };

   const handleCompleteWorkoutClick = async () => {
      try {
         if (token && completedWorkout) {
            if (!completedWorkoutId) {
               await fetchAddCompletedWorkout({ token, completedWorkout });
               navigate("/home");
            } else {
               await fetchUpdateCompletedWorkout({ token, completedWorkout });
               navigate("/home");
            }
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
               text={completedWorkoutId ? "Update Workout" : "Complete Workout"}
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
