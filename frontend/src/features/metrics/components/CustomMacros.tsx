import styles from "./CustomMacros.module.css";

export default function CustomMacros() {
   return (
      <div className={styles.container}>
         <div className={styles.inputWrapper}>
            <label
               className={`subText ${styles.metricInputLabel}`}
               htmlFor="calories"
            >
               calories / energy (kcal)
            </label>
            <input
               className={`decimalValueInput`}
               type="number"
               inputMode="numeric"
               name="calories"
               id="calories"
            />
         </div>
         <div className={styles.inputWrapper}>
            <label
               className={`subText ${styles.metricInputLabel}`}
               htmlFor="protien"
            >
               protien (g)
            </label>
            <input
               className={`decimalValueInput`}
               type="number"
               inputMode="numeric"
               name="protien"
               id="protien"
            />
         </div>
         <div className={styles.inputWrapper}>
            <label
               className={`subText ${styles.metricInputLabel}`}
               htmlFor="carbohydrates"
            >
               carbohydrates (g)
            </label>
            <input
               className={`decimalValueInput`}
               type="number"
               inputMode="numeric"
               name="carbohydrates"
               id="carbohydrates"
            />
         </div>
         <div className={styles.inputWrapper}>
            <label
               className={`subText ${styles.metricInputLabel}`}
               htmlFor="fiber"
            >
               fiber (g)
            </label>
            <input
               className={`decimalValueInput`}
               type="number"
               inputMode="numeric"
               name="fiber"
               id="fiber"
            />
         </div>
         <div className={styles.inputWrapper}>
            <label
               className={`subText ${styles.metricInputLabel}`}
               htmlFor="added-sugars"
            >
               total sugars (g)
            </label>
            <input
               className={`decimalValueInput`}
               type="number"
               inputMode="numeric"
               name="added-sugars"
               id="added-sugars"
            />
         </div>
         <div className={styles.inputWrapper}>
            <label
               className={`subText ${styles.metricInputLabel}`}
               htmlFor="added-sugars"
            >
               added sugars (g)
            </label>
            <input
               className={`decimalValueInput`}
               type="number"
               inputMode="numeric"
               name="added-sugars"
               id="added-sugars"
            />
         </div>
         <div className={styles.inputWrapper}>
            <label
               className={`subText ${styles.metricInputLabel}`}
               htmlFor="fat"
            >
               fat (g)
            </label>
            <input
               className={`decimalValueInput`}
               type="number"
               inputMode="numeric"
               name="fat"
               id="fat"
            />
         </div>
         <div className={styles.inputWrapper}>
            <label
               className={`subText ${styles.metricInputLabel}`}
               htmlFor="sodium"
            >
               sodium (mg)
            </label>
            <input
               className={`decimalValueInput`}
               type="number"
               inputMode="numeric"
               name="sodium"
               id="sodium"
            />
         </div>
         <div className={styles.inputWrapper}>
            <label
               className={`subText ${styles.metricInputLabel}`}
               htmlFor="cholesterol"
            >
               cholesterol (mg)
            </label>
            <input
               className={`decimalValueInput`}
               type="number"
               inputMode="numeric"
               name="cholesterol"
               id="cholesterol"
            />
         </div>
      </div>
   );
}
