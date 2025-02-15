import { Track } from "gql/graphql";
import { create } from "zustand";

/**
 * Doubly linked list node representing a track in the queue.
 */
class QueueNode {
    track: Track;
    prev: QueueNode | null = null;
    next: QueueNode | null = null;

    constructor(track: Track) {
        this.track = track;
    }
}

/**
 * Queue structure for managing track playback order.
 */
class TrackQueue {
    private trackMap = new Map<string, QueueNode>();
    private size = 0;
    private head = new QueueNode({} as Track);
    private tail = new QueueNode({} as Track);

    constructor() {
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    enqueue(track: Track): void {
        if (this.trackMap.has(track.id)) return;

        const newNode = new QueueNode(track);
        const prevNode = this.tail.prev!;

        prevNode.next = newNode;
        newNode.prev = prevNode;
        newNode.next = this.tail;
        this.tail.prev = newNode;

        this.trackMap.set(track.id, newNode);
        this.size++;
    }

    dequeue(trackId: string): void {
        const node = this.trackMap.get(trackId);
        if (!node) return;

        node.prev!.next = node.next;
        node.next!.prev = node.prev;

        node.next = null;
        node.prev = null;

        this.trackMap.delete(trackId);
        this.size--;
    }

    dequeueFirst(): Track | null {
        if (this.size === 0) return null;

        const firstNode = this.head.next!;
        if (firstNode === this.tail) return null;

        this.head.next = firstNode.next;
        firstNode.next!.prev = this.head;

        firstNode.next = null;
        firstNode.prev = null;

        this.trackMap.delete(firstNode.track.id);
        this.size--;

        return firstNode.track;
    }

    hasTrack(trackId: string): boolean {
        return this.trackMap.has(trackId);
    }

    getQueueSize(): number {
        return this.size;
    }

    getAllTracks(): Track[] {
        const tracks: Track[] = [];
        let current = this.head.next;

        while (current && current !== this.tail) {
            tracks.push(current.track);
            current = current.next!;
        }

        return tracks;
    }
}

/**
 * Define Zustand Store Type
 */
interface QueueStoreState {
    trackQueue: TrackQueue;
    enqueueTrack: (track: Track) => void;
    dequeueTrack: (trackId: string) => void;
    dequeueFirstTrack: () => Track | null;
    isTrackInQueue: (trackId: string) => boolean;
    getQueueSize: () => number;
    getAllTracks: () => Track[];
}

/**
 * Zustand store for managing track queue state.
 */
export const useQueueStore = create<QueueStoreState>((set, get) => ({
    trackQueue: new TrackQueue(),

    enqueueTrack: (track: Track) => {
        set((state) => {
            state.trackQueue.enqueue(track);
            return { trackQueue: state.trackQueue };
        });
    },
    dequeueTrack: (trackId: string) => {
        set((state) => {
            state.trackQueue.dequeue(trackId);
            return { trackQueue: state.trackQueue };
        });
    },
    dequeueFirstTrack: () => {
        let dequeuedTrack: Track | null = null;
        set((state) => {
            dequeuedTrack = state.trackQueue.dequeueFirst(); // Store the dequeued track
            return { trackQueue: state.trackQueue };
        });
        return dequeuedTrack; // Return the dequeued track
    },
    
    isTrackInQueue: (trackId: string) => get().trackQueue.hasTrack(trackId),
    getQueueSize: () => get().trackQueue.getQueueSize(),
    getAllTracks: () => get().trackQueue.getAllTracks(),
}));
