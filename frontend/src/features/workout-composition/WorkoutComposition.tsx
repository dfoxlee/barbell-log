import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, type ChangeEvent } from "react";
import Seperator from "../shared/Seperator";
import ExerciseComposition from "./components/ExerciseComposition";
import ExercisesOverview from "./components/ExercisesOverview";
import { useWorkoutStore } from "../../stores/workout.store";
import type { WorkoutType } from "../../types/workout.types";
import toastify from "../../utils/toastify";
import { fetchGetWorkoutTypes } from "../../services/common.services";
import { useUserStore } from "../../stores/user.store";
import WorkoutNameInput from "../shared/WorkoutNameInput";
import StandardBtn from "../shared/StandardBtn";
import WorkoutTypeSelector from "../shared/WorkoutTypeSelector";

import styles from "./WorkoutComposition.module.css";

export default function WorkoutComposition() {
   const params = useParams();
   const navigate = useNavigate();
   const workoutId = params["workout-id"];
   const [showExercisesOverview, setShowExercisesOverview] = useState(false);
   const workoutComposition = useWorkoutStore(
      (state) => state.workoutComposition
   );
   const setWorkoutComposition = useWorkoutStore(
      (state) => state.setWorkoutComposition
   );
   const workoutTypes = useWorkoutStore((state) => state.workoutTypes);
   const setWorkoutTypes = useWorkoutStore((state) => state.setWorkoutTypes);
   const token = useUserStore((state) => state.token);

   useEffect(() => {
      const getWorkoutTypes = async () => {
         try {
            const workoutTypesRequest = await fetchGetWorkoutTypes({
               token: token!,
            });

            setWorkoutTypes(workoutTypesRequest.workoutTypes);
         } catch (error) {
            console.error(
               "An error occurred getting bodyweight readings.",
               error
            );

            toastify({
               message:
                  "An error occurred getting bodyweight readings. Please try again later.",
               type: "error",
            });
         }
      };

      if (!workoutTypes && token) {
         getWorkoutTypes();
      }
   }, [token]);

   const toggleShowExercisesOverview = () => {
      setShowExercisesOverview((prev) => !prev);
   };

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
      navigate("/home");
   };

   const handleSaveClick = () => {
      console.log("workout composition saved clicked");

      navigate("/home");
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
               <StandardBtn
                  text={
                     showExercisesOverview
                        ? "Exercise Detail"
                        : "Exercises Overview"
                  }
                  onClick={toggleShowExercisesOverview}
               />
               <WorkoutTypeSelector
                  value={workoutComposition?.workoutType ?? 12}
                  onChange={handleWorkoutTypeChange}
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
