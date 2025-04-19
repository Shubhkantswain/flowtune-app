import { useLikeTrack } from '~/hooks/track'
import { useTrackStore } from '~/store/useTrackStore'
import LeftSideWaveLines from './LeftSideWaveLines';
import RightSideWaveLines from './RightSideWaveLines';
import { useLikedTrackStore } from '~/store/useLikedTrackStore';
import usePlaylistStore from '~/store/usePlaylistStore';
import { useEffect } from 'react';

interface TrackArtAndInfoProps {
    onShow: () => void;
    videoEnabled: boolean;
}

const TrackArtAndInfo: React.FC<TrackArtAndInfoProps> = ({ onShow, videoEnabled }) => {
    const { mutateAsync: likeTrack, isPending } = useLikeTrack()
    const { trackDetails, setTrackDetails } = useTrackStore()
    const { removeLikedTrack, addLikedTrack, likedTracks, setLikedTracks } = useLikedTrackStore()
    const { initialize, setCurrentTrack } = usePlaylistStore()

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
                            className={`p-2.5 rounded-full transition-all duration-300 group hover:scale-110`}
                            onClick={async () => {
                                await likeTrack(trackDetails.id);

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

                                setTrackDetails({ hasLiked: !trackDetails.hasLiked });
                            }}
                            disabled={isPending}
                        >
                            {isPending ? (
                                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                trackDetails.hasLiked ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><path id="ic_action_favoriteon-a" d="M16,3 C14.499,3 13.092,3.552 12,4.544 C10.908,3.552 9.501,3 8,3 C4.691,3 2,5.691 2,9 C2,14.535 8.379,18.788 11.445,20.832 C11.613,20.944 11.807,21 12,21 C12.193,21 12.387,20.944 12.555,20.832 C15.62,18.788 22,14.535 22,9 C22,5.691 19.309,3 16,3 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use href="#ic_action_favoriteon-a" fill="#25d1da"></use></g></svg>
                                ) : (

                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><path id="ic_action_favorite-a" d="M16,3 C14.499,3 13.092,3.552 12,4.544 C10.908,3.552 9.501,3 8,3 C4.691,3 2,5.691 2,9 C2,14.535 8.379,18.788 11.445,20.832 C11.613,20.944 11.807,21 12,21 C12.193,21 12.387,20.944 12.555,20.832 C15.62,18.788 22,14.535 22,9 C22,5.691 19.309,3 16,3 Z M12,18.797 C9.077,16.832 4,13.186 4,9 C4,6.794 5.794,5 8,5 C9.263,5 10.429,5.592 11.198,6.625 C11.575,7.131 12.425,7.131 12.802,6.625 C13.571,5.592 14.737,5 16,5 C18.206,5 20,6.794 20,9 C20,13.186 14.923,16.832 12,18.797 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use fill-rule="nonzero" href="#ic_action_favorite-a" fill="currentColor"></use></g></svg>
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
                            className="p-2.5 rounded-full text-white transition-all duration-300 group hover:scale-110 rotate-90"
                            onClick={onShow}
                        >
                            {/* // prime music */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><path id="ic_action_more-a" d="M19,14 C17.895,14 17,13.105 17,12 C17,10.895 17.895,10 19,10 C20.105,10 21,10.895 21,12 C21,13.105 20.105,14 19,14 Z M14,12 C14,10.895 13.105,10 12,10 C10.895,10 10,10.895 10,12 C10,13.105 10.895,14 12,14 C13.105,14 14,13.105 14,12 Z M7,12 C7,10.895 6.105,10 5,10 C3.895,10 3,10.895 3,12 C3,13.105 3.895,14 5,14 C6.105,14 7,13.105 7,12 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use fill-rule="nonzero" href="#ic_action_more-a" fill="currentColor"></use></g></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrackArtAndInfo
