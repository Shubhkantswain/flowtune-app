import { create } from 'zustand';

interface SleepModeState {
  sleepTimeLeft: number; // Remaining sleep time in minutes
  isSleepModeActive: boolean; // Whether sleep mode is active
  isSleepModeComplete: boolean;
  endOfTheTrackEnabled: boolean;
  setSleepTimeLeft: (minutes: number) => void; // Set the sleep time
  setEndOfTheTrackEnabled: (enabled: boolean) => void; // Set the sleep time
  startSleepMode: () => void; // Start sleep mode
  stopSleepMode: () => void; // Stop sleep mode
  resetSleepMode: () => void; // Reset sleep mode
}

const useSleepModeStore = create<SleepModeState>((set, get) => ({
  sleepTimeLeft: 0, // Initial sleep time left
  isSleepModeActive: false, // Initially, sleep mode is inactive
  isSleepModeComplete: false,
  endOfTheTrackEnabled: false,

  // Set the sleep time left
  setSleepTimeLeft: (minutes) => {
    set({ sleepTimeLeft: minutes });
  },

  setEndOfTheTrackEnabled: (enabled) => {
    set({ endOfTheTrackEnabled: enabled });
  },

  // Start sleep mode
  startSleepMode: () => {
    const { sleepTimeLeft, isSleepModeActive } = get();

    // If sleep mode is already active or no time is set, do nothing
    if (isSleepModeActive || sleepTimeLeft <= 0) return;

    // Activate sleep mode
    set({ isSleepModeActive: true });

    // Decrement sleep time every minute
    const interval = setInterval(() => {  // 1min- 4 2min-3  3min - 2 4min - 1 5min - 0 
      const { sleepTimeLeft, isSleepModeActive } = get();

      // If sleep mode is no longer active, clear the interval
      if (!isSleepModeActive) {
        clearInterval(interval);
        return;
      }

      // Decrement sleep time
      if (sleepTimeLeft > 0) {
        set({ sleepTimeLeft: sleepTimeLeft - 1 });
        if(sleepTimeLeft - 1 == 0) {
            clearInterval(interval);
            set({ isSleepModeActive: false, isSleepModeComplete: true });
            console.log("Sleep mode ended!");
        }
      } else {
        // Stop sleep mode when time runs out
        clearInterval(interval);
        set({ isSleepModeActive: false, isSleepModeComplete: true });
        console.log("Sleep mode ended!");
      }
    }, 60000); // 60000ms = 1 minute
  },

  // Stop sleep mode
  stopSleepMode: () => {
    set({ isSleepModeActive: false });
  },

  // Reset sleep mode
  resetSleepMode: () => {
    set({ sleepTimeLeft: 0, isSleepModeActive: false });
  },
}));

export default useSleepModeStore;