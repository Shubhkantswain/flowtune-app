import { Track } from 'gql/graphql';
import React from 'react';
import { Button } from '~/components/ui/button';
import { useTrackStore } from '~/store/useTrackStore';
import { cn } from '~/lib/utils'; // Utility to merge Tailwind classes
import AnimatedEqualizer from './AnimatedEqualizer';
import AnimatedEqualizerPause from './AnimatedEqualizerPause';

interface ShowQueueTracksProps {
    isQueueTrackVisible: boolean;
    onHideQueueTrack: () => void;
    queueTracks: Track[];
}

const ShowQueueTracks: React.FC<ShowQueueTracksProps> = ({
    isQueueTrackVisible = false,
    onHideQueueTrack,
    queueTracks,
}) => {
    const { trackDetails } = useTrackStore();

    return (
        <div
            className={cn(
                "fixed inset-0 bg-black/50 backdrop-blur-2xl z-50 flex flex-col",
                isQueueTrackVisible ? "translate-y-0" : "translate-y-full"
            )}
        >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h2 className="text-2xl font-bold text-white">Queue</h2>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onHideQueueTrack}
                    className="rounded-full text-white hover:bg-transparent hover:text-white"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </Button>
            </div>

            <div className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex-1 overflow-auto p-4 sm:p-6 flex flex-col items-center">
                {/* Now Playing Section */}
                {trackDetails && (
                    <div className="mb-6 md:mb-8 w-full max-w-2xl">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-3 md:mb-4 flex items-center">
                            <span className="inline-block w-2 h-2 bg-[#25d1da] rounded-full mr-2"></span>
                            Now Playing
                        </h3>
                        <div className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-zinc-900/90 to-zinc-800/70 backdrop-blur-md border-l-4 border-[#25d1da] transition-all duration-300 hover:shadow-lg hover:shadow-[#25d1da]/30 ">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 sm:h-12 sm:w-12 rounded-full  text-white flex-shrink-0 transition-transform duration-300 hover:scale-110"
                            >
                                {trackDetails.isPlaying ? <AnimatedEqualizer /> : <AnimatedEqualizerPause />}
                            </Button>

                            <div className="h-14 w-14 sm:h-20 sm:w-20 rounded-sm overflow-hidden flex-shrink-0 shadow-lg shadow-black/20 transform transition-transform duration-300 hover:scale-105">
                                <img
                                    src={trackDetails.coverImageUrl || ""}
                                    alt={trackDetails.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex flex-col min-w-0 flex-1">
                                <span className="text-base sm:text-lg font-medium text-white truncate">
                                    {trackDetails.title}
                                </span>
                                <span className="text-xs sm:text-sm text-gray-300">
                                    {trackDetails.singer}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Next in Queue Section */}
                <div className="w-full max-w-2xl">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 md:mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <path d="M6 9h12M6 15h12" />
                        </svg>
                        Next in Queue
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                        {queueTracks.map((track, idx) => (
                            <div
                                key={track.id}
                                className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-gradient-to-r from-zinc-900/80 to-zinc-800/60 backdrop-blur-sm transition-all duration-200 group hover:translate-x-1 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                <div className="flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white/5 text-xs sm:text-sm font-medium text-gray-300 flex-shrink-0 transition-colors group-hover:bg-white/10">
                                    {idx + 1}
                                </div>

                                <div className="rounded-sm overflow-hidden flex-shrink-0 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/10">
                                    <img
                                        src={track.coverImageUrl || ""}
                                        alt={track.title}
                                        className="w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 rounded-sm object-cover"
                                    />
                                </div>

                                <div className="flex flex-col min-w-0 flex-1">
                                    <span className="text-sm sm:text-base font-medium text-white truncate group-hover:text-purple-300 transition-colors">
                                        {track.title}
                                    </span>
                                    <span className="text-xs sm:text-sm text-gray-400 truncate">
                                        {track.singer}
                                    </span>
                                </div>
                                
                                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ml-1 sm:ml-2">
                                    <Button
                                        variant="ghost" 
                                        size="icon"
                                        className="h-6 w-6 sm:h-8 sm:w-8 rounded-full text-gray-400 hover:text-white hover:bg-white/10"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-4 sm:h-4">
                                            <circle cx="12" cy="12" r="1" />
                                            <circle cx="19" cy="12" r="1" />
                                            <circle cx="5" cy="12" r="1" />
                                        </svg>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowQueueTracks;