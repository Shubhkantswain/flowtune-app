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
    setTrackDetails: (trackDetails: Partial<TrackStore['trackDetails']>) => void;
    togglePlay: () => void;
    handleVolumeChange: (event: React.MouseEvent<HTMLDivElement>) => number
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

    handleVolumeChange: (event) => {
        const slider = event.currentTarget;
        const rect = slider.getBoundingClientRect();
        const clickPosition = event.clientX - rect.left;
        const newVolume = clickPosition / rect.width;

        // Ensure volume stays within the bounds of 0 to 1
        const boundedVolume = Math.max(0, Math.min(1, newVolume));

        const audioElement = useTrackStore.getState().trackDetails.audoRef?.current;
        if (audioElement) {
            audioElement.volume = boundedVolume;
        }

        return boundedVolume
    },
}));
