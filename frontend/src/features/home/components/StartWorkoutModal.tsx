import { FaTimes } from "react-icons/fa";
import StandardIconBtn from "../../shared/StandardIconBtn";

import styles from "./StartWorkoutModal.module.css";
import { useWorkoutStore } from "../../../stores/workout.store";
import { useFetchWorkouts } from "../../../hooks/useFetchWorkouts";
import StandardBtn from "../../shared/StandardBtn";
import { useEffect, useState, type ChangeEvent } from "react";
import WorkoutTypeSelector from "../../shared/WorkoutTypeSelector";
import type { WorkoutType } from "../../../types/workout.types";
import { useNavigate } from "react-router-dom";

interface StartWorkoutModalPropsType {
   toggleStartWorkoutModalOpen: () => void;
}

export default function StartWorkoutModal({
   toggleStartWorkoutModalOpen,
}: StartWorkoutModalPropsType) {
   const [workoutTypeFilter, setWorkoutTypeFilter] = useState(12);
   const workouts = useWorkoutStore((state) => state.workouts);
   const [filteredWorkouts, setFilteredWorkouts] = useState<WorkoutType[]>([]);
   const [workoutSelected, setWorkoutSelected] = useState("");
   const navigate = useNavigate();

   useEffect(() => {
      if (workouts) {
         setFilteredWorkouts(workouts);
         setWorkoutSelected(workouts[0].workoutName);
      }
   }, [workouts]);

   const { getWorkouts } = useFetchWorkouts();

   const handleStartWorkoutClick = () => {
      const workout = workouts?.find(
         (workout) => workout.workoutName === workoutSelected
      );

      if (!workout) {
         return;
      }

      navigate(`/home/completed-workout/${workout.workoutId}`);
   };

   const handleWorkoutTypeFilterChange = (
      event: ChangeEvent<HTMLSelectElement>
   ) => {
      setWorkoutTypeFilter(parseInt(event.target.value));
      setFilteredWorkouts(
         workouts?.filter(
            (workout) => workout.workoutType === parseInt(event.target.value)
         ) ?? []
      );
   };

   const handleWorkoutChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setWorkoutSelected(event.target.value);
   };

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <StandardIconBtn
               Icon={FaTimes}
               onClick={toggleStartWorkoutModalOpen}
               disabled={false}
            />
            <h2 className={`modalTitle`}>Start a Workout</h2>
            <div className={styles.selectorWrapper}>
               <span className={styles.selectorLabel}>
                  Filter by Workout Type
               </span>
               <WorkoutTypeSelector
                  value={workoutTypeFilter}
                  onChange={handleWorkoutTypeFilterChange}
               />
            </div>
            <div className={styles.selectorWrapper}>
               <span className={styles.selectorLabel}>
                  Select Workout to Begin
               </span>
               <select
                  name="workouts"
                  id="workouts"
                  className={styles.selector}
                  onChange={handleWorkoutChange}
                  value={workoutSelected}
               >
                  {filteredWorkouts.length ? (
                     filteredWorkouts?.map((workout) => (
                        <option key={workout.workoutId}>
                           {workout.workoutName}
                        </option>
                     ))
                  ) : (
                     <option>No workouts available.</option>
                  )}
               </select>
            </div>
            <div className={styles.btnsWrapper}>
               <StandardBtn
                  text="cancel"
                  onClick={toggleStartWorkoutModalOpen}
               />
               <StandardBtn text="Start" onClick={handleStartWorkoutClick} />
            </div>
         </div>
      </div>
   );
}
