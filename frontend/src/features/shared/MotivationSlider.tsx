import styles from "./MotivationSlider.module.css";

export default function MotivationSlider({ slideContainer }) {
   return (
      <div
         className={
            slideContainer
               ? `${styles.container} ${styles.containerSlide}`
               : styles.container
         }
      >
         <div className={styles.lightWeightTitleWrapper}>
            <h2 className={styles.lightWeightTitle}>Light</h2>
            <h2 className={styles.lightWeightTitle}>Weight</h2>
         </div>
      </div>
   );
}
