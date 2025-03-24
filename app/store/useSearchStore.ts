import { create } from 'zustand';

// Define the store state interface
interface SearchState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

// Create the store
const useSearchStore = create<SearchState>((set) => ({
  searchQuery: '',
  setSearchQuery: (query: string) => set({ searchQuery: query }),
}));

export default useSearchStore;