import { FaPause, FaPlay, FaUndo } from "react-icons/fa";
import { useTimerStore } from "../../../stores/timerStore";
import { formatTimer } from "../utils/formatTimer";
import styles from "./WorkoutTimer.module.css";
import { useEffect } from "react";

export default function WorkoutTimer() {
   const timer = useTimerStore((state) => state.timer);
   const timerMessage = useTimerStore((state) => state.timerMessage);
   const isTimerRunning = useTimerStore((state) => state.isTimerRunning);
   const stopTimer = useTimerStore((state) => state.stopTimer);
   const startTimer = useTimerStore((state) => state.startTimer);
   const resetTimer = useTimerStore((state) => state.resetTimer);

   useEffect(() => startTimer("Workout start time"), []);

   const handleTimerControlBtnClick = () => {
      if (isTimerRunning) {
         stopTimer();
      } else {
         startTimer(timerMessage);
      }
   };

   const handleResetBtnClick = () => {
      resetTimer();
      if (isTimerRunning) {
         startTimer(timerMessage);
      }
   };

   return (
      <div className={styles.container}>
         {`${timerMessage}: ${formatTimer(timer)}`}
         <button
            className={`standardIconBtn ${styles.pausePlayBtn}`}
            onClick={handleTimerControlBtnClick}
         >
            {isTimerRunning ? <FaPause /> : <FaPlay />}
         </button>
         <button
            className={`standardIconBtn ${styles.resetBtn}`}
            onClick={handleResetBtnClick}
         >
            <FaUndo />
         </button>
      </div>
   );
}
