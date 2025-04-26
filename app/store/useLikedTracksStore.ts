import { create } from 'zustand';

interface LikedTracksState {
  likedTrackMap: Record<string, true>;
  unlikedTrackMap: Record<string, true>;
  setLikedTrackIds: (trackIds: string[]) => void;
  likeTrack: (trackId: string) => void;
  unlikeTrack: (trackId: string) => void;
  isTrackLiked: (trackId: string) => boolean;
  isTrackUnliked: (trackId: string) => boolean;
}

export const useLikedTracksStore = create<LikedTracksState>((set, get) => ({
  likedTrackMap: {},
  unlikedTrackMap: {},

  setLikedTrackIds: (trackIds) => {
    const trackMap: Record<string, true> = {};
    for (const id of trackIds) {
      trackMap[id] = true;
    }
    set({ likedTrackMap: trackMap });
  },

  likeTrack: (trackId) =>
    set((state) => {
      const updatedUnliked = { ...state.unlikedTrackMap };
      delete updatedUnliked[trackId];

      return {
        likedTrackMap: {
          ...state.likedTrackMap,
          [trackId]: true,
        },
        unlikedTrackMap: updatedUnliked,
      };
    }),

  unlikeTrack: (trackId) =>
    set((state) => {
      const updatedLiked = { ...state.likedTrackMap };
      delete updatedLiked[trackId];

      return {
        likedTrackMap: updatedLiked,
        unlikedTrackMap: {
          ...state.unlikedTrackMap,
          [trackId]: true,
        },
      };
    }),

  isTrackLiked: (trackId) => !!get().likedTrackMap[trackId],
  isTrackUnliked: (trackId) => !!get().unlikedTrackMap[trackId],
}));
