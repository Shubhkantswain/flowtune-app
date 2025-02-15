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
        fromClick: boolean
    };
    setTrackDetails: (trackDetails: Partial<TrackStore['trackDetails']>) => void;
    togglePlay: () => void;
    handleVolumeChange: (eventOrVolume: React.MouseEvent<HTMLDivElement> | number) => number;
    handleSeek: (value: number[]) => void;
    handleSkip: (direction: 'forward' | 'backward') => void;
    handlePlaybackSpeed: (value: number[]) => number[]
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
        fromClick: false
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

    handleVolumeChange: (eventOrVolume) => {
        console.log("initial handleVolumeChange");

        let roundedVolume: number;

        if (typeof eventOrVolume === 'number') {
            // Directly using the number as volume
            roundedVolume = Math.max(0, Math.min(1, parseFloat(eventOrVolume.toFixed(2))));
        } else {
            // Handling MouseEvent case
            const slider = eventOrVolume.currentTarget;
            const rect = slider.getBoundingClientRect();
            const clickPosition = eventOrVolume.clientX - rect.left;
            const newVolume = clickPosition / rect.width;
            roundedVolume = Math.max(0, Math.min(1, parseFloat(newVolume.toFixed(2))));
        }

        const audioElement = useTrackStore.getState().trackDetails.audoRef?.current;

        if (audioElement) {
            audioElement.volume = roundedVolume;
        }

        if (typeof window !== 'undefined') {
            localStorage.setItem('volume', `${roundedVolume}`);
        }

        console.log('boundedVolume', roundedVolume);

        return roundedVolume;
    },

    handleSeek: (value) => {
        const audioElement = useTrackStore.getState().trackDetails.audoRef?.current;
        if (audioElement) {
            audioElement.currentTime = value[0];
        }
    },

    handleSkip: (direction) => {
        const audioElement = useTrackStore.getState().trackDetails.audoRef?.current;
        if (!audioElement) return;

        const skipForward = 30; // seconds for forward skip
        const skipBackward = 15; // seconds for backward skip
        const currentTime = audioElement.currentTime;

        const newTime = direction === 'forward'
            ? Math.min(currentTime + skipForward, audioElement.duration)
            : Math.max(currentTime - skipBackward, 0);

        // Update audio time
        audioElement.currentTime = newTime;
    },

    handlePlaybackSpeed: (value: number[]) => {
        const audioElement = useTrackStore.getState().trackDetails.audoRef?.current;
        if (audioElement && value.length > 0) {
            audioElement.playbackRate = value[0];
        }

        if (typeof window !== 'undefined') {
            localStorage.setItem('speed', `${value[0]}`);
        }

        return value
    },
}));
