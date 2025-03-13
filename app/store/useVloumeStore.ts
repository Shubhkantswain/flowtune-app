import { create } from "zustand";

interface VolumeState {
  mute: boolean;
  setMute: (mute: boolean) => void;
}

export const useVolumeStore = create<VolumeState>((set) => ({
  mute: false, // Default state
  setMute: (mute) => set({ mute }),
}));
