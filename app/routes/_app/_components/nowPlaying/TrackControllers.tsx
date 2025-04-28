import { Track } from 'gql/graphql'
import { useEffect, useState } from 'react'
import usePlaylistStore from '~/store/usePlaylistStore'
import { useTrackStore } from '~/store/useTrackStore'
import { useVolumeStore } from '~/store/useVloumeStore'
import { MuteIcon, NextIcon, PauseIcon, PlayIcon, PrevIcon, SkipBackwardIcon, SkipForwardIcon, VolumeIcon } from '~/Svgs'

const TrackControllers = () => {
    const { trackDetails, togglePlay, setTrackDetails, handleVolumeChange, handleSkip } = useTrackStore()
    const { hasNextTrack, hasPreviousTrack, playNextTrack, playPreviousTrack, setCurrentlyPlayingTrack, firstNode, lastNode, isPlaylistRepeat } = usePlaylistStore()
    const { mute, setMute } = useVolumeStore()

    const [volume, setVolume] = useState(0.5);

    const hasTrack = Boolean(trackDetails.id)
    const isPlaying = trackDetails.isPlaying

    const isDisabledForDirection = (direction: 'next' | 'prev') => {
        if (!hasTrack) return true
        if (isPlaylistRepeat) return false
        return direction === 'next' ? !hasNextTrack() : !hasPreviousTrack()
    }

    const updateTrackDetails = (track: Track) => {
        setTrackDetails({
            ...track,
            coverImageUrl: track.coverImageUrl || "",
            isPlaying: true,
        })
    }

    const playTrack = (direction: 'next' | 'prev') => {
        if (!hasTrack) return

        const track = direction === 'next'
            ? (hasNextTrack() ? playNextTrack() : firstNode?.data)
            : (hasPreviousTrack() ? playPreviousTrack() : lastNode?.data)

        if (track) {
            updateTrackDetails(track)
            setCurrentlyPlayingTrack(track.id)
        }
    }

    useEffect(() => {
        let storedVolume = localStorage.getItem('volume');

        if (storedVolume === null) {
            storedVolume = '0.5'; // Default to 0.5 if null
        }

        setVolume(Number(storedVolume));
    }, []);

    useEffect(() => {
        if (mute) {
            setVolume(0)
        }
        let storedVolume = localStorage.getItem('volume');
        if (!mute && Number(storedVolume) == 1) {
            setVolume(1)
        }
    }, [mute])

    return (
        <div className="px-8 py-12 lg:-mt-8">
            {/* Playback Controls */}
            <div className="flex items-center justify-center space-x-3 sm:space-x-4 md:space-x-5 lg:space-x-6 xl:space-x-8 mb-6 sm:mb-8 md:mb-10 lg:mb-12">

                <div className='relative group'>
                    {

                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                            Skip Backward 15s
                        </div>

                    }

                    <button className="p-2 text-white hover:text-[#93D0D5] transition-colors" onClick={() => handleSkip('backward')}>
                        <SkipBackwardIcon width="24" height="24" />
                    </button>
                </div>

                <div className='relative group'>
                    {
                        !isDisabledForDirection("prev") && (
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white">
                                Previous
                            </div>
                        )
                    }

                    <button
                        className={`p-2 ${!isDisabledForDirection('prev') ? "opacity-100" : "opacity-50 cursor-not-allowed"} transition-colors text-white hover:text-[#93D0D5]`}
                        onClick={() => playTrack('prev')}
                        disabled={isDisabledForDirection('prev')}
                    >
                        <PrevIcon width="24" height="24" />
                    </button>
                </div>

                <div className='relative group'>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white">
                        {isPlaying ? "Pause" : "Play"}
                    </div>

                    <button className="w-16 h-16 hover:bg-white/40 bg-white/20 rounded-full flex items-center justify-center hover:scale-105 transition-transform" onClick={() => trackDetails.id && togglePlay()}>
                        {
                            isPlaying ? (
                                <PauseIcon width="30" height="30" />
                            ) : (
                                <PlayIcon width="30" height="30" />
                            )
                        }
                    </button>
                </div>

                <div className='relative group'>
                    {
                        !isDisabledForDirection('next') && (
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white">
                                Next
                            </div>
                        )
                    }
                    <button
                        className={`p-2 ${!isDisabledForDirection('next') ? "opacity-100" : "opacity-50 cursor-not-allowed"} transition-colors text-white hover:text-[#93D0D5]`}
                        onClick={() => playTrack('next')}
                        disabled={isDisabledForDirection('next')}
                    >
                        <NextIcon width="24" height="24" />
                    </button>
                </div>

                <div className='relative group'>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                        Skip Forward 30s
                    </div>
                    <button className="p-2 text-white hover:text-[#93D0D5] transition-colors" onClick={() => handleSkip('forward')}>
                        <SkipForwardIcon width="24" height="24" />
                    </button>
                </div>

            </div>

            {/* Volume Controls */}
            <div className="flex justify-center items-center w-full">
                <div className="flex items-center gap-2 w-full max-w-md">
                    {
                        volume <= 0 ? (
                            <MuteIcon />
                        ) : (
                            <VolumeIcon />
                        )
                    }
                    <div
                        className="flex-1 h-1 bg-zinc-800/50 backdrop-blur-sm rounded-full relative cursor-pointer"
                        onClick={(e) => {
                            const newVolume = handleVolumeChange(e);
                            if (newVolume == 0) {
                                setMute(true)
                                return
                            } else {
                                setMute(false)
                            }
                            setVolume(newVolume);

                        }}
                    >
                        <div
                            className="h-full bg-white rounded-full"
                            style={{ width: `${volume * 100}%` }}
                        />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default TrackControllers