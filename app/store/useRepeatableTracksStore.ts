import { create } from "zustand";

const repeatableTracks = new Set<string>();

interface RepeatableTracksState {
  markTrackAsRepeatable: (trackId: string) => void;
  unmarkTrackAsRepeatable: (trackId: string) => void;
  isTrackRepeatable: (trackId: string) => boolean;
}

export const useRepeatableTracksStore = create<RepeatableTracksState>(() => ({
  markTrackAsRepeatable: (trackId: string) => {
    repeatableTracks.add(trackId);
  },

  unmarkTrackAsRepeatable: (trackId: string) => {
    repeatableTracks.delete(trackId);
  },

  isTrackRepeatable: (trackId: string) => repeatableTracks.has(trackId),
}));
