import { FaCheckCircle } from "react-icons/fa";
import DistanceInput from "./DistanceInput";
import styles from "./ExerciseSetsTable.module.css";
import RepsInput from "./RepsInput";
import TimedInput from "./TimedInput";
import WeightInput from "./WeightInput";

export default function ExerciseSetsTable({ exerciseSets }) {
   const updateHr = (hr: number) => {
      console.log(hr);
   };

   const updateMin = (min: number) => {
      console.log(min);
   };

   const updateSec = (sec: number) => {
      console.log(sec);
   };

   const updateWeight = (weight: number) => {
      console.log(weight);
   };

   const updateDistance = (distance: number) => {
      console.log(distance);
   };

   const updateReps = (reps: number) => {
      console.log(reps);
   };

   return (
      <table className={styles.tableWrapper}>
         <thead>
            <tr>
               <th className={styles.tableHeader}>set</th>
               <th className={styles.tableHeader}>details</th>
               <th className={styles.tableHeader}>complete</th>
            </tr>
         </thead>
         <tbody>
            {exerciseSets &&
               exerciseSets.map((exerciseSet) => (
                  <tr key={exerciseSet.exerciseSetId}>
                     <td className={styles.tableData}>
                        {exerciseSet.completedExerciseSetOrder}
                     </td>
                     <td className={styles.tableData}>
                        <div className={styles.repsWeightInputWrapper}>
                           {exerciseSet.hasReps ? (
                              <RepsInput
                                 reps={exerciseSet.completedReps}
                                 updateReps={updateReps}
                              />
                           ) : null}
                           {exerciseSet.isBodyweight ? (
                              "BW"
                           ) : (
                              <WeightInput
                                 weight={exerciseSet.completedWeight}
                                 weightUnit={exerciseSet.completedWeightUnit}
                                 updateWeight={updateWeight}
                              />
                           )}
                        </div>
                        {exerciseSet.isTimed ? (
                           <TimedInput
                              hr={exerciseSet.compeltedHr}
                              min={exerciseSet.completedMin}
                              sec={exerciseSet.completedSec}
                              updateHr={updateHr}
                              updateMin={updateMin}
                              updateSec={updateSec}
                           />
                        ) : null}
                        {exerciseSet.isDistance ? (
                           <DistanceInput
                              distance={exerciseSet.completedDistance}
                              distanceUnit={exerciseSet.completedDistanceUnit}
                              updateDistance={updateDistance}
                           />
                        ) : null}
                     </td>
                     <td className={styles.tableData}>
                        <button
                           className={`standardIconBtn ${styles.completeBtn}`}
                        >
                           <FaCheckCircle />
                        </button>
                     </td>
                  </tr>
               ))}
         </tbody>
      </table>
   );
}
