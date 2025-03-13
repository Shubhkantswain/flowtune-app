import { Track } from 'gql/graphql';
import { create } from 'zustand';

class Node {
  track: Track | null; // `track` can be null for dummy nodes
  next: Node | null;
  prev: Node | null;

  constructor(track: Track | null = null) {
    this.track = track;
    this.next = null;
    this.prev = null;
  }
}

interface PlaylistState {
  head: Node; // Dummy head node (always exists)
  tail: Node; // Dummy tail node (always exists)
  current: Node | null; // Current track node (can be null if no track is selected)
  nodesMap: Record<string, Node>; // Hash map for O(1) lookup
  initialize: (tracks: Track[]) => void;
  next: () => Track | null;
  prev: () => Track | null;
  getCurrentTrack: () => Track | null;
  hasNext: () => boolean;
  hasPrev: () => boolean;
  setCurrentTrack: (trackId: string) => void; // O(1) lookup
  getAllTracks: () => Track[]
  getCurrent: () => Track | null
}

const usePlaylistStore = create<PlaylistState>((set, get) => ({
  head: new Node(), // Dummy head node
  tail: new Node(), // Dummy tail node
  current: null,
  nodesMap: {}, // Initialize the hash map

  initialize: (tracks: Track[]) => {
    const { head, tail } = get();

    // Clear existing nodes (if any)
    head.next = tail;
    tail.prev = head;

    const nodesMap: Record<string, Node> = {};

    // Build the doubly linked list between dummy head and tail
    let current = head;
    for (const track of tracks) {
      const newNode = new Node(track);
      current.next = newNode;
      newNode.prev = current;
      current = newNode;
      nodesMap[track.id] = newNode; // Add to the hash map
    }

    // Connect the last node to the dummy tail
    current.next = tail;
    tail.prev = current;

    set({
      current: head.next?.track ? head.next : null, // Set current to the first track (if any)
      nodesMap: nodesMap, // Set the hash map
    });
  },

  next: () => {
    const { current, tail } = get();
    if (current && current.next !== tail) {
      set({ current: current.next });
      return current.next!.track;
    }
    return null;
  },

  prev: () => {
    const { current, head } = get();
    if (current && current.prev !== head) {
      set({ current: current.prev });
      return current.prev!.track;
    }
    return null;
  },

  getCurrentTrack: () => {
    const { current } = get();
    return current ? current.track : null;
  },

  hasNext: () => {
    const { current, tail } = get();
    return current !== null && current.next !== tail;
  },

  hasPrev: () => {
    const { current, head } = get();
    return current !== null && current.prev !== head;
  },

  // O(1) lookup using the hash map
  setCurrentTrack: (trackId: string) => {
    const { nodesMap } = get();
    const node = nodesMap[trackId]; // Directly access the node
    if (node) {
      set({ current: node });
    }
  },

  getAllTracks: () => {
    const { head, tail } = usePlaylistStore.getState();
    const tracks: Track[] = [];

    let current = head.next;
    while (current && current !== tail) {
      if (current.track) {
        tracks.push(current.track);
      }
      current = current.next;
    }

    return tracks;
  },

  getCurrent: () => {
    const { current } = get();
    return current?.track || null
  }

}));

export default usePlaylistStore;