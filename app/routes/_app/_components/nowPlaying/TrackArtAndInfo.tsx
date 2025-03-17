import React from 'react'
import { useLikeTrack } from '~/hooks/track'
import { useTrackStore } from '~/store/useTrackStore'

function TrackArtAndInfo({ onShow }: { onShow: () => void }) {
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
                <div className="space-y-1 text-left flex-1 min-w-0 relative group"> {/* Added `relative` and `group` */}
                    <h2 className="text-2xl md:text-3xl font-semibold transition-all duration-300 truncate overflow-hidden max-w-full">
                        {trackDetails.title}
                    </h2>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-0 mb-2 p-2 bg-zinc-800 text-white text-sm rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap">
                        {trackDetails.title}
                    </div>
                    <p className="text-zinc-400 transition-all duration-300">
                        {trackDetails.artist}
                    </p>
                </div>

                <div className="flex gap-3 items-center">
                    <button
                        className={`p-2.5 rounded-full transition-all duration-300 group ${trackDetails.hasLiked
                                ? "bg-pink-500/10 text-pink-500 hover:bg-pink-500/20"
                                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                            }`}
                        onClick={async () => {
                            await likeTrack(trackDetails.id);
                            setTrackDetails({ hasLiked: !trackDetails.hasLiked });
                        }}
                        disabled={isPending}
                    >
                        {isPending ? (
                            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill={trackDetails.hasLiked ? "currentColor" : "none"}
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="transition-transform duration-300 group-hover:scale-110"
                            >
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                            </svg>
                        )}
                    </button>

                    <button
                        className="p-2.5 rounded-full bg-zinc-800 text-zinc-400 transition-all duration-300 group
                hover:bg-zinc-700 hover:text-white"
                        onClick={onShow}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition-transform duration-300 group-hover:scale-110"
                        >
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="5" r="1" />
                            <circle cx="12" cy="19" r="1" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TrackArtAndInfo
