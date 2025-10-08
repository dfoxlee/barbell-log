import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import toastify from "../../utils/toastify";
import { fetchGetNewCompletedWorkout } from "../../services/completed-workout.services";
import { useUserStore } from "../../stores/user.store";
import { useCompletedWorkoutStore } from "../../stores/completed-workout.store";
import Loading from "../shared/Loading";
import StandardBtn from "../shared/StandardBtn";
import WorkoutNameInput from "../shared/WorkoutNameInput";
import WorkoutTypeSelector from "../shared/WorkoutTypeSelector";
import Seperator from "../shared/Seperator";
import { useTimerStore } from "../../stores/timer.store";
import Timer from "./components/Timer";
import CompletedExerciseComposition from "./components/CompletedExerciseNavigation";
import RepsInput from "./components/RepsInput";
import type { CompletedExerciseSetType } from "../../types/completed-exercise-set.types";
import { FaTimes } from "react-icons/fa";
import WeightInput from "./components/WeightInput";
import TimedInput from "./components/TimedInput";
import DistanceInput from "./components/DistanceInput";
import CompletedExerciseSetsTable from "./components/CompletedExerciseSetsTable";

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
   const currentCompletedExerciseOrder = useCompletedWorkoutStore(
      (state) => state.currentCompletedExerciseOrder
   );
   const currentCompletedExerciseSetOrder = useCompletedWorkoutStore(
      (state) => state.currentCompletedExerciseSetOrder
   );
   const resetCompletedWorkout = useCompletedWorkoutStore(
      (state) => state.resetCompletedWorkout
   );
   const startTimer = useTimerStore((state) => state.startTimer);
   const pauseTimer = useTimerStore((state) => state.pauseTimer);
   const restartTimer = useTimerStore((state) => state.restartTimer);
   const [isLoading, setIsLoading] = useState(false);
   const navigate = useNavigate();
   const currentCompletedExercise = useMemo(
      () =>
         completedWorkout?.completedExercises.find(
            (ce) => ce.completedExerciseOrder === currentCompletedExerciseOrder
         ),
      [completedWorkout?.completedExercises, currentCompletedExerciseOrder]
   );
   const currentCompletedExerciseSet = useMemo(
      () =>
         currentCompletedExercise?.completedExerciseSets.find(
            (ces: CompletedExerciseSetType) =>
               ces.completedExerciseSetOrder ===
               currentCompletedExerciseSetOrder
         ),
      [
         currentCompletedExercise?.completedExerciseSets,
         currentCompletedExerciseSetOrder,
      ]
   );

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
   console.log(completedWorkout);

   const handleCancelClick = () => {
      console.log("cancel completed workout");
      pauseTimer();
      restartTimer();
      resetCompletedWorkout();
      navigate(-1);
   };

   const handleCompleteWorkoutClick = () => {
      console.log("complete workout");
   };

   const handleExercisesOverviewClick = () => {
      console.log("view completed exercises overview");
   };

   const handleCompletedWorkoutNameChange = (
      event: ChangeEvent<HTMLInputElement>
   ) => {
      console.log("complete workout name change", event.target.value);
   };

   const handleCompletedWorkoutTypeChange = (
      event: ChangeEvent<HTMLSelectElement>
   ) => {
      console.log("completed workout type change", event.target.value);
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
            />
         </div>
         <Seperator />
         <Timer />
         <CompletedExerciseComposition />
         <div className={styles.inputsWrapper}>
            <div className={styles.repsWeightWrapper}>
               {currentCompletedExerciseSet?.hadReps ? (
                  <>
                     <RepsInput
                        reps={currentCompletedExerciseSet?.completedReps ?? 0}
                     />
                     <FaTimes />
                  </>
               ) : null}
               <WeightInput
                  weight={currentCompletedExerciseSet?.completedWeight ?? 0}
                  completedWeightUnit={
                     currentCompletedExerciseSet?.completedWeightUnit ?? 0
                  }
               />
            </div>
            {currentCompletedExerciseSet?.wasTimed ? <TimedInput /> : null}
            {currentCompletedExerciseSet?.wasDistance ? (
               <DistanceInput />
            ) : null}
         </div>
         <CompletedExerciseSetsTable />
      </div>
   );
}
