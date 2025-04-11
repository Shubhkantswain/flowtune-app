import { Track } from 'gql/graphql'
import React from 'react'
import { useTrackStore } from '~/store/useTrackStore'

interface CompactScreenTracksProps {
    tracks: Track[];
    initialized: boolean;
    handlePlayTrack: (track: Track) => void;
}

const CompactScreenTracks: React.FC<CompactScreenTracksProps> = ({
    tracks,
    handlePlayTrack,
    initialized,
}) => {
    const { trackDetails } = useTrackStore()

    return (
        <div className="">
            {tracks.map((track, index) => (
                <div
                    key={track.id}
                    className="group flex items-center justify-between cursor-pointer py-3 px-2 hover:bg-[#161616] transition-colors last:border-0"
                    onClick={() => handlePlayTrack(track)}
                >
                    {/* Left side with album art and title */}
                    <div className="flex items-center gap-3 flex-grow min-w-0">
                        {/* Album art with play button overlay on hover */}
                        <div className="relative h-12 w-12 flex-shrink-0 cursor-pointer">
                            <img
                                src={track.coverImageUrl || ""}
                                alt={track.title}
                                className="h-full w-full object-cover rounded"
                            />
                            {/* Play button overlay */}
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded">
                                {(track?.id === trackDetails.id && trackDetails.isPlaying && initialized) ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <defs>
                                            <path id="ic_playback_pause-a" d="M9,22 L6,22 C5.45,22 5,21.55 5,21 L5,3 C5,2.45 5.45,2 6,2 L9,2 C9.55,2 10,2.45 10,3 L10,21 C10,21.55 9.55,22 9,22 Z M19,21 L19,3 C19,2.45 18.55,2 18,2 L15,2 C14.45,2 14,2.45 14,3 L14,21 C14,21.55 14.45,22 15,22 L18,22 C18.55,22 19,21.55 19,21 Z"></path>
                                        </defs>
                                        <g fillRule="evenodd" fill="transparent">
                                            <rect width="24" height="24"></rect>
                                            <use fillRule="nonzero" href="#ic_playback_pause-a" fill="currentColor"></use>
                                        </g>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="5 3 19 12 5 21 5 3" />
                                    </svg>
                                )}
                            </div>
                        </div>

                        {/* Track info with consistent text size */}
                        <div className="flex flex-col min-w-0 w-full">
                            <span className={`${track?.id === trackDetails.id && trackDetails.isPlaying && initialized ? "text-[#25d1da]" : "text-white"} font-medium text-base truncate w-full`}>
                                {track.title}
                            </span>
                            <span className="text-gray-400 text-sm truncate w-full">
                                {track.singer}
                            </span>
                        </div>
                    </div>

                    {/* Right side actions */}
                    <div className="flex items-center gap-3">
                        {/* Heart button - filled green */}
                        <button className="flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><defs><path id="ic_action_favoriteon-a" d="M16,3 C14.499,3 13.092,3.552 12,4.544 C10.908,3.552 9.501,3 8,3 C4.691,3 2,5.691 2,9 C2,14.535 8.379,18.788 11.445,20.832 C11.613,20.944 11.807,21 12,21 C12.193,21 12.387,20.944 12.555,20.832 C15.62,18.788 22,14.535 22,9 C22,5.691 19.309,3 16,3 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use href="#ic_action_favoriteon-a" fill="#25d1da"></use></g></svg>
                        </button>

                        {/* More options */}
                        <button className="text-gray-400 hover:text-[#ffffff] flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                <defs>
                                    <path id="ic_action_more-a" d="M19,14 C17.895,14 17,13.105 17,12 C17,10.895 17.895,10 19,10 C20.105,10 21,10.895 21,12 C21,13.105 20.105,14 19,14 Z M14,12 C14,10.895 13.105,10 12,10 C10.895,10 10,10.895 10,12 C10,13.105 10.895,14 12,14 C13.105,14 14,13.105 14,12 Z M7,12 C7,10.895 6.105,10 5,10 C3.895,10 3,10.895 3,12 C3,13.105 3.895,14 5,14 C6.105,14 7,13.105 7,12 Z"></path>
                                </defs>
                                <g fillRule="evenodd" fill="transparent">
                                    <rect width="24" height="24"></rect>
                                    <use fillRule="nonzero" href="#ic_action_more-a" fill="currentColor"></use>
                                </g>
                            </svg>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CompactScreenTracks