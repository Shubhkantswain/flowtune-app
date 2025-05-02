import { Track } from 'gql/graphql'
import React, { Dispatch, SetStateAction } from 'react'
import { useLikeTrack } from '~/hooks/track';
import { useLikedTracksStore } from '~/store/useLikedTracksStore';
import usePlaylistStore from '~/store/usePlaylistStore';
import { useTrackStore } from '~/store/useTrackStore'
import { HeartIconFilled, MoreIcon, PauseIcon, PlayIcon } from '~/Svgs';

interface CompactScreenTracksProps {
    likedTracks: Track[];
    setLikedTracks: React.Dispatch<React.SetStateAction<Track[]>>;
    initialized: boolean;
    handlePlayTrack: (track: Track) => void;
}

const CompactScreenTracks: React.FC<CompactScreenTracksProps> = ({
    likedTracks,
    setLikedTracks,
    handlePlayTrack,
    initialized,
}) => {
    const { trackDetails, setTrackDetails } = useTrackStore()
    const { mutateAsync: likeTrack } = useLikeTrack()
    const { unlikeTrack, likedTracks: likedTracksData } = useLikedTracksStore()
    const { initializePlaylist, setCurrentlyPlayingTrack, removeTrackFromPlaylist } = usePlaylistStore()

    return (
        <div className="">
            {likedTracks.map((track, index) => (
                <div
                    key={track.id}
                    className="group flex items-center justify-between py-3 px-2 hover:bg-[#29292A] transition-colors last:border-0"
                    onClick={() => handlePlayTrack(track)}
                >
                    {/* Left side with album art and title */}
                    <div className="flex items-center gap-3 flex-grow min-w-0">
                        {/* Album art with play button overlay on hover */}
                        <div className="relative flex-shrink-0 cursor-pointer">
                            <img
                                src={track.coverImageUrl || ""}
                                alt={track.title}
                                className="w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 rounded-sm object-cover"
                            />

                            {/* Play button overlay */}
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded">
                                {(track?.id === trackDetails.id && trackDetails.isPlaying && initialized) ? (
                                    <PauseIcon width="24" height="24" />

                                ) : (
                                    <PlayIcon width="24" height="24" />

                                )}
                            </div>
                        </div>

                        {/* Track info with consistent text size */}
                        <div className="flex flex-col min-w-0 w-full">
                            <div className={`${track?.id === trackDetails.id && trackDetails.isPlaying && initialized ? "text-[#25d1da]" : "text-white"} font-normal text-base truncate w-full`}>
                                {track.title}
                            </div>
                            <div className="text-gray-400 text-sm truncate w-full">
                                {track.singer}
                            </div>
                        </div>
                    </div>

                    {/* Right side actions */}
                    <div className="flex items-center gap-3">
                        {/* Heart button - filled green */}
                        <button className="flex-shrink-0 hover:text-[#93D0D5] text-[#25d1da]"
                            onClick={async (e) => {
                                e.stopPropagation()
                                await likeTrack(track.id)
                                unlikeTrack(track.id)
                                // setLikedTracks(newTracks)
                                // // initializePlaylist(newTracks)
                                // removeTrackFromPlaylist(track.id)
                                // setCurrentlyPlayingTrack(trackDetails.id);
                               

                            }}
                        >
                            <HeartIconFilled width="20" height="20" />
                        </button>

                        {/* More options */}
                        <button className="text-gray-400 hover:text-[#ffffff] flex-shrink-0"
                        >
                           <MoreIcon width="20" height="20"/>
                        </button>
                    </div>


                </div>
            ))}
        </div>
    )
}

export default CompactScreenTracks