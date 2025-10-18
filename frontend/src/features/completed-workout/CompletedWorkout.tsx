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
import CompletedExerciseNavigation from "./components/CompletedExerciseNavigation";
import RepsInput from "./components/RepsInput";
import type { CompletedExerciseSetType } from "../../types/completed-exercise-set.types";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import WeightInput from "./components/WeightInput";
import TimedInput from "./components/TimedInput";
import DistanceInput from "./components/DistanceInput";
import CompletedExerciseSetsTable from "./components/CompletedExerciseSetsTable";

import styles from "./CompletedWorkout.module.css";
import type { CompletedWorkoutType } from "../../types/completed-workout.types";

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
   const currentCompletedExerciseOrder = useCompletedWorkoutStore(
      (state) => state.currentCompletedExerciseOrder
   );
   const currentCompletedExerciseSetOrder = useCompletedWorkoutStore(
      (state) => state.currentCompletedExerciseSetOrder
   );
   const setCurrentCompletedExerciseSetOrder = useCompletedWorkoutStore(
      (state) => state.setCurrentCompletedExerciseSetOrder
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

   const updateCompletedWorkout = ({
      field,
      value,
   }: {
      field: string;
      value: number | string;
   }) => {
      const updatedSet = {
         ...currentCompletedExerciseSet,
         [field]: value,
      };

      const updatedSets = currentCompletedExercise?.completedExerciseSets.map(
         (ces) =>
            ces.completedExerciseSetOrder ===
            updatedSet.completedExerciseSetOrder
               ? updatedSet
               : ces
      );

      const updatedExercise = {
         ...currentCompletedExercise,
         completedExerciseSets: updatedSets,
      };

      const updatedExercises = completedWorkout?.completedExercises.map((ce) =>
         ce.completedExerciseOrder === updatedExercise.completedExerciseOrder
            ? updatedExercise
            : ce
      );
      const updatedCompletedWorkout = {
         ...completedWorkout,
         completedExercises: updatedExercises,
      };

      setCompletedWorkout(updatedCompletedWorkout as CompletedWorkoutType);
   };

   const handleIncrementExerciseSetOrder = () => {
      const updatedOrder = currentCompletedExerciseSetOrder + 1;
      console.log(updatedOrder);

      setCurrentCompletedExerciseSetOrder(updatedOrder);
   };

   const handleDecrementExerciseSetOrder = () => {
      const updatedOrder = currentCompletedExerciseSetOrder - 1;

      setCurrentCompletedExerciseSetOrder(updatedOrder);
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
         <CompletedExerciseNavigation />
         <div className={styles.inputsWrapper}>
            <div className={styles.repsWeightWrapper}>
               {currentCompletedExerciseSet?.hadReps ? (
                  <>
                     <RepsInput
                        completedReps={
                           currentCompletedExerciseSet?.completedReps ?? 0
                        }
                        updateCompletedWorkout={updateCompletedWorkout}
                     />
                     <FaTimes />
                  </>
               ) : null}
               <WeightInput
                  completedWeight={
                     currentCompletedExerciseSet?.completedWeight ?? 0
                  }
                  completedWeightUnit={
                     currentCompletedExerciseSet?.completedWeightUnit ?? 0
                  }
                  updateCompletedWorkout={updateCompletedWorkout}
               />
            </div>
            {currentCompletedExerciseSet?.wasTimed ? (
               <TimedInput
                  completedHr={currentCompletedExerciseSet?.completedHr}
                  completedMin={currentCompletedExerciseSet?.completedMin}
                  completedSec={currentCompletedExerciseSet?.completedSec}
                  updateCompletedWorkout={updateCompletedWorkout}
               />
            ) : null}
            {currentCompletedExerciseSet?.wasDistance ? (
               <DistanceInput
                  completedDistance={
                     currentCompletedExerciseSet?.completedDistance
                  }
                  completedDistanceUnit={
                     currentCompletedExerciseSet?.completedDistanceUnit
                  }
                  updateCompletedWorkout={updateCompletedWorkout}
               />
            ) : null}
         </div>
         <div className={styles.exerciseSetsNavigationWrapper}>
            <StandardBtn
               Icon={FaChevronLeft}
               text="Set"
               onClick={handleDecrementExerciseSetOrder}
               disabled={currentCompletedExerciseSetOrder < 2}
            />
            <StandardBtn
               Icon={FaChevronRight}
               text="Set"
               onClick={handleIncrementExerciseSetOrder}
               disabled={
                  currentCompletedExercise &&
                  currentCompletedExerciseSetOrder > 
                     currentCompletedExercise.completedExerciseSets.length - 1
               }
            />
         </div>
         <CompletedExerciseSetsTable />
      </div>
   );
}
