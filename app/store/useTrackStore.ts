import { create } from 'zustand';

type AudioRefType = React.RefObject<HTMLAudioElement | null>;
interface TrackStore {
    trackDetails: {
        id: string;
        title: string;
        artist: string;
        duration: string;
        coverImageUrl: string | null;          
        audioFileUrl: string;
        hasLiked: boolean;
        authorName: string;
        isPlaying: boolean;
        audoRef: AudioRefType | null;
        repeatable: boolean
        isQueued: boolean
    };
    setTrackDetails: (audioDetails: Partial<TrackStore['trackDetails']>) => void;
    togglePlay: () => void;
}

export const useTrackStore = create<TrackStore>((set) => ({
    trackDetails: {
        id: '',
        title: '',
        artist: '',
        duration: '',
        coverImageUrl: null,
        audioFileUrl: '',
        hasLiked: false,
        authorName: "",
        isPlaying: false,
        audoRef: null,
        repeatable: false,
        isQueued: false
    },
    setTrackDetails: (trackDetails) =>
        set((state) => ({
            trackDetails: { ...state.trackDetails, ...trackDetails },
        })),
    togglePlay: () =>
        set((state) => ({
            trackDetails: {
                ...state.trackDetails,
                isPlaying: !state.trackDetails.isPlaying,
            },
        })),
}));
