import { useLocation } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import { useLikeTrack } from '~/hooks/track'
import { useLikedTrackStore } from '~/store/useLikedTrackStore'
import usePlaylistStore from '~/store/usePlaylistStore'
import { useTrackStore } from '~/store/useTrackStore'
import { useVolumeStore } from '~/store/useVloumeStore'
import { HeartIcon, HeartIconFilled, MuteIcon, PauseIcon, PlayIcon, VolumeIcon } from '~/Svgs'

const RightControllers = () => {
    const { mutateAsync: likeTrack, isPending } = useLikeTrack()
    const { trackDetails, togglePlay, setTrackDetails, handleVolumeChange } = useTrackStore()
    const { mute, setMute } = useVolumeStore()
    const { removeLikedTrack, addLikedTrack, setLikedTracks, likedTracks } = useLikedTrackStore()
    const { initialize, setCurrentTrack } = usePlaylistStore()

    const isPlaying = trackDetails.isPlaying

    // trackDetails: {
    //     id: '',
    //     title: '',
    //     singer: '',
    //     starCast: '',
    //     duration: '',
    //     coverImageUrl: null,
    //     videoUrl: null,
    //     audioFileUrl: '',
    //     hasLiked: false,
    //     authorId: "",
    //     isPlaying: false,
    //     audoRef: null,
    // },

    const location = useLocation()

    const handleLike = async () => {
        await likeTrack(trackDetails.id)
        if (trackDetails.hasLiked) {
            const newTracks = likedTracks.filter((item) => item.id != trackDetails.id)
            setLikedTracks(newTracks)
            if (location.pathname == "/collection/tracks") {
                initialize(newTracks)
                setCurrentTrack(trackDetails.id);
            }
        } else {
            const newTracks = [
                ...likedTracks,
                {
                    id: trackDetails.id,
                    title: trackDetails.title,
                    singer: trackDetails.singer,
                    startCast: trackDetails.starCast,
                    duration: trackDetails.duration,
                    coverImageUrl: trackDetails.coverImageUrl,
                    videoUrl: trackDetails.videoUrl,
                    audioFileUrl: trackDetails.audioFileUrl,
                    hasLiked: true,
                    authorId: trackDetails.authorId,
                    isPlaying: true,
                }
            ]
            setLikedTracks(newTracks)
            if (location.pathname == "/collection/tracks") {
                initialize(newTracks)
                setCurrentTrack(trackDetails.id);
            }
        }
        setTrackDetails({ hasLiked: !trackDetails.hasLiked })
    }

    useEffect(() => {
        let storedVolume = localStorage.getItem('volume');

        if (storedVolume === null) {
            storedVolume = '0.5'; // Default volume if null
        }

        if (Number(storedVolume) > 0) {
            setMute(false);
        } else {
            setMute(true);
        }
    }, []);

    return (
        <div className="flex items-center justify-end flex-1 md:w-1/3 space-x-7">
            {/* Play Button for Small Screens (Visible Only on Small Screens) */}
            <div className="relative group md:hidden">
                {trackDetails.id && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
    opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                        {isPlaying ? "Pause" : "Play"}
                    </div>
                )}

                <button
                    className={`text-white hover:text-[#93D0D5] ${trackDetails.id ? "opacity-100" : "opacity-50 cursor-not-allowed"} rounded-full flex items-center justify-center transition-transform`}
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

            {/* Heart Icon for Small Screens (Visible Only on Small Screens) */}
            <div className="relative group md:hidden">
                {
                    trackDetails.id && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                            {trackDetails.hasLiked ? "Unlike" : "Like"}
                        </div>
                    )
                }

                <button className={`${trackDetails.hasLiked ? "text-[#25d1da]": "text-white hover:text-[#93D0D5]"} ${trackDetails.id ? "opacity-100" : "opacity-50 cursor-not-allowed"} rounded-full flex items-center justify-center transition-transform`}
                    onClick={handleLike}
                    disabled={isPending || !trackDetails.id}
                >
                    {
                        trackDetails.hasLiked ? (
                            <HeartIconFilled width="24" height="24" />

                        ) : (

                            <HeartIcon width="24" height="24" />

                        )
                    }
                </button>
            </div>

            {/* Volume Control (Hidden on Small Screens) */}
            <div className="hidden md:flex items-center justify-end">
                <div className="relative group">
                    {/** Tooltip **/}
                    {
                        trackDetails.id && (
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                                {mute ? "Unmute" : "Mute"}
                            </div>
                        )
                    }

                    <button className={`${trackDetails.id ? "opacity-100" : "opacity-50 cursor-not-allowed"} p-2 hover:text-white transition-colors`} onClick={() => {
                        if (mute) {
                            handleVolumeChange(100)
                            setMute(false)
                        } else {
                            handleVolumeChange(0)
                            setMute(true)
                        }
                    }}
                        disabled={!trackDetails.id}
                    >
                        {
                            mute ? (
                               <MuteIcon width="24" height="24"/>
                            ) : (
                                <VolumeIcon width="24" height="24"/>
                            )
                        }
                    </button>
                </div>
            </div>

        </div>
    )
}

export default RightControllers