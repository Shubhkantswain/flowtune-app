import { Track } from 'gql/graphql';
import { create } from 'zustand';

interface LikedTrackStore {
  likedTracks: Track[];
  setLikedTracks: (tracks: Track[]) => void;
  addLikedTrack: (track: Track) => void;
  removeLikedTrack: (trackId: string) => void;
}

export const useLikedTrackStore = create<LikedTrackStore>((set) => ({
  likedTracks: [],
  setLikedTracks: (tracks) => set({ likedTracks: tracks }),
  addLikedTrack: (track) =>
    set((state) => ({
      likedTracks: [...state.likedTracks, track],
    })),
  removeLikedTrack: (trackId) =>
    set((state) => ({
      likedTracks: state.likedTracks.filter((t) => t.id !== trackId),
    })),
}));
