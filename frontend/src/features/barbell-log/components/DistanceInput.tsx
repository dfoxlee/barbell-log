import styles from "./Inputs.module.css";

export default function DistanceInput({
   distance,
   distanceUnit,
   updateDistance,
}) {
   const handleDistanceChange = (event) => {
      updateDistance(event.target.value);
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
