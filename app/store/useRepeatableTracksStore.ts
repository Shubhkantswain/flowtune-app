import { create } from 'zustand';

/**
 * Interface for managing repeatable tracks state and actions
 */
interface RepeatableTracksState {
  /** Array of track IDs marked for repetition */
  repeatableTrackIds: string[];
  /** Add a track to the repeatable tracks list */
  markTrackAsRepeatable: (trackId: string) => void;
  /** Remove a track from the repeatable tracks list */
  unmarkTrackAsRepeatable: (trackId: string) => void;
  /** Check if a track is marked as repeatable */
  isTrackRepeatable: (trackId: string) => boolean;
}

/**
 * Store for managing repeatable tracks functionality
 */
export const useRepeatableTracksStore = create<RepeatableTracksState>((set, get) => ({
    // State
    repeatableTrackIds: [],

    // Actions
    markTrackAsRepeatable: (trackId: string): void => {
        set((state) => ({
            repeatableTrackIds: [...state.repeatableTrackIds, trackId]
        }));
    },

    unmarkTrackAsRepeatable: (trackId: string): void => {
        set((state) => ({
            repeatableTrackIds: state.repeatableTrackIds.filter(
                (id) => id !== trackId
            )
        }));
    },

    isTrackRepeatable: (trackId: string): boolean => {
        const state = get();
        return state.repeatableTrackIds.includes(trackId);
    }
}));
