import React from 'react'
import { useLikeTrack } from '~/hooks/track'
import { useTrackStore } from '~/store/useTrackStore'

function TrackArtAndInfo() {
    const { trackDetails, setTrackDetails } = useTrackStore()
    const { mutateAsync: likeTrack, isPending } = useLikeTrack()

    return (
        <div className="px-8 pt-8 -mt-10">
            <div
                className={`aspect-square w-full max-w-sm lg:max-w-[300px] lg:ml-0 mx-auto bg-zinc-800 rounded-lg mb-8 will-change-transform transition-transform duration-500 ease-out transform ${trackDetails.isPlaying ? 'scale-100' : 'scale-95'
                    }`}
            >
                <img
                    src={trackDetails.coverImageUrl || ""}
                    alt="Album art"
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>

            <div className="flex justify-between items-center">
                <div className="space-y-1 text-left">
                    <h2 className="text-2xl md:text-3xl font-semibold transition-all duration-300">
                        {trackDetails.title}
                    </h2>
                    <p className="text-zinc-400 transition-all duration-300">
                        {trackDetails.artist}
                    </p>
                </div>
                {/* <Heart className="w-6 h-6 text-zinc-400 hover:text-white transition-colors" /> */}

                <button
                    className={`hover:text-white transition-colors duration-300 ${trackDetails.hasLiked ? "text-[#fa586a]" : "text-zinc-400"
                        }`}
                    onClick={async () => {
                        await likeTrack(trackDetails.id)
                        setTrackDetails({ hasLiked: !trackDetails.hasLiked })
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill={trackDetails.hasLiked ? "#fa586a" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-heart"
                    >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default TrackArtAndInfo