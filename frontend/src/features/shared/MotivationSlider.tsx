import { useEffect, useState } from "react";
import styles from "./MotivationSlider.module.css";

export default function MotivationSlider({ onFadeOutComplete }) {
   const [isFadingOut, setIsFadingOut] = useState(false);

   useEffect(() => {
      const showOverlayTimer = setTimeout(() => {
         setIsFadingOut(true);
      }, 500);

      const removeOverlayTimer = setTimeout(() => {
         onFadeOutComplete();
      }, 1000);

      return () => {
         clearTimeout(showOverlayTimer);
         clearTimeout(removeOverlayTimer);
      };
   }, [onFadeOutComplete]);

   return (
      <div
         className={`${styles.container} ${isFadingOut ? styles.fadeOut : ""}`}
      >
         <div className={styles.lightWeightTitleWrapper}>
            <h2 className={styles.lightWeightTitle}>Light</h2>
            <h2 className={styles.lightWeightTitle}>Weight</h2>
         </div>
      </div>
   );
}
