import React from 'react'
import { useLikeTrack } from '~/hooks/track'
import { useTrackStore } from '~/store/useTrackStore'



function TrackArtAndInfo({ onShow }: { onShow: () => void }) {
    const { trackDetails, setTrackDetails } = useTrackStore()
    const { mutateAsync: likeTrack, isPending } = useLikeTrack()

    return (
        <div className="px-8 pt-8 -mt-7">

            <div
                className={`aspect-square w-full max-w-sm lg:max-w-[300px] lg:ml-0 mx-auto bg-zinc-800 rounded-lg mb-8 will-change-transform transition-transform duration-500 ease-out transform wave-container ${trackDetails.isPlaying ? 'scale-100 playing' : 'scale-95'}`}
            >
                {/* Left side wave lines */}
                <div className="wave-lines-left">
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                </div>

                {/* Image */}
                <img
                    src={trackDetails.coverImageUrl || ""}
                    alt="Album art"
                    className="w-full h-full object-cover rounded-lg"
                />

                {/* Right side wave lines */}
                <div className="wave-lines-right">
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                    <div className="wave-line"></div>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <div className="space-y-1 text-left flex-1 min-w-0">
                    <div className="relative group">
                        <h2 className="text-2xl md:text-3xl font-semibold transition-all duration-300 truncate overflow-hidden max-w-full">
                            {trackDetails.title}
                        </h2>
                        <span className="absolute left-0 bottom-full mb-1 w-max px-2 py-1 bg-zinc-800 border border-white text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            {trackDetails.title}
                        </span>
                    </div>

                    <div className="relative group">
                        <p className="text-zinc-400 transition-all duration-300 truncate overflow-hidden max-w-full">
                            {trackDetails.artist}
                        </p>
                        <span className="absolute left-0 bottom-full mb-1 w-max px-2 py-1 bg-zinc-800  border border-white text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            {trackDetails.artist}
                        </span>
                    </div>
                </div>


                <div className="flex gap-3 items-center">
                    <div className='relative group'>
                        {
                            trackDetails.id && (
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white rounded-md shadow-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                                    {trackDetails.hasLiked ? "Remove From Your Favourite" : "Add To Your Favourite"}
                                </div>
                            )
                        }
                        <button
                            className={`p-2.5 rounded-full transition-all duration-300 group`}
                            onClick={async () => {
                                await likeTrack(trackDetails.id);
                                setTrackDetails({ hasLiked: !trackDetails.hasLiked });
                            }}
                            disabled={isPending}
                        >
                            {isPending ? (
                                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                trackDetails.hasLiked ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#fa586a" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-check"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-plus"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>
                                )
                            )}
                        </button>
                    </div>

                    <div className='relative group'>

                        {
                            trackDetails.id && (
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white rounded-md shadow-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                                    More
                                </div>
                            )
                        }
                        <button
                            className="p-2.5 rounded-full text-white transition-all duration-300 group
                 hover:text-white"
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


        </div>
    )
}

export default TrackArtAndInfo
