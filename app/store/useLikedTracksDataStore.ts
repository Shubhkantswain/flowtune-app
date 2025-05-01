import { create } from 'zustand'
import { Track } from 'gql/graphql'

interface LikedTracksDataState {
  likedTracksData: Track[]
  setLlikedTracksData: (tracks: Track[]) => void
}

export const useLikedTracksDataStore = create<LikedTracksDataState>((set) => ({
  likedTracksData: [],
  setLlikedTracksData: (tracks: Track[]) => set({ likedTracksData: tracks }),
}))
