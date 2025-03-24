import React, { useEffect, useState } from 'react'
import { useLikeTrack } from '~/hooks/track'
import usePlaylistStore from '~/store/usePlaylistStore'
import { useTrackStore } from '~/store/useTrackStore'
import { useVolumeStore } from '~/store/useVloumeStore'

function TrackControllers() {
    const { trackDetails, togglePlay, setTrackDetails, handleVolumeChange, handleSkip } = useTrackStore()
    const isPlaying = trackDetails.isPlaying
    const [volume, setVolume] = useState(0.5);

    const { hasNext, hasPrev, next, prev } = usePlaylistStore()

    const { mute, setMute } = useVolumeStore()

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

                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white rounded-md shadow-lg 
     opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                            Skip Backward 15s
                        </div>

                    }

                    <button className="p-2 text-white hover:text-white transition-colors" onClick={() => handleSkip('backward')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <defs>
                                <path id="ic_playback_jumpback15-a" d="M12,1 C9.447,1 7.051,1.865 5.124,3.417 L3.854,2.146 C3.724,2.016 3.534,1.967 3.355,2.021 C3.179,2.074 3.046,2.221 3.01,2.401 L2.01,7.401 C1.977,7.566 2.028,7.735 2.146,7.854 C2.241,7.948 2.369,8 2.5,8 C2.533,8 2.565,7.997 2.598,7.99 L7.598,6.99 C7.779,6.954 7.925,6.821 7.978,6.645 C8.031,6.468 7.983,6.277 7.853,6.146 L6.553,4.846 C8.099,3.662 9.988,3 12,3 C16.963,3 21,7.038 21,12 C21,16.963 16.963,21 12,21 C9.143,21 6.518,19.688 4.799,17.399 C4.467,16.958 3.841,16.869 3.399,17.2 C2.958,17.532 2.868,18.159 3.2,18.6 C5.3,21.396 8.507,23 12,23 C18.065,23 23,18.065 23,12 C23,5.935 18.065,1 12,1 Z M10.349,15 C10.4283333,15 10.4835833,14.983 10.51475,14.949 C10.5459167,14.915 10.5615,14.8611667 10.5615,14.7875 L10.5615,14.7875 L10.5615,9.322 C10.5615,9.24266667 10.5459167,9.18741667 10.51475,9.15625 C10.4835833,9.12508333 10.4283333,9.1095 10.349,9.1095 L10.349,9.1095 L9.6435,9.1095 C9.5075,9.1095 9.38,9.13783333 9.261,9.1945 L9.261,9.1945 L7.9775,9.781 C7.90383333,9.815 7.85425,9.85183333 7.82875,9.8915 C7.80325,9.93116667 7.7905,9.99066667 7.7905,10.07 L7.7905,10.07 L7.7905,10.631 C7.7905,10.7386667 7.83016667,10.7925 7.9095,10.7925 C7.94916667,10.7925 8.02566667,10.7726667 8.139,10.733 L8.139,10.733 L9.3035,10.3505 L9.3035,14.7875 C9.3035,14.8611667 9.3205,14.915 9.3545,14.949 C9.3885,14.983 9.44233333,15 9.516,15 L9.516,15 L10.349,15 Z M14.208,15.1275 C14.6443333,15.1275 15.0339167,15.0495833 15.37675,14.89375 C15.7195833,14.7379167 15.98875,14.5126667 16.18425,14.218 C16.37975,13.9233333 16.4775,13.5776667 16.4775,13.181 C16.4775,12.637 16.3018333,12.2020833 15.9505,11.87625 C15.5991667,11.5504167 15.1316667,11.3875 14.548,11.3875 C14.293,11.3875 14.0493333,11.4158333 13.817,11.4725 L13.817,11.4725 L13.9105,10.0785 L15.993,10.0785 C16.0723333,10.0785 16.1275833,10.0615 16.15875,10.0275 C16.1899167,9.9935 16.2055,9.93966667 16.2055,9.866 L16.2055,9.866 L16.2055,9.322 C16.2055,9.24266667 16.1899167,9.18741667 16.15875,9.15625 C16.1275833,9.12508333 16.0723333,9.1095 15.993,9.1095 L15.993,9.1095 L13.0775,9.1095 C13.0038333,9.1095 12.9485833,9.12791667 12.91175,9.16475 C12.8749167,9.20158333 12.8536667,9.25966667 12.848,9.339 L12.848,9.339 L12.712,11.634 L12.712,12.1695 C12.712,12.2431667 12.729,12.297 12.763,12.331 C12.797,12.365 12.8508333,12.382 12.9245,12.382 C12.9585,12.382 13.0024167,12.3791667 13.05625,12.3735 C13.1100833,12.3678333 13.188,12.3593333 13.29,12.348 C13.5733333,12.3253333 13.8453333,12.314 14.106,12.314 C14.4856667,12.314 14.7661667,12.38625 14.9475,12.53075 C15.1288333,12.67525 15.2195,12.9005 15.2195,13.2065 C15.2195,13.5125 15.1288333,13.7448333 14.9475,13.9035 C14.7661667,14.0621667 14.4998333,14.1415 14.1485,14.1415 C13.9501667,14.1415 13.7475833,14.1245 13.54075,14.0905 C13.3339167,14.0565 13.0746667,13.9941667 12.763,13.9035 C12.7176667,13.8921667 12.6850833,13.8836667 12.66525,13.878 C12.6454167,13.8723333 12.627,13.8695 12.61,13.8695 C12.5136667,13.8695 12.4655,13.9346667 12.4655,14.065 L12.4655,14.065 L12.4655,14.592 C12.4655,14.6656667 12.47825,14.7195 12.50375,14.7535 C12.52925,14.7875 12.5788333,14.8186667 12.6525,14.847 C13.1398333,15.034 13.6583333,15.1275 14.208,15.1275 Z"></path>
                            </defs>
                            <g fill-rule="evenodd" fill="transparent">
                                <rect width="24" height="24"></rect>
                                <use fill-rule="nonzero" href="#ic_playback_jumpback15-a" fill="currentColor"></use>
                            </g>
                        </svg>
                    </button>
                </div>

                <div className='relative group'>
                    {
                        (hasPrev() && trackDetails.id) && (
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white rounded-md shadow-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white">
                                Previous
                            </div>
                        )
                    }

                    <button className={`p-2 ${hasPrev() && trackDetails.id ? "text-white hover:text-white" : "text-[#353535]"} transition-colors`} onClick={() => {
                        if (hasPrev() && trackDetails.id) {
                            const prevTrack = prev()
                            if (prevTrack) {
                                setTrackDetails(prevTrack)
                            }
                        }
                    }}>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-skip-back"><polygon points="19 20 9 12 19 4 19 20" /><line x1="5" x2="5" y1="19" y2="5" /></svg> */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><path id="ic_playback_previous-a" d="M18.462,4.113 C18.131,3.943 17.733,3.967 17.427,4.181 L9,10.079 L9,4 C9,3.45 8.55,3 8,3 L6,3 C5.45,3 5,3.45 5,4 L5,20 C5,20.55 5.45,21 6,21 L8,21 C8.55,21 9,20.55 9,20 L9,13.921 L17.427,19.82 C17.598,19.939 17.799,20 18,20 C18.158,20 18.316,19.963 18.462,19.887 C18.793,19.715 19,19.373 19,19 L19,5 C19,4.627 18.793,4.285 18.462,4.113 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use href="#ic_playback_previous-a" fill="currentColor"></use></g></svg>
                    </button>
                </div>

                <div className='relative group'>
                    {
                        trackDetails.id && (
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white rounded-md shadow-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white">
                                {isPlaying ? "Pause" : "Play"}
                            </div>
                        )
                    }

                    <button className="w-16 h-16 hover:bg-white/40 bg-white/20 rounded-full flex items-center justify-center hover:scale-105 transition-transform" onClick={() => trackDetails.id && togglePlay()}>
                        {
                            isPlaying ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><defs><path id="ic_playback_pause-a" d="M9,22 L6,22 C5.45,22 5,21.55 5,21 L5,3 C5,2.45 5.45,2 6,2 L9,2 C9.55,2 10,2.45 10,3 L10,21 C10,21.55 9.55,22 9,22 Z M19,21 L19,3 C19,2.45 18.55,2 18,2 L15,2 C14.45,2 14,2.45 14,3 L14,21 C14,21.55 14.45,22 15,22 L18,22 C18.55,22 19,21.55 19,21 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use fill-rule="nonzero" href="#ic_playback_pause-a" fill="currentColor"></use></g></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><defs><path id="ic_playback_play-a" d="M21.54933,11.208 L7.32711083,2.131 C7.05155533,1.955 6.7155554,1.957 6.44177768,2.136 C6.16799996,2.315 6,2.644 6,3 L6,21 C6,21.354 6.16711108,21.683 6.43911102,21.862 C6.57777765,21.954 6.73333318,22 6.8888887,22 C7.038222,22 7.18666641,21.958 7.32177749,21.873 L21.5439967,12.951 C21.8239966,12.775 21.9991077,12.442 22,12.081 C22.0008855,11.72 21.8293299,11.386 21.54933,11.208 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use href="#ic_playback_play-a" fill="currentColor"></use></g></svg>
                            )
                        }
                    </button>
                </div>

                <div className='relative group'>
                    {
                        (hasNext() && trackDetails.id) && (
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white rounded-md shadow-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white">
                                Next
                            </div>
                        )
                    }
                    <button className={`p-2 ${hasNext() && trackDetails.id ? "text-white hover:text-white" : "text-[#353535]"} transition-colors`} onClick={() => {
                        if (hasNext() && trackDetails.id) {
                            const nextTrack = next()
                            if (nextTrack) {
                                setTrackDetails(nextTrack)
                            }
                        }
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><path id="ic_playback_next-a" d="M18,3 L16,3 C15.45,3 15,3.45 15,4 L15,10.067 L6.57,4.182 C6.26,3.97 5.87,3.939 5.54,4.111 C5.21,4.293 5,4.636 5,5.009 L5,18.99 C5,19.363 5.21,19.707 5.54,19.878 C5.68,19.96 5.84,20 6,20 C6.2,20 6.4,19.939 6.57,19.818 L15,13.923 L15,20 C15,20.55 15.45,21 16,21 L18,21 C18.55,21 19,20.55 19,20 L19,4 C19,3.45 18.55,3 18,3 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use href="#ic_playback_next-a" fill="currentColor"></use></g></svg>
                    </button>
                </div>

                <div className='relative group'>

                    {
                        trackDetails.id && (
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white rounded-md shadow-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                                Skip Forward 30s
                            </div>
                        )
                    }
                    <button className="p-2 text-white hover:text-white transition-colors" onClick={() => handleSkip('forward')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <defs>
                                <path id="ic_playback_jumpforward30-a" d="M9.089,15.13 C8.858,15.13 8.614,15.105 8.357,15.056 C8.1,15.007 7.862,14.939 7.642,14.852 C7.567,14.823 7.517,14.79 7.49,14.752 C7.464,14.715 7.451,14.65 7.451,14.557 L7.451,14.045 C7.451,13.912 7.5,13.846 7.598,13.846 C7.615,13.846 7.634,13.849 7.655,13.855 C7.674,13.861 7.708,13.869 7.754,13.881 C8.326,14.043 8.757,14.124 9.046,14.124 C9.416,14.124 9.698,14.044 9.891,13.885 C10.085,13.726 10.181,13.494 10.181,13.187 C10.181,12.915 10.092,12.715 9.913,12.584 C9.734,12.454 9.457,12.389 9.081,12.389 C8.93,12.389 8.805,12.395 8.704,12.406 C8.602,12.418 8.517,12.423 8.447,12.423 C8.332,12.423 8.274,12.354 8.274,12.215 L8.274,11.903 C8.274,11.799 8.284,11.721 8.304,11.669 C8.323,11.617 8.366,11.556 8.429,11.487 L9.827,9.98 L7.746,9.98 C7.671,9.98 7.616,9.963 7.581,9.928 C7.547,9.893 7.529,9.839 7.529,9.763 L7.529,9.209 C7.529,9.128 7.547,9.072 7.581,9.04 C7.616,9.008 7.671,8.992 7.746,8.992 L10.971,8.992 C11.052,8.992 11.108,9.008 11.14,9.04 C11.171,9.072 11.187,9.128 11.187,9.209 L11.187,9.686 C11.187,9.79 11.177,9.868 11.157,9.92 C11.137,9.972 11.095,10.033 11.032,10.102 L9.662,11.498 C10.217,11.527 10.653,11.692 10.971,11.992 C11.289,12.293 11.448,12.689 11.448,13.18 C11.448,13.579 11.348,13.925 11.148,14.22 C10.949,14.515 10.671,14.74 10.316,14.896 C9.96,15.052 9.552,15.13 9.089,15.13 Z M14.542,15.13 C13.808,15.13 13.244,14.859 12.851,14.315 C12.458,13.772 12.262,12.994 12.262,11.983 C12.262,10.977 12.46,10.203 12.855,9.66 C13.251,9.117 13.813,8.845 14.541,8.845 C15.269,8.845 15.831,9.117 16.227,9.66 C16.622,10.204 16.82,10.978 16.82,11.983 C16.82,12.994 16.624,13.772 16.231,14.315 C15.84,14.858 15.276,15.13 14.542,15.13 Z M14.542,14.09 C14.894,14.09 15.146,13.928 15.296,13.604 C15.446,13.28 15.521,12.74 15.521,11.983 C15.521,11.232 15.446,10.694 15.296,10.371 C15.145,10.047 14.894,9.885 14.542,9.885 C14.19,9.885 13.938,10.047 13.788,10.371 C13.638,10.694 13.563,11.232 13.563,11.983 C13.563,12.74 13.638,13.28 13.788,13.604 C13.939,13.928 14.19,14.09 14.542,14.09 Z M20.99,2.402 C20.954,2.221 20.821,2.075 20.644,2.022 C20.471,1.968 20.276,2.016 20.146,2.147 L18.875,3.418 C16.948,1.865 14.553,1 12,1 C5.935,1 1,5.935 1,12 C1,18.065 5.935,23 12,23 C15.492,23 18.699,21.396 20.801,18.601 C21.132,18.16 21.043,17.533 20.602,17.201 C20.162,16.87 19.535,16.958 19.202,17.4 C17.481,19.688 14.857,21 12,21 C7.038,21 3,16.963 3,12 C3,7.038 7.038,3 12,3 C14.012,3 15.901,3.662 17.447,4.846 L16.147,6.146 C16.016,6.276 15.968,6.468 16.022,6.645 C16.076,6.821 16.221,6.954 16.403,6.99 L21.403,7.99 C21.435,7.997 21.468,8 21.5,8 C21.631,8 21.759,7.948 21.854,7.854 C21.972,7.736 22.024,7.566 21.991,7.402 L20.99,2.402 Z"></path>
                            </defs>
                            <g fill-rule="evenodd" fill="transparent">
                                <rect width="24" height="24"></rect>
                                <use fill-rule="nonzero" href="#ic_playback_jumpforward30-a" fill="currentColor"></use>
                            </g>
                        </svg>
                    </button>
                </div>

            </div>

            {/* Volume Controls */}
            <div className="flex justify-center items-center w-full">
                <div className="flex items-center gap-2 w-full max-w-md">
                    {
                        volume > 0.5 ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-volume-2"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" /><path d="M16 9a5 5 0 0 1 0 6" /><path d="M19.364 18.364a9 9 0 0 0 0-12.728" /></svg>
                        ) : (
                            volume <= 0.5 && volume > 0 ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-volume-1"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" /><path d="M16 9a5 5 0 0 1 0 6" /></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-volume-x"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" /><line x1="22" x2="16" y1="9" y2="15" /><line x1="16" x2="22" y1="9" y2="15" /></svg>
                            )
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