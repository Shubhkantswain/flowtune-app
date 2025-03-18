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
                                    {trackDetails.hasLiked ? "Unlike" : "Like"}
                                </div>
                            )
                        }
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


        </div>
    )
}

export default TrackArtAndInfo
