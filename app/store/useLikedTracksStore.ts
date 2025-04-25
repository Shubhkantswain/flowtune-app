import { create } from 'zustand';

interface LikedTracksState {
  likedTrackMap: Record<string, true>;
  setLikedTrackIds: (trackIds: string[]) => void;
  likeTrack: (trackId: string) => void;
  unlikeTrack: (trackId: string) => void;
  isTrackLiked: (trackId: string) => boolean;
}

export const useLikedTracksStore = create<LikedTracksState>((set, get) => ({
  likedTrackMap: {},

  setLikedTrackIds: (trackIds) => {
    const trackMap: Record<string, true> = {};
    for (const id of trackIds) {
      trackMap[id] = true;
    }
    set({ likedTrackMap: trackMap });
  },

  likeTrack: (trackId) =>
    set((state) => ({
      likedTrackMap: {
        ...state.likedTrackMap,
        [trackId]: true,
      },
    })),

  unlikeTrack: (trackId) =>
    set((state) => {
      const updatedMap = { ...state.likedTrackMap };
      delete updatedMap[trackId];
      return { likedTrackMap: updatedMap };
    }),

  isTrackLiked: (trackId) => !!get().likedTrackMap[trackId],
}));
