import usePlaylistStore from '~/store/usePlaylistStore'
import { useTrackStore } from '~/store/useTrackStore'
import { NextIcon, PauseIcon, PlayIcon, PrevIcon, SkipBackwardIcon, SkipForwardIcon } from '~/Svgs'

const CenterPlaybackControllers = () => {
    const { trackDetails, togglePlay, handleSkip, setTrackDetails } = useTrackStore()
    const { hasNextTrack, hasPreviousTrack, playNextTrack, playPreviousTrack } = usePlaylistStore()

    const isPlaying = trackDetails.isPlaying

    return (
        <div className="hidden md:flex items-center justify-center flex-1 md:w-1/3 space-x-2 md:space-x-4">
            {/* Skip Backward 10s Button (Visible on Larger Screens, Hidden on Medium Screens) */}
            <div className="relative group hidden lg:block md:hidden">
                {
                    trackDetails.id && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                            Skip Backward 15s
                        </div>
                    )
                }

                <button
                    className={`p-2 ${trackDetails.id ? "opacity-100" : "opacity-50 cursor-not-allowed"}  transition-colors text-white hover:text-white`}
                    onClick={() => handleSkip('backward')}
                    disabled={!trackDetails.id}
                >
                    <SkipBackwardIcon width="24" height="24" />
                </button>
            </div>

            <div className="relative group">
                {
                    (hasPreviousTrack() && trackDetails.id) && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white">
                            Previous
                        </div>
                    )
                }

                <button
                    className={`p-2 ${hasPreviousTrack() && trackDetails.id ? "opacity-100" : "opacity-50 cursor-not-allowed"} transition-colors text-white hover:text-white`}
                    onClick={() => {
                        if (hasPreviousTrack() && trackDetails.id) {
                            const prevTrack = playPreviousTrack()
                            if (prevTrack) {
                                setTrackDetails(prevTrack)
                            }
                        }
                    }}
                    disabled={!hasPreviousTrack() || !trackDetails.id}
                >
                    <PrevIcon width="24" height="24" />

                </button>
            </div>

            <div className="relative group">
                {
                    trackDetails.id && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white">
                            {isPlaying ? "Pause" : "Play"}
                        </div>
                    )
                }

                <button
                    className={`${trackDetails.id ? "opacity-100 hover:bg-white/40 hover:scale-105" : "opacity-50 cursor-not-allowed"} w-12 h-12 bg-white/20 rounded-full flex items-center justify-center transition-transform`}
                    onClick={() => togglePlay()}
                    disabled={!trackDetails.id}
                >
                    {
                        isPlaying ? (
                            <PauseIcon width="24" height="24" />
                        ) : (
                            <PlayIcon width="24" height="24" />
                        )
                    }
                </button>
            </div>

            <div className="relative group">
                {
                    (hasNextTrack() && trackDetails.id) && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white">
                            Next
                        </div>
                    )
                }

                <button
                    className={`p-2 ${hasNextTrack() && trackDetails.id ? "opacity-100" : "opacity-50 cursor-not-allowed"} transition-colors text-white hover:text-white`}
                    onClick={() => {
                        if (hasNextTrack() && trackDetails.id) {
                            const nextTrack = playNextTrack()
                            if (nextTrack) {
                                setTrackDetails(nextTrack)
                            }
                        }
                    }}
                    disabled={!hasNextTrack() || !trackDetails.id}
                >
                    <NextIcon width="24" height="24" />

                </button>
            </div>

            {/* Skip Forward 10s Button (Visible on Larger Screens, Hidden on Medium Screens) */}
            <div className="relative group hidden lg:block md:hidden">
                {
                    trackDetails.id && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                            Skip Forward 30s
                        </div>
                    )
                }

                <button
                    className={`p-2 ${trackDetails.id ? "opacity-100" : "opacity-50 cursor-not-allowed"} text-white hover:text-white transition-colors`}
                    onClick={() => handleSkip('forward')}
                    disabled={!trackDetails.id}
                >
                    <SkipForwardIcon width="24" height="24" />

                </button>
            </div>
        </div>
    )
}

export default CenterPlaybackControllers