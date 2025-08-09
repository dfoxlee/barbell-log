import { create } from "zustand";

interface TimerStore {
   timer: number;
   isTimerRunning: boolean;
   intervalId: number | null;
   timerMessage: string;

   updateTimerMessage: (timerMessage: string) => void;
   startTimer: (timerMessage: string) => void;
   stopTimer: () => void;
   resetTimer: () => void;
   tick: () => void;
}

export const useTimerStore = create<TimerStore>((set, get) => ({
   timer: 0,
   isTimerRunning: false,
   intervalId: null,
   timerMessage: "",

   updateTimerMessage: (timerMessage) => set({ timerMessage }),

   startTimer: (timerMessage: string) => {
      if (!get().isTimerRunning) {
         const interval = window.setInterval(() => {
            get().tick();
         }, 1000);
         set({ isTimerRunning: true, intervalId: interval, timerMessage });
      }
   },

   stopTimer: () => {
      const { intervalId } = get();
      if (intervalId !== null) {
         window.clearInterval(intervalId);
      }
      set({ isTimerRunning: false, intervalId: null });
   },

   resetTimer: () => {
      get().stopTimer();
      set({ timer: 0 });
   },

   tick: () => {
      set((state) => ({ timer: state.timer + 1 }));
   },
}));
