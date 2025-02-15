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
    private currentNode: QueueNode | null = null

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

        node.next = null
        node.prev = null

        this.trackMap.delete(trackId);
        this.size--;
    }

    dequeueFirst(): Track | null {
        if (this.size === 0) return null;

        if (!this.currentNode) {
            const firstNode = this.head.next!;

            this.currentNode = firstNode

            return this.currentNode.track
        }

        const firstNode = this.currentNode.next!;
        this.currentNode = firstNode
        this.size--
        this.trackMap.delete(firstNode.track.id);

        return firstNode.track
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
 * Zustand store for managing track queue state.
 */
export const useQueueStore = create(() => ({
    trackQueue: new TrackQueue(),

    enqueueTrack: (track: Track) => useQueueStore.getState().trackQueue.enqueue(track),
    dequeueTrack: (trackId: string) => useQueueStore.getState().trackQueue.dequeue(trackId),
    dequeueFirstTrack: () => useQueueStore.getState().trackQueue.dequeueFirst(),
    isTrackInQueue: (trackId: string) => useQueueStore.getState().trackQueue.hasTrack(trackId),
    getQueueSize: () => useQueueStore.getState().trackQueue.getQueueSize(),
    getAllTracks: () => useQueueStore.getState().trackQueue.getAllTracks(),
}));
