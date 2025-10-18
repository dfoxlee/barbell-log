import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, type ChangeEvent } from "react";
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
import {
   fetchCreateWorkout,
   fetchGetWorkout,
   fetchUpdateWorkout,
} from "../../services/workout.services";

import styles from "./WorkoutComposition.module.css";
import Loading from "../shared/Loading";

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
   const token = useUserStore((state) => state.token);
   const resetWorkoutComposition = useWorkoutStore(
      (state) => state.resetWorkoutComposition
   );
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      const getWorkout = async () => {
         try {
            setIsLoading(true);
            const workoutReq = await fetchGetWorkout({
               token: token!,
               workoutId: workoutId!,
            });

            setWorkoutComposition(workoutReq.workout);
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

      if (workoutId && token) {
         getWorkout();
      }
   }, [token, workoutId]);

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
      const workoutName = workoutComposition?.workoutName;
      const firstExercise = workoutComposition?.exercises[0];

      if (!workoutName || !firstExercise?.exerciseName) {
         return toastify({
            message: "You must complete the workout details to save.",
            type: "warning",
         });
      }

      try {
         setIsLoading(true);
         if (workoutId) {
            await fetchUpdateWorkout({
               token: token!,
               workout: workoutComposition,
            });
         } else {
            await fetchCreateWorkout({
               token: token!,
               workout: workoutComposition!,
            });
         }

         toastify({
            message: `Workout ${workoutId ? "updated" : "saved"} succesfully!`,
            type: "success",
         });

         resetWorkoutComposition();
         navigate("/home");
      } catch (error) {
         console.error("An error occurred saving workout.", error);

         return toastify({
            message:
               "An error occurred saving workout. Please try again later.",
            type: "error",
         });
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className={styles.container}>
         <div className={styles.workoutControlBtnsWrapper}>
            <StandardBtn text="Cancel" onClick={handleCancelClick} />
            <StandardBtn
               text={workoutId ? "Update" : "Save"}
               onClick={handleSaveClick}
               disabled={isLoading}
            />
         </div>
         {isLoading ? (
            <Loading />
         ) : (
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
         )}
      </div>
   );
}
