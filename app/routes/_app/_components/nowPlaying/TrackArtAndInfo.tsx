import { useLikeTrack } from '~/hooks/track'
import { useTrackStore } from '~/store/useTrackStore'
import LeftSideWaveLines from './LeftSideWaveLines';
import RightSideWaveLines from './RightSideWaveLines';
// import { useLikedTrackStore } from '~/store/useLikedTrackStore';
import usePlaylistStore from '~/store/usePlaylistStore';
import { useEffect } from 'react';
import { HeartIcon, HeartIconFilled, MoreIcon } from '~/Svgs';
import { useLikedTracksStore } from '~/store/useLikedTracksStore';

interface TrackArtAndInfoProps {
    onShow: () => void;
    videoEnabled: boolean;
}

const TrackArtAndInfo: React.FC<TrackArtAndInfoProps> = ({ onShow, videoEnabled }) => {
    const { mutateAsync: likeTrackMutation, isPending } = useLikeTrack()
    const { trackDetails, setTrackDetails } = useTrackStore()
    const { initializePlaylist, setCurrentlyPlayingTrack } = usePlaylistStore()
    const { likeTrack, unlikeTrack } = useLikedTracksStore()

    const handleLike = async () => {
        const like = await likeTrackMutation(trackDetails.id)
        if (like) {
            likeTrack(trackDetails.id)
            setTrackDetails({ hasLiked: true })
        } else {
            unlikeTrack(trackDetails.id)
            setTrackDetails({ hasLiked: false })
        }
    }

    return (
        <div className="px-8 pt-8 -mt-7">
            <div
                className={`aspect-square w-full max-w-sm lg:max-w-[300px] lg:ml-0 mx-auto rounded-lg mb-8 will-change-transform transition-transform duration-500 ease-out transform wave-container ${trackDetails.isPlaying
                    ? 'scale-100 playing'
                    : 'scale-75 lg:scale-95'
                    }`}

            >
                <div className="hidden md:block relative w-full h-full">
                    {/* Left side wave lines */}
                    <LeftSideWaveLines />

                    {/* Image */}
                    <img
                        src={trackDetails.coverImageUrl || ""}
                        alt="Album art"
                        className="absolute inset-0 w-full h-full object-cover rounded-sm"
                    />

                    {/* Right side wave lines */}
                    <RightSideWaveLines />
                </div>


                {
                    (!trackDetails.videoUrl || !videoEnabled) && (
                        <div className="block md:hidden aspect-square relative w-full h-full">
                            {/* Left side wave lines */}
                            <LeftSideWaveLines />

                            {/* Image */}
                            <img
                                src={trackDetails.coverImageUrl || ""}
                                alt="Album art"
                                className="absolute inset-0 w-full h-full object-cover rounded-sm"
                            />

                            {/* Right side wave lines */}
                            <RightSideWaveLines />
                        </div>

                    )
                }
            </div>

            <div className="flex justify-between items-center">
                <div className="space-y-1 text-left flex-1 min-w-0">
                    <div className="relative group">
                        <h2 className="text-2xl md:text-3xl font-medium transition-all duration-300 truncate overflow-hidden max-w-full">
                            {trackDetails.title}
                        </h2>
                        <span className="absolute left-0 bottom-full mb-1 w-max px-2 py-1 bg-zinc-800 border border-white text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            {trackDetails.title}
                        </span>
                    </div>

                    <div className="relative group">
                        <p className="text-zinc-400 transition-all duration-300 truncate overflow-hidden max-w-full">
                            {trackDetails.singer}
                        </p>
                        <span className="absolute left-0 bottom-full mb-1 w-max px-2 py-1 bg-zinc-800  border border-white text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            {trackDetails.singer}
                        </span>
                    </div>
                </div>


                <div className="flex gap-3 items-center">
                    <div className='relative group'>
                        {
                            trackDetails.id && (
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                                    {trackDetails.hasLiked ? "Unlike This Track" : "Like This Track"}
                                </div>
                            )
                        }
                        <button
                            className={`p-2.5 rounded-full transition-all duration-300 group ${!trackDetails.hasLiked ? "text-white" : "text-[#25d1da]"} hover:text-[#93D0D5]`}
                            onClick={handleLike}
                            disabled={isPending}
                        >
                            {isPending ? (
                                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                trackDetails.hasLiked ? (
                                    <HeartIconFilled width="24" height="24" />

                                ) : (
                                    <HeartIcon width="24" height="24" />

                                )

                            )}
                        </button>
                    </div>

                    <div className='relative group'>

                        {
                            trackDetails.id && (
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                                    More
                                </div>
                            )
                        }
                        <button
                            className="p-2.5 rounded-full text-white hover:text-[#93D0D5] transition-all duration-300 group rotate-90"
                            onClick={onShow}
                        >
                            <MoreIcon width="24" height="24" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrackArtAndInfo
