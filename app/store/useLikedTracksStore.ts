import { Track } from 'gql/graphql';
import { create } from 'zustand';

interface LikedTracksState {
  likedTracks: Record<string, Track>;
  unlikedTracks: Record<string, true>;
  setLikedTracks: (tracks: Track[]) => void;
  likeTrack: (track: Track) => void;
  unlikeTrack: (trackId: string) => void;
  isTrackLiked: (trackId: string) => boolean;
  isTrackUnliked: (trackId: string) => boolean;
}

export const useLikedTracksStore = create<LikedTracksState>((set, get) => ({
  likedTracks: {},
  unlikedTracks: {},

  setLikedTracks: (tracks) => {
    const trackMap: Record<string, Track> = {};
    for (const track of tracks) {
      trackMap[track.id] = track;
    }
    set({ likedTracks: trackMap });
  },

  likeTrack: (track) =>
    set((state) => {
      const updatedUnliked = { ...state.unlikedTracks };
      delete updatedUnliked[track.id];

      return {
        likedTracks: {
          ...state.likeTrack,
          [track.id]: track,
        },
        unlikedTracks: updatedUnliked,
      };
    }),

  unlikeTrack: (trackId) =>
    set((state) => {
      const updatedLiked = { ...state.likedTracks };
      delete updatedLiked[trackId];

      return {
        likedTracks: updatedLiked,
        unlikedTracks: {
          ...state.unlikedTracks,
          [trackId]: true,
        },
      };
    }),

  isTrackLiked: (trackId) => !!get().likedTracks[trackId],
  isTrackUnliked: (trackId) => !!get().unlikedTracks[trackId],
}));
