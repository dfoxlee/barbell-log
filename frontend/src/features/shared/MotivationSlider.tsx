import { useEffect, useState } from "react";
import styles from "./MotivationSlider.module.css";
import { motivationalSayings } from "../../enums/constants";

export default function MotivationSlider({
   onFadeOutComplete,
   motivationIndex,
}) {
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
            <h2 className={`${styles.lightWeightTitle}`}>
               {motivationalSayings[motivationIndex]}
            </h2>
         </div>
      </div>
   );
}
