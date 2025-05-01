import { Track } from 'gql/graphql';
import { create } from 'zustand';

interface DoublyLinkedListNode<T> {
  data: T | null;
  next: DoublyLinkedListNode<T> | null;
  previous: DoublyLinkedListNode<T> | null;
}

class PlaylistNode implements DoublyLinkedListNode<Track> {
  constructor(
    public data: Track | null = null,
    public next: DoublyLinkedListNode<Track> | null = null,
    public previous: DoublyLinkedListNode<Track> | null = null
  ) { }
}

interface PlaylistStoreState {
  // Boundary nodes (sentinel nodes)
  readonly headSentinel: PlaylistNode;
  readonly tailSentinel: PlaylistNode;

  // Current state
  currentlyPlayingNode: PlaylistNode | null;
  firstNode: PlaylistNode | null,
  lastNode: PlaylistNode | null,
  trackNodeMap: Map<string, PlaylistNode>;
  activeSectionIndex: number;
  isPlaylistRepeat: boolean;

  // Store actions
  initializePlaylist: (tracks: Track[]) => void;
  removeTrackFromPlaylist: (trackId: string) => boolean;
  playNextTrack: () => Track | null;
  playPreviousTrack: () => Track | null;
  getCurrentlyPlayingTrack: () => Track | null;
  hasNextTrack: () => boolean;
  hasPreviousTrack: () => boolean;
  setActiveSectionIndex: (index: number) => void;
  setIsPlaylistRepeat: (repeat: boolean) => void;
  setCurrentlyPlayingTrack: (trackId: string) => boolean;
  getAllPlaylistTracks: () => Track[];
  clearPlaylist: () => void;
}

const usePlaylistStore = create<PlaylistStoreState>((set, get) => {
  // Initialize boundary nodes (immutable after creation)
  const headSentinel = new PlaylistNode();
  const tailSentinel = new PlaylistNode();
  headSentinel.next = tailSentinel;
  tailSentinel.previous = headSentinel;

  return {
    headSentinel,
    tailSentinel,
    currentlyPlayingNode: null,
    firstNode: null,
    lastNode: null,
    trackNodeMap: new Map(),
    activeSectionIndex: -1,
    isPlaylistRepeat: false,

    initializePlaylist: (tracks) => {
      const { headSentinel, tailSentinel, trackNodeMap } = get();

      // Reset playlist state
      headSentinel.next = tailSentinel;
      tailSentinel.previous = headSentinel;
      trackNodeMap.clear();

      // Build the linked list
      let lastNode = headSentinel;
      for (const track of tracks) {
        const newNode = new PlaylistNode(track, tailSentinel, lastNode);
        lastNode.next = newNode;
        tailSentinel.previous = newNode;
        lastNode = newNode;
        trackNodeMap.set(track.id, newNode);
      }

      set({
        firstNode: headSentinel.next?.data ? headSentinel.next : null,
        lastNode: tailSentinel.previous?.data ? tailSentinel.previous : null,
        trackNodeMap: new Map(trackNodeMap),
      });
    },

    removeTrackFromPlaylist: (trackId) => { // 1 2 3 4 5
      const { trackNodeMap } = get();
      const nodeToRemove = trackNodeMap.get(trackId);

      if (!nodeToRemove?.data) return false;

      // Save references before disconnecting
      const previousNode = nodeToRemove.previous;
      const nextNode = nodeToRemove.next;

      let newLastNode = null
      if (nodeToRemove == tailSentinel.previous) {
        newLastNode = nodeToRemove.previous
      }

      let newFirstNode = null 
      if (nodeToRemove == headSentinel.next) {
        newFirstNode = nodeToRemove.next
      }

      // Update adjacent nodes to skip over the removed node
      if (previousNode) previousNode.next = nextNode;
      if (nextNode) nextNode.previous = previousNode;

      // Clean up the removed node's references (IMPORTANT FIX)
      nodeToRemove.previous = null;
      nodeToRemove.next = null;

      // Remove from tracking map
      trackNodeMap.delete(trackId);

      if (newLastNode) {
        set({
          trackNodeMap: new Map(trackNodeMap),
          lastNode: newLastNode
        });
      } 
      if(!newLastNode){
        set({ trackNodeMap: new Map(trackNodeMap) });
      }

      if (newFirstNode) {
        set({
          trackNodeMap: new Map(trackNodeMap),
          firstNode: newFirstNode
        });
      } 
      if(!newFirstNode){
        set({ trackNodeMap: new Map(trackNodeMap) });
      }
      
      return true;
    },

    playNextTrack: () => {
      const { currentlyPlayingNode, tailSentinel } = get();
      if (!currentlyPlayingNode?.next || currentlyPlayingNode.next === tailSentinel) return null;

      const nextTrackNode = currentlyPlayingNode.next;
      set({ currentlyPlayingNode: nextTrackNode });
      return nextTrackNode.data;
    },

    playPreviousTrack: () => {
      const { currentlyPlayingNode, headSentinel } = get();
      if (!currentlyPlayingNode?.previous || currentlyPlayingNode.previous === headSentinel) return null;

      const previousTrackNode = currentlyPlayingNode.previous;
      set({ currentlyPlayingNode: previousTrackNode });
      return previousTrackNode.data;
    },

    getCurrentlyPlayingTrack: () => {
      return get().currentlyPlayingNode?.data ?? null;
    },

    getFirstTrack: () => {
      return get().headSentinel?.next?.data ?? null;

    },

    hasNextTrack: () => {
      const { currentlyPlayingNode, tailSentinel } = get();

      // Explicitly check for null/undefined first
      if (currentlyPlayingNode == null) return false;

      // Now safely check the next node
      return currentlyPlayingNode.next !== null && currentlyPlayingNode.next !== tailSentinel;
    },

    hasPreviousTrack: () => {
      const { currentlyPlayingNode, headSentinel } = get();

      // Explicitly check for null/undefined first
      if (currentlyPlayingNode == null) return false;

      // Now safely check the previous node
      return currentlyPlayingNode.previous !== null && currentlyPlayingNode.previous !== headSentinel;
    },

    setActiveSectionIndex: (index) => {
      set({ activeSectionIndex: index });
    },

    setIsPlaylistRepeat: (repeat) => {
      set({ isPlaylistRepeat: repeat });
    },

    setCurrentlyPlayingTrack: (trackId) => {
      const { trackNodeMap } = get();
      const targetNode = trackNodeMap.get(trackId);

      if (!targetNode?.data) return false;

      console.log("pls dont'ooo");
      
      set({ currentlyPlayingNode: targetNode });
      return true;
    },

    getAllPlaylistTracks: () => {
      const { headSentinel, tailSentinel } = get();
      const playlistTracks: Track[] = [];

      let currentNode = headSentinel.next;
      while (currentNode && currentNode !== tailSentinel) {
        if (currentNode.data) {
          playlistTracks.push(currentNode.data);
        }
        currentNode = currentNode.next;
      }

      return playlistTracks;
    },

    clearPlaylist: () => {
      const { headSentinel, tailSentinel } = get();
      headSentinel.next = tailSentinel;
      tailSentinel.previous = headSentinel;

      set({
        currentlyPlayingNode: null,
        trackNodeMap: new Map(),
        activeSectionIndex: -1,
      });
    },
  };
});

export default usePlaylistStore;