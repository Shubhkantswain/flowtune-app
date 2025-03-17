import { create } from "zustand";

interface MusicPreferenceState {
  musicPreferencesOpen: boolean;
  setMusicPreferencesOpen: (isOpen: boolean) => void;
}

const useMusicPreferenceStore = create<MusicPreferenceState>((set) => ({
  musicPreferencesOpen: false,
  setMusicPreferencesOpen: (isOpen) => set({ musicPreferencesOpen: isOpen }),
}));

export default useMusicPreferenceStore;
