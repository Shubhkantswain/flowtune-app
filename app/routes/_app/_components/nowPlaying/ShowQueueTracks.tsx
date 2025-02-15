import { Track } from 'gql/graphql';
import React from 'react';
import { Button } from '~/components/ui/button';
import { useTrackStore } from '~/store/useTrackStore';
import { cn } from '~/lib/utils'; // Utility to merge Tailwind classes
import { useQueueStore } from '~/store/useQueueStore';

interface ShowQueueTracksProps {
    isQueueTrackVisible: boolean;
    onHideQueueTrack: () => void;
    queueTracks: Track[];
}

const AnimatedEqualizer = () => {
    return (
        <div className="flex items-center justify-center w-6 h-10">
            <svg viewBox="0 0 24 24" className="w-full h-full">
                <rect x="1" y="8" width="4" height="8" fill="#22c55e" className="animate-[equalizer_1s_ease-in-out_infinite]" style={{ animationDelay: '0.1s' }} />
                <rect x="7" y="5" width="4" height="14" fill="#22c55e" className="animate-[equalizer_1s_ease-in-out_infinite]" style={{ animationDelay: '0.2s' }} />
                <rect x="13" y="2" width="4" height="20" fill="#22c55e" className="animate-[equalizer_1s_ease-in-out_infinite]" style={{ animationDelay: '0.3s' }} />
                <rect x="19" y="5" width="4" height="14" fill="#22c55e" className="animate-[equalizer_1s_ease-in-out_infinite]" style={{ animationDelay: '0.4s' }} />
            </svg>
        </div>
    );
};

const AnimatedEqualizerPause = () => {
    return (
        <div className="flex items-center justify-center w-6 h-10">
            <svg viewBox="0 0 24 24" className="w-full h-full">
                <rect x="1" y="8" width="4" height="8" fill="#22c55e" style={{ animationDelay: '0.1s' }} />
                <rect x="7" y="5" width="4" height="14" fill="#22c55e" style={{ animationDelay: '0.2s' }} />
                <rect x="13" y="2" width="4" height="20" fill="#22c55e" style={{ animationDelay: '0.3s' }} />
                <rect x="19" y="5" width="4" height="14" fill="#22c55e" style={{ animationDelay: '0.4s' }} />
            </svg>
        </div>
    );
};

const ShowQueueTracks: React.FC<ShowQueueTracksProps> = ({
    isQueueTrackVisible = false,
    onHideQueueTrack,
    queueTracks,
}) => {
    const { trackDetails } = useTrackStore();

    return (
        <div
            className={cn(
                "fixed inset-0 bg-black/50 backdrop-blur-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out",
                isQueueTrackVisible ? "translate-y-0" : "translate-y-full"
            )}
        >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h2 className="text-2xl font-bold text-white">Queue</h2>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onHideQueueTrack}
                    className="rounded-full text-white hover:bg-gray-800"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </Button>
            </div>

            <div className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex-1 overflow-auto p-4">
                {/* Now Playing Section */}
                {trackDetails && (
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-white mb-4">Now Playing</h3>
                        <div className="flex items-center gap-4 p-4 border border-white/10 rounded-lg bg-zinc-900/90 transition-colors duration-200">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex-shrink-0"
                            >
                                {trackDetails.isPlaying ? <AnimatedEqualizer /> : <AnimatedEqualizerPause />}
                            </Button>

                            <div className="h-20 w-20 bg-gray-900 rounded-md overflow-hidden flex-shrink-0">
                                <img
                                    src={trackDetails.coverImageUrl || ""}
                                    alt={trackDetails.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex flex-col min-w-0">
                                <span className="text-lg font-semibold text-white truncate">
                                    {trackDetails.title}
                                </span>
                                <span className="text-sm text-gray-400">
                                    {trackDetails.artist}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Next in Queue Section */}
                <h3 className="text-xl font-bold text-white mb-4">Next in Queue</h3>
                <div className="space-y-4">
                    {queueTracks.map((track, idx) => (
                        <div
                            key={track.id}
                            className="flex items-center gap-4 p-4 border border-white/10 rounded-lg bg-zinc-900/90 transition-colors duration-200"
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex-shrink-0"
                            >
                                {idx + 1}
                            </Button>

                            <div className="h-20 w-20 bg-gray-900 rounded-md overflow-hidden flex-shrink-0">
                                <img
                                    src={track.coverImageUrl || ""}
                                    alt={track.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex flex-col min-w-0">
                                <span className="text-lg font-semibold text-white truncate">
                                    {track.title}
                                </span>
                                <span className="text-sm text-gray-400">
                                    {track.artist}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShowQueueTracks;