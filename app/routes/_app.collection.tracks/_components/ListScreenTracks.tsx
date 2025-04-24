import { Track } from 'gql/graphql'
import React from 'react'
import { useTrackStore } from '~/store/useTrackStore'
import { ClockIcon, PauseIcon, PlayIcon } from '~/Svgs';
import { formatDuration } from '~/utils'

interface ListScreenTracksProps {
    likedTracks: Track[];
    initialized: boolean;
    handlePlayTrack: (track: Track) => void;
}

const ListScreenTracks: React.FC<ListScreenTracksProps> = ({
    likedTracks,
    handlePlayTrack,
    initialized,
}) => {

    const { trackDetails } = useTrackStore()

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="text-gray-400 border-b border-[#2E3030]">
                    <tr>
                        <th className="px-3 py-3 w-8 text-sm">#</th>
                        <th className="px-3 py-3 text-sm">Title</th>
                        <th className="px-3 py-3 text-sm hidden sm:table-cell">Artist</th>
                        <th className="px-3 py-3 text-sm hidden lg:table-cell">Album</th>
                        <th className="px-3 py-3 text-right text-sm">
                            <div className="flex justify-end items-center">
                                <ClockIcon width="16" height="16" />
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {likedTracks.map((track, index) => (
                        <tr
                            key={track.id}
                            className="group hover:bg-[#29292A] cursor-pointer"
                            onClick={() => handlePlayTrack(track)}
                        >
                            <td className="px-3 py-4 w-8 text-gray-400">
                                <div className="flex items-center justify-center w-5 h-5">
                                    {/* Show track number when not hovering */}
                                    <span className="group-hover:hidden">{index + 1}</span>
                                    {/* Show play/pause icon when hovering */}
                                    <span className="hidden group-hover:block text-white">
                                        {(track?.id === trackDetails.id && trackDetails.isPlaying && initialized) ? (
                                            <PauseIcon width="20" height="20" />
                                        ) : (
                                            <PlayIcon width="20" height="20" />
                                        )}
                                    </span>
                                </div>
                            </td>
                            <td className="px-3 py-4">
                                <div className={`${track?.id === trackDetails.id && trackDetails.isPlaying && initialized ? "text-[#25d1da]" : "text-white"} font-normal`}>
                                    {track.title.split("From")[0].trim()}
                                </div>
                            </td>
                            <td className="px-3 py-4 text-gray-400 text-sm hidden sm:table-cell">
                                {track.singer}
                            </td>
                            <td className="px-3 py-4 text-gray-400 text-sm hidden lg:table-cell">
                                {track?.title?.split("From")[1]?.trim().replace(`("`, "").replace(`")`, "") || "Unknown Album"}
                            </td>
                            <td className="px-3 py-4 text-gray-400 text-sm text-right">
                                {formatDuration(track.duration || "")}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListScreenTracks