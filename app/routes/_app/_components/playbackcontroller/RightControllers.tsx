import React, { useEffect, useState } from 'react'
import { useLikeTrack } from '~/hooks/track'
import { useTrackStore } from '~/store/useTrackStore'
import { useVolumeStore } from '~/store/useVloumeStore'

function RightControllers() {
    const { trackDetails, togglePlay, setTrackDetails, handleVolumeChange } = useTrackStore()
    const isPlaying = trackDetails.isPlaying
    const { mutateAsync: likeTrack, isPending } = useLikeTrack()

    const { mute, setMute } = useVolumeStore()

    const handleLike = async () => {
        await likeTrack(trackDetails.id)
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
        <div className="flex items-center justify-end flex-1 md:w-1/3 space-x-2">
            {/* Play Button for Small Screens (Visible Only on Small Screens) */}
            <div className="relative group md:hidden">
                {trackDetails.id && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white rounded-md shadow-lg 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                        {isPlaying ? "Pause" : "Play"}
                    </div>
                )}
                <button
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                    onClick={() => trackDetails.id && togglePlay()}
                >
                    {
                        isPlaying ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><defs><path id="ic_playback_pause-a" d="M9,22 L6,22 C5.45,22 5,21.55 5,21 L5,3 C5,2.45 5.45,2 6,2 L9,2 C9.55,2 10,2.45 10,3 L10,21 C10,21.55 9.55,22 9,22 Z M19,21 L19,3 C19,2.45 18.55,2 18,2 L15,2 C14.45,2 14,2.45 14,3 L14,21 C14,21.55 14.45,22 15,22 L18,22 C18.55,22 19,21.55 19,21 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use fill-rule="nonzero" href="#ic_playback_pause-a" fill="currentColor"></use></g></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><defs><path id="ic_playback_play-a" d="M21.54933,11.208 L7.32711083,2.131 C7.05155533,1.955 6.7155554,1.957 6.44177768,2.136 C6.16799996,2.315 6,2.644 6,3 L6,21 C6,21.354 6.16711108,21.683 6.43911102,21.862 C6.57777765,21.954 6.73333318,22 6.8888887,22 C7.038222,22 7.18666641,21.958 7.32177749,21.873 L21.5439967,12.951 C21.8239966,12.775 21.9991077,12.442 22,12.081 C22.0008855,11.72 21.8293299,11.386 21.54933,11.208 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use href="#ic_playback_play-a" fill="currentColor"></use></g></svg>
                        )
                    }
                </button>
            </div>

            {/* Heart Icon for Small Screens (Visible Only on Small Screens) */}
            <div className="relative group md:hidden">
                {
                    trackDetails.id && (<div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white rounded-md shadow-lg 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                        {trackDetails.hasLiked ? "Unlike" : "Like"}
                    </div>)
                }
                <button className={`w-10 h-10 ${trackDetails.hasLiked ? "text-[#c22d32]" : "text-white"} rounded-full flex items-center justify-center hover:scale-105 transition-transform`} onClick={handleLike} disabled={isPending}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={`${trackDetails.hasLiked ? "#c22d32" : "none"}`} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                </button>
            </div>

            {/* Volume Control (Hidden on Small Screens) */}
            <div className="hidden md:flex items-center justify-end">
                <div className="relative group">
                    {/** Tooltip **/}
                    {
                        trackDetails.id && (<div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white rounded-md shadow-lg 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                            {mute ? "Unmute" : "Mute"}
                        </div>)
                    }
                    <button className="p-2 hover:text-white transition-colors" onClick={() => {
                        if (mute) {
                            handleVolumeChange(100)
                            setMute(false)
                        } else {
                            handleVolumeChange(0)
                            setMute(true)
                        }
                    }}>
                        {
                            mute ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <defs>
                                        <path id="ic_playback_volumeon-a" d="M14.447,2.106 C14.306,2.035 14.153,2 14,2 C13.787,2 13.576,2.068 13.4,2.2 L7,7 L3,7 C1.9,7 1,7.9 1,9 L1,15 C1,16.1 1.9,17 3,17 L7,17 L13.4,21.8 C13.576,21.932 13.788,22 14,22 C14.152,22 14.306,21.965 14.447,21.894 C14.786,21.725 15,21.379 15,21 L15,3 C15,2.621 14.786,2.275 14.447,2.106 Z"></path>
                                    </defs>
                                    <g fill-rule="evenodd" fill="transparent">
                                        <use href="#ic_playback_volumeon-a" fill="currentColor"></use>
                                    </g>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <defs>
                                        <path id="ic_playback_volumeon-a" d="M14.447,2.106 C14.306,2.035 14.153,2 14,2 C13.787,2 13.576,2.068 13.4,2.2 L7,7 L3,7 C1.9,7 1,7.9 1,9 L1,15 C1,16.1 1.9,17 3,17 L7,17 L13.4,21.8 C13.576,21.932 13.788,22 14,22 C14.152,22 14.306,21.965 14.447,21.894 C14.786,21.725 15,21.379 15,21 L15,3 C15,2.621 14.786,2.275 14.447,2.106 Z"></path>
                                    </defs>
                                    <g fill-rule="evenodd" fill="transparent">
                                        <rect width="24" height="24"></rect>
                                        <path fill="#FFF" fill-rule="nonzero" d="M18.481,18.999 C18.481,18.775 18.556,18.549 18.711,18.363 C21.762,14.676 21.762,9.323 18.711,5.637 C18.359,5.212 18.419,4.581 18.844,4.229 C19.271,3.877 19.902,3.937 20.253,4.362 C23.915,8.786 23.916,15.211 20.253,19.636 C19.901,20.062 19.27,20.122 18.845,19.77 C18.605,19.573 18.481,19.287 18.481,18.999 Z M16.172,16.82 C16.626,17.135 17.25,17.025 17.567,16.572 C19.478,13.838 19.478,10.163 17.567,7.428 C17.25,6.975 16.626,6.864 16.172,7.18 C15.718,7.497 15.608,8.12 15.924,8.572 C17.357,10.623 17.358,13.377 15.924,15.427 C15.803,15.601 15.744,15.801 15.744,15.998 C15.743,16.314 15.893,16.626 16.172,16.82 Z" opacity=".5"></path>
                                        <use href="#ic_playback_volumeon-a" fill="currentColor"></use>
                                    </g>
                                </svg>
                            )
                        }
                    </button>
                </div>
            </div>

        </div>
    )
}

export default RightControllers