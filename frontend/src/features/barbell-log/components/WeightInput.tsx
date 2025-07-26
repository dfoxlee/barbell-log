import styles from "./Inputs.module.css";

export default function WeightInput({ weight, weightUnit, updateWeight }) {
   const handleWeightChange = (event) => {
      updateWeight(event.target.value);
   };

   return (
      <div className={styles.inputWrapper}>
         <div className={styles.weightIncrementWrapper}>
            <button className={styles.weightIncrementBtn}>0.5</button>
            <button className={styles.weightIncrementBtn}>1</button>
            <button className={styles.weightIncrementBtn}>5</button>
         </div>
         <input
            className={`standardInput ${styles.decimalInput}`}
            type="number"
            inputMode="decimal"
            value={weight}
            onChange={handleWeightChange}
         />
         <div className={styles.weightIncrementWrapper}>
            <button className={styles.weightDecrementBtn}>0.5</button>
            <button className={styles.weightDecrementBtn}>1</button>
            <button className={styles.weightDecrementBtn}>5</button>
         </div>
         <span className={styles.inputLabel}>{weightUnit}</span>
      </div>
   );
}
