import { useNavigate, useParams } from "react-router-dom";
import { type ChangeEvent } from "react";
import Seperator from "../shared/Seperator";
import ExerciseComposition from "./components/ExerciseComposition";
import ExercisesOverview from "./components/ExercisesOverview";
import { useWorkoutStore } from "../../stores/workout.store";
import type { WorkoutType } from "../../types/workout.types";
import toastify from "../../utils/toastify";
import { useUserStore } from "../../stores/user.store";
import WorkoutNameInput from "../shared/WorkoutNameInput";
import StandardBtn from "../shared/StandardBtn";
import WorkoutTypeSelector from "../shared/WorkoutTypeSelector";
import { fetchCreateWorkout } from "../../services/workout.services";
import { useFetchWorkouts } from "../../hooks/useFetchWorkouts";

import styles from "./WorkoutComposition.module.css";

export default function WorkoutComposition() {
   const params = useParams();
   const navigate = useNavigate();
   const workoutId = params["workout-id"];
   const showExercisesOverview = useWorkoutStore(
      (state) => state.showExercisesOverview
   );
   const toggleShowExercisesOverview = useWorkoutStore(
      (state) => state.toggleShowExercisesOverview
   );
   const workoutComposition = useWorkoutStore(
      (state) => state.workoutComposition
   );
   const setWorkoutComposition = useWorkoutStore(
      (state) => state.setWorkoutComposition
   );
   const { getWorkouts } = useFetchWorkouts();
   const token = useUserStore((state) => state.token);
   const resetWorkoutComposition = useWorkoutStore(
      (state) => state.resetWorkoutComposition
   );

   const handleWorkoutNameChange = (event: ChangeEvent<HTMLInputElement>) => {
      const updatedWorkoutComposition = {
         ...workoutComposition,
         workoutName: event.target.value,
      };

      setWorkoutComposition(updatedWorkoutComposition as WorkoutType);
   };

   const handleWorkoutTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
      const updatedWorkoutComposition = {
         ...workoutComposition,
         workoutType: parseInt(event.target.value),
      };

      setWorkoutComposition(updatedWorkoutComposition as WorkoutType);
   };

   const handleCancelClick = () => {
      resetWorkoutComposition();
      navigate("/home");
   };

   const handleSaveClick = async () => {
      try {
         await fetchCreateWorkout({
            token: token!,
            workout: workoutComposition!,
         });

         toastify({
            message: "Workout saved successfully.",
            type: "success",
         });

         getWorkouts();
         resetWorkoutComposition();
         navigate("/home");
      } catch (error) {
         console.error("An error occurred saving workout.", error);

         return toastify({
            message:
               "An error occurred saving workout. Please try again later.",
            type: "error",
         });
      }
   };

   return (
      <div className={styles.container}>
         <div className={styles.workoutControlBtnsWrapper}>
            <StandardBtn text="Cancel" onClick={handleCancelClick} />
            <StandardBtn text="Save" onClick={handleSaveClick} />
         </div>
         <div className={styles.main}>
            <WorkoutNameInput
               value={workoutComposition?.workoutName}
               onChange={handleWorkoutNameChange}
            />
            <div className={styles.workoutOptionBtnsWrapper}>
               <WorkoutTypeSelector
                  value={workoutComposition?.workoutType ?? 12}
                  onChange={handleWorkoutTypeChange}
               />
               <StandardBtn
                  text={
                     showExercisesOverview
                        ? "Exercise Detail"
                        : "Exercises Overview"
                  }
                  onClick={toggleShowExercisesOverview}
               />
            </div>
            <Seperator />
            {showExercisesOverview ? (
               <ExercisesOverview />
            ) : (
               <ExerciseComposition />
            )}
         </div>
      </div>
   );
}
