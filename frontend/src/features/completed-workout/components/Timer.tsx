import { FaPause, FaPlay, FaSyncAlt } from "react-icons/fa";
import { useTimerStore } from "../../../stores/timer.store";
import { formatTime } from "../../../utils/formatting";
import StandardIconBtn from "../../shared/StandardIconBtn";

import styles from "./Timer.module.css";

export default function Timer() {
   const timer = useTimerStore((state) => state.timer);
   const timerState = useTimerStore((state) => state.timerState);
   const pauseTimer = useTimerStore((state) => state.pauseTimer);
   const playTimer = useTimerStore((state) => state.playTimer);
   const restartTimer = useTimerStore((state) => state.restartTimer);

   const handlePausePlayClick = () => {
      console.log("pause play");
      if (timerState === "Paused") {
         playTimer();
      } else {
         pauseTimer();
      }
   };

   const handleRestartClick = () => {
      console.log("restart");
      restartTimer();
   };

   return (
      <div className={styles.container}>
         <h3 className={styles.timer}>{formatTime(timer)}</h3>
         <div className={styles.sideWrapper}>
            <span className={styles.timerState}>{timerState ?? ""}</span>
            <div className={styles.timerOptionsWrapper}>
               {timerState === "Paused" ? (
                  <StandardIconBtn
                     Icon={FaPlay}
                     onClick={handlePausePlayClick}
                  />
               ) : (
                  <StandardIconBtn
                     Icon={FaPause}
                     onClick={handlePausePlayClick}
                  />
               )}
               <StandardIconBtn Icon={FaSyncAlt} onClick={handleRestartClick} />
            </div>
         </div>
      </div>
   );
}
