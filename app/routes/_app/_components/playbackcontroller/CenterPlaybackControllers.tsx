import usePlaylistStore from '~/store/usePlaylistStore'
import { useTrackStore } from '~/store/useTrackStore'
import { NextIcon, PauseIcon, PlayIcon, PrevIcon, SkipBackwardIcon, SkipForwardIcon } from '~/Svgs'

const CenterPlaybackControllers = () => {
    const { trackDetails, togglePlay, handleSkip, setTrackDetails } = useTrackStore()
    const { hasNextTrack, hasPreviousTrack, playNextTrack, playPreviousTrack, isPlaylistRepeat, setCurrentlyPlayingTrack, firstNode, lastNode } = usePlaylistStore()

    const isPlaying = trackDetails.isPlaying

    const isDisableForNext = () => {
        if(!trackDetails.id) return true

        if(isPlaylistRepeat || hasNextTrack()){
            return false
        } 

        return true
    }

    
    const isDisableForPrev = () => {
        if(!trackDetails.id) return true

        if(isPlaylistRepeat || hasPreviousTrack()){
            return false
        } 

        return true
    }

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
                    ((isPlaylistRepeat) || (hasPreviousTrack() && trackDetails.id)) && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white">
                            Previous
                        </div>
                    )
                }

                <button
                    className={`p-2 ${((isPlaylistRepeat || hasPreviousTrack()) && (trackDetails.id)) ? "opacity-100" : "opacity-50 cursor-not-allowed"} transition-colors text-white hover:text-white`}
                    onClick={() => {
                        if (!trackDetails.id) return
                        if (hasPreviousTrack()) {
                            const prevTrack = playPreviousTrack()
                            if (prevTrack) {
                                setTrackDetails({
                                    id: prevTrack.id,
                                    title: prevTrack.title,
                                    singer: prevTrack.singer,
                                    starCast: prevTrack.starCast,
                                    duration: prevTrack.duration,
                                    coverImageUrl: prevTrack.coverImageUrl || "",
                                    videoUrl: prevTrack.videoUrl,
                                    audioFileUrl: prevTrack.audioFileUrl,
                                    hasLiked: prevTrack.hasLiked,
                                    authorId: prevTrack.authorId,
                                    isPlaying: true,
                                })
                            }
                        }

                        else {
                            if (lastNode) {
                                setTrackDetails({
                                    id: lastNode.data?.id,
                                    title: lastNode.data?.title,
                                    singer: lastNode.data?.singer,
                                    starCast: lastNode.data?.starCast,
                                    duration: lastNode.data?.duration,
                                    coverImageUrl: lastNode.data?.coverImageUrl || "",
                                    videoUrl: lastNode.data?.videoUrl,
                                    audioFileUrl: lastNode.data?.audioFileUrl,
                                    hasLiked: lastNode.data?.hasLiked,
                                    authorId: lastNode.data?.authorId,
                                    isPlaying: true,
                                })
                                setCurrentlyPlayingTrack(lastNode.data?.id || "")
                            }
                        }
                    }}
                    disabled={isDisableForPrev()}

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
                    ((isPlaylistRepeat) || (hasNextTrack() && trackDetails.id)) && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white">
                            Next
                        </div>
                    )
                }

                <button
                    className={`p-2 ${((isPlaylistRepeat || hasNextTrack()) && (trackDetails.id)) ? "opacity-100" : "opacity-50 cursor-not-allowed"} transition-colors text-white hover:text-white`}
                    onClick={() => {
                        if (!trackDetails.id) return
                        if (hasNextTrack()) {
                            const nextTrack = playNextTrack()
                            if (nextTrack) {
                                setTrackDetails({
                                    id: nextTrack.id,
                                    title: nextTrack.title,
                                    singer: nextTrack.singer,
                                    starCast: nextTrack.starCast,
                                    duration: nextTrack.duration,
                                    coverImageUrl: nextTrack.coverImageUrl || "",
                                    videoUrl: nextTrack.videoUrl,
                                    audioFileUrl: nextTrack.audioFileUrl,
                                    hasLiked: nextTrack.hasLiked,
                                    authorId: nextTrack.authorId,
                                    isPlaying: true,
                                })
                            }
                        }

                        else {
                            if (firstNode) {
                                setTrackDetails({
                                    id: firstNode.data?.id,
                                    title: firstNode.data?.title,
                                    singer: firstNode.data?.singer,
                                    starCast: firstNode.data?.starCast,
                                    duration: firstNode.data?.duration,
                                    coverImageUrl: firstNode.data?.coverImageUrl || "",
                                    videoUrl: firstNode.data?.videoUrl,
                                    audioFileUrl: firstNode.data?.audioFileUrl,
                                    hasLiked: firstNode.data?.hasLiked,
                                    authorId: firstNode.data?.authorId,
                                    isPlaying: true,
                                })
                                setCurrentlyPlayingTrack(firstNode.data?.id || "")
                            }
                        }
                    }}
                    disabled={isDisableForNext()}
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