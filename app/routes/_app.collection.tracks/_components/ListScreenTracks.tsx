import { Track } from 'gql/graphql'
import React from 'react'
import { useTrackStore } from '~/store/useTrackStore'
import { formatDuration } from '~/utils'

interface ListScreenTracksProps {
    tracks: Track[];
    initialized: boolean;
    handlePlayTrack: (track: Track) => void;
}

const ListScreenTracks: React.FC<ListScreenTracksProps> = ({
    tracks,
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tracks.map((track, index) => (
                        <tr
                            key={track.id}
                            className="group hover:bg-[#161616] cursor-pointer"
                            onClick={() => handlePlayTrack(track)}
                        >
                            <td className="px-3 py-4 w-8 text-gray-400">
                                <div className="flex items-center justify-center w-5 h-5">
                                    {/* Show track number when not hovering */}
                                    <span className="group-hover:hidden">{index + 1}</span>
                                    {/* Show play/pause icon when hovering */}
                                    <span className="hidden group-hover:block text-white">
                                        {(track?.id === trackDetails.id && trackDetails.isPlaying && initialized) ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                                <defs>
                                                    <path id="ic_playback_pause-a" d="M9,22 L6,22 C5.45,22 5,21.55 5,21 L5,3 C5,2.45 5.45,2 6,2 L9,2 C9.55,2 10,2.45 10,3 L10,21 C10,21.55 9.55,22 9,22 Z M19,21 L19,3 C19,2.45 18.55,2 18,2 L15,2 C14.45,2 14,2.45 14,3 L14,21 C14,21.55 14.45,22 15,22 L18,22 C18.55,22 19,21.55 19,21 Z"></path>
                                                </defs>
                                                <g fillRule="evenodd" fill="transparent">
                                                    <rect width="24" height="24"></rect>
                                                    <use fillRule="nonzero" href="#ic_playback_pause-a" fill="currentColor"></use>
                                                </g>
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polygon points="5 3 19 12 5 21 5 3" />
                                            </svg>
                                        )}
                                    </span>
                                </div>
                            </td>
                            <td className="px-3 py-4">
                                <span className={`${track?.id === trackDetails.id && trackDetails.isPlaying && initialized ? "text-[#25d1da]" : "text-white"} text-base font-medium`}>
                                    {track.title.split("From")[0].trim()}
                                </span>
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