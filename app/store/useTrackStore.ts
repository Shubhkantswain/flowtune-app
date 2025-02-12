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
    handleVolumeChange: (eventOrVolume: React.MouseEvent<HTMLDivElement> | number) => number;
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

}));
