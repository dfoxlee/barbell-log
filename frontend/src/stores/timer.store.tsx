import { create } from "zustand";

interface TimerStore {
   timer: number;
   timerState: string | null;
   intervalId: ReturnType<typeof setInterval> | null;

   startTimer: (timerState: string) => void;
   pauseTimer: () => void;
   playTimer: () => void;
   restartTimer: () => void;
   _tick: () => void;
}

export const useTimerStore = create<TimerStore>((set, get) => ({
   timer: 0,
   timerState: null,
   intervalId: null,

   _tick: () => {
      const { timer } = get();

      const newTimer = timer + 1;

      set({ timer: newTimer });
   },

   startTimer: (timerState) => {
      const { intervalId, _tick } = get();

      if (intervalId !== null) {
         clearInterval(intervalId);
      }

      const newIntervalId = setInterval(_tick, 1000);

      set({ timerState, intervalId: newIntervalId });
   },

   pauseTimer: () => {
      const { intervalId } = get();

      if (intervalId !== null) {
         clearInterval(intervalId);
      }

      set({ timerState: "Paused", intervalId: null });
   },

   playTimer: () => {
      const { timerState, _tick } = get();

      if (timerState !== "Paused") return;

      const newIntervalId = setInterval(_tick, 1000);

      set({
         intervalId: newIntervalId,
      });
   },

   restartTimer: () => {
      const { _tick, timerState, intervalId } = get();

      if (intervalId !== null) {
         clearInterval(intervalId);
      }

      if (timerState === "Paused") {
         return set({
            timer: 0,
            intervalId: null,
            timerState: "Paused",
         });
      }

      const newIntervalId = setInterval(_tick, 1000);

      set({
         timer: 0,
         intervalId: newIntervalId,
         timerState: "Restarted",
      });
   },
}));
