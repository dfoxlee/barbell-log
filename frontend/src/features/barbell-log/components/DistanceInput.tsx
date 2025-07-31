import styles from "./Inputs.module.css";

export default function DistanceInput({
   distance,
   distanceUnit,
   updateDistance,
   completedExerciseSetOrder,
}) {
   const handleDistanceChange = (event) => {
      updateDistance({
         distance: event.target.value,
         completedExerciseSetOrder,
      });
   };

   return (
      <div className={styles.inputWrapper}>
         <input
            className={`standardInput ${styles.decimalInput}`}
            type="number"
            inputMode="numeric"
            value={distance}
            onChange={handleDistanceChange}
         />
         <span className={styles.inputLabel}>{distanceUnit}</span>
      </div>
   );
}
