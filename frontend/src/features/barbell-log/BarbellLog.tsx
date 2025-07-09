import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchGetWorkout } from "../../services/workoutServices";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useBarbellLogContext } from "../../hooks/useBarbellLogContext";
import Seperator from "../shared/Seperator";
import SetsTable from "./components/SetsTable";
import CurrentSet from "./components/CurrentSet";
import { FaCheck, FaChevronRight, FaPlusCircle, FaTrash } from "react-icons/fa";
import Loading from "../shared/Loading";
import ExerciseModal from "./components/ExerciseModal";
import {
   fetchCreateCompletedWorkout,
   fetchGetCompletedWorkout,
   fetchUpdateCompletedWorkout,
} from "../../services/completedWorkoutServices";
import toastify from "../../utils/toastify";

import styles from "./BarbellLog.module.css";

export default function BarbellLog() {
   const params = useParams();
   const workoutId = params["workout-id"];
   const completedWorkoutId = params["completed-workout-id"];
   const { user } = useAuthContext();
   const { barbellLogState, barbellLogDispatch } = useBarbellLogContext();
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);
   const [exerciseModalOpen, setExerciseModalOpen] = useState(false);
   const [includeSetNotes, setIncludeSetNotes] = useState(false);
   const navigate = useNavigate();
   const currentExercise = useMemo(
      () =>
         barbellLogState.completedExercises.find(
            (exercise) =>
               exercise.completedExerciseOrder ===
               barbellLogState.currentExercise
         ),
      [barbellLogState]
   );
   const currentSet = useMemo(
      () =>
         currentExercise
            ? currentExercise.completedSets.find(
                 (set) => set.setOrder === barbellLogState.currentSet
              )
            : null,
      [currentExercise, barbellLogState.currentSet]
   );

   useEffect(() => {
      try {
         setError(null);

         const getWorkout = async ({ workoutId, token }) => {
            const req = await fetchGetWorkout({ workoutId, token });

            barbellLogDispatch({
               type: "UPDATE-WORKOUT",
               payload: req,
            });
         };

         const getCompletedWorkout = async ({ completedWorkoutId, token }) => {
            const req = await fetchGetCompletedWorkout({
               token,
               completedWorkoutId,
            });

            barbellLogDispatch({
               type: "UPDATE-WORKOUT",
               payload: req,
            });
         };

         setIsLoading(true);
         if (completedWorkoutId) {
            getCompletedWorkout({ completedWorkoutId, token: user.token });
         } else {
            getWorkout({ token: user.token, workoutId });
         }
      } catch (error) {
         console.error(error);

         setError(error.message);

         return alert("Something went wrong. Try again later.");
      } finally {
         setIsLoading(false);
      }
   }, [barbellLogDispatch, user.token, workoutId]);

   const toggleExerciseModal = () => {
      setExerciseModalOpen((prev) => !prev);
   };

   const handleOpenExerciseModal = () => {
      toggleExerciseModal();
   };

   const handleToggleSetNotes = () => {
      if (includeSetNotes) {
         barbellLogDispatch({
            type: "UPDATE-SET",
            payload: {
               ...currentSet,
               notes: "",
            },
         });
      }

      setIncludeSetNotes((prev) => !prev);
   };

   const handleCompleteExerciseClick = async () => {
      if (
         currentExercise.completedExerciseOrder ===
         barbellLogState.completedExercises.length
      ) {
         try {
            if (completedWorkoutId) {
               const request = await fetchUpdateCompletedWorkout({
                  token: user?.token,
                  completedWorkout: barbellLogState,
               });

               if (request.error) {
                  toastify({
                     message: "Something went wrong. Please try again later",
                     type: "error",
                  });

                  return console.log(request);
               }
            } else {
               const request = await fetchCreateCompletedWorkout({
                  token: user?.token,
                  workout: barbellLogState,
               });

               if (request.error) {
                  toastify({
                     message: "Something went wrong. Please try again later",
                     type: "error",
                  });

                  return console.log(request);
               }
            }

            return navigate(-1);
         } catch (error) {
            toastify({
               message: "Something went wrong. Please try again later",
               type: "error",
            });

            return console.log(error);
         }
      }

      barbellLogDispatch({
         type: "SKIP-TO-EXERCISE",
         payload: barbellLogState.currentExercise + 1,
      });
   };

   const handleAddSetClick = () => {
      barbellLogDispatch({
         type: "ADD-SET",
         payload: currentExercise.completedExerciseOrder,
      });
   };

   const handleSetNotesChange = (e) => {
      const { value } = e.target;

      barbellLogDispatch({
         type: "UPDATE-SET",
         payload: {
            ...currentSet,
            notes: value,
         },
      });
   };

   const handleCompleteSetClick = () => {
      const updatedSet = currentExercise.completedSets.find(
         (set) => set.setOrder === barbellLogState.currentSet
      );

      const isComplete = !updatedSet.isComplete;

      // handle the case for the last exercise and last set.
      if (
         currentExercise &&
         currentSet &&
         currentExercise.completedExerciseOrder ===
            barbellLogState.completedExercises.length &&
         currentSet.setOrder === currentExercise.completedSets.length
      ) {
         if (isComplete) {
            return barbellLogDispatch({
               type: "UPDATE-SET",
               payload: {
                  ...updatedSet,
                  isComplete,
               },
            });
         }

         return;
      }

      // handle if the set is already complete
      if (updatedSet.isComplete) {
         if (
            currentExercise.completedSets.length === barbellLogState.currentSet
         ) {
            return barbellLogDispatch({
               type: "SKIP-TO-EXERCISE",
               payload: barbellLogState.currentExercise + 1,
            });
         }

         return barbellLogDispatch({
            type: "SKIP-TO-SET",
            payload: barbellLogState.currentSet + 1,
         });
      }

      barbellLogDispatch({
         type: "UPDATE-SET",
         payload: {
            ...updatedSet,
            isComplete,
         },
      });

      if (currentExercise.completedSets.length === barbellLogState.currentSet) {
         return barbellLogDispatch({
            type: "SKIP-TO-EXERCISE",
            payload: barbellLogState.currentExercise + 1,
         });
      }

      return barbellLogDispatch({
         type: "SKIP-TO-SET",
         payload: barbellLogState.currentSet + 1,
      });
   };

   if (isLoading) {
      return <Loading />;
   }

   return (
      <div className={styles.container}>
         <ExerciseModal
            exerciseModalOpen={exerciseModalOpen}
            toggleExerciseModal={toggleExerciseModal}
         />
         <button
            className={styles.openExerciseModalBtn}
            onClick={handleOpenExerciseModal}
         >
            <FaChevronRight />
         </button>
         <h1 className={styles.title}>
            {currentExercise && currentExercise.exerciseName}
         </h1>
         <Seperator />
         <SetsTable />
         <div className={styles.setOptionBtnsWrapper}>
            <button className={styles.addSetBtn} onClick={handleAddSetClick}>
               <FaPlusCircle />
               <span>Set</span>
            </button>
            <button
               className={styles.completeSetBtn}
               onClick={handleCompleteSetClick}
            >
               <FaCheck />
               <span>Set</span>
            </button>
         </div>
         <CurrentSet />
         {includeSetNotes ? (
            <textarea
               className={styles.setNotes}
               rows={3}
               cols={20}
               placeholder="Enter set notes..."
               onChange={handleSetNotesChange}
               value={currentSet ? currentSet.notes : ""}
            ></textarea>
         ) : null}
         <div className={styles.setOptionBtnsWrapper}>
            <button
               className={
                  includeSetNotes
                     ? styles.removeSetNotesBtn
                     : styles.addSetNotesBtn
               }
               onClick={handleToggleSetNotes}
            >
               {includeSetNotes ? <FaTrash /> : <FaPlusCircle />}
               <span>Note</span>
            </button>
            <button
               className={styles.completeExerciseBtn}
               onClick={handleCompleteExerciseClick}
            >
               {currentExercise &&
               currentExercise.completedExerciseOrder ===
                  barbellLogState.completedExercises.length ? (
                  <span>{completedWorkoutId ? "Update" : "Complete"}</span>
               ) : (
                  <>
                     <span>Exercise</span>
                     <FaChevronRight />
                  </>
               )}
            </button>
         </div>
      </div>
   );
}
