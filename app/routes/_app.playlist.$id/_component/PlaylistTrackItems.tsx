//hhhhh
import React, { useState, useRef, useEffect } from 'react';
import { GetPlaylistTracksResponse, Track } from 'gql/graphql';
import { useTrackStore } from '~/store/useTrackStore';
import { useRemoveSongFromPlaylist } from '~/hooks/playlist';
import { useLikeTrack } from '~/hooks/track';
import { formatDuration, formatTime } from '~/utils';

interface PlaylistTrackItemsProps {
    res: GetPlaylistTracksResponse;
    handleControll: (track: Track) => void;
    initialized: boolean;
    setInitialized: React.Dispatch<React.SetStateAction<boolean>>;
}

function PlaylistTrackItems({ res, handleControll, initialized, setInitialized }: PlaylistTrackItemsProps) {
    const { trackDetails } = useTrackStore();
    const [showDropdown, setShowDropdown] = useState<number | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [mount, setMount] = useState(false)
    const [tracks, setTracks] = useState<Track[]>([])
    const { mutateAsync: removeSongFromPlaylist } = useRemoveSongFromPlaylist()

    const { mutateAsync: likeTrack } = useLikeTrack()
    useEffect(() => {
        if (res.tracks) {
            setTracks(res.tracks)
            setMount(true)
        }
    }, [])
      
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(null);
            }
        };

        if (showDropdown !== null) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdown]);

    const handleRemoveTrackFromPlaylist = async (trackId: string) => {
        await removeSongFromPlaylist({ trackId, playlistId: res.id })
        const newTracks = tracks.filter((track) => track.id != trackId)
        setTracks(newTracks)
        setShowDropdown(null);
    }

    // Function to toggle dropdown
    const toggleDropdown = (index: number) => {
        setShowDropdown(showDropdown === index ? null : index);
    };

    return (
        <div className="pb-8 mt-3 overflow-x-hidden">
            <table className="w-full">
                <tbody>
                    {((tracks.length > 0 || mount) ? tracks : res.tracks)?.map((track, index) => (
                        <tr
                            key={index}
                            className="hover:bg-[#161616] group rounded-lg border-b border-[#2a2b2c] mt-4"
                            onClick={() => handleControll(track)}
                        >
                            <td className="py-7 pl-4 pr-2"> {/* Added pr-2 for spacing */}
                                <span>{index + 1}</span>
                            </td>
                            <td className="w-full max-w-0">
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 relative cursor-pointer">
                                        <img
                                            src={track?.coverImageUrl || ""}
                                            alt={track?.title}
                                            className="w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 rounded object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded flex items-center justify-center">
                                            <button className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                {(track?.id == trackDetails.id && trackDetails.isPlaying && initialized) ? (
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
                                            </button>
                                        </div>
                                    </div>
                                    <div className="min-w-0 flex-1 overflow-hidden">
                                        <div className={`font-medium ${track?.id == trackDetails.id && trackDetails.isPlaying && initialized ? "text-[#02fad5]" : ""} truncate overflow-ellipsis`}>
                                            {track?.title}
                                        </div>
                                        <div className="text-sm text-gray-400 truncate overflow-ellipsis mt-0.5">
                                            {track?.singer}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            {/* <td className="hidden lg:table-cell text-gray-400 px-16 text-sm">{formatTime(track.createdAt)}</td> */}
                            <td className="hidden lg:table-cell text-gray-400 px-4 text-sm whitespace-nowrap">
                                {formatTime(track.createdAt || "")}
                            </td>

                            <td className="text-right hidden md:table-cell text-gray-400 px-24 text-sm">{formatDuration(track?.duration || "")}</td>
                            <td className="text-right px-4 relative hidden sm:table-cell">
                                <button
                                    className="cursor-pointer text-gray-400 hover:text-white flex-shrink-0 ml-2"
                                    onClick={async (e) => {
                                        e.stopPropagation();
                                        await likeTrack(track.id)
                                        setTracks((prev) => {
                                            return prev.map((item) => {
                                                if (item.id == track.id) {
                                                    return {
                                                        ...item,
                                                        hasLiked: !item.hasLiked
                                                    }
                                                } else {
                                                    return item
                                                }
                                            })

                                        })
                                    }}
                                >
                                    {
                                        track.hasLiked ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><defs><path id="ic_action_favoriteon-a" d="M16,3 C14.499,3 13.092,3.552 12,4.544 C10.908,3.552 9.501,3 8,3 C4.691,3 2,5.691 2,9 C2,14.535 8.379,18.788 11.445,20.832 C11.613,20.944 11.807,21 12,21 C12.193,21 12.387,20.944 12.555,20.832 C15.62,18.788 22,14.535 22,9 C22,5.691 19.309,3 16,3 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use href="#ic_action_favoriteon-a" fill="#02fad5"></use></g></svg>
                                        ) : (

                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><defs><path id="ic_action_favorite-a" d="M16,3 C14.499,3 13.092,3.552 12,4.544 C10.908,3.552 9.501,3 8,3 C4.691,3 2,5.691 2,9 C2,14.535 8.379,18.788 11.445,20.832 C11.613,20.944 11.807,21 12,21 C12.193,21 12.387,20.944 12.555,20.832 C15.62,18.788 22,14.535 22,9 C22,5.691 19.309,3 16,3 Z M12,18.797 C9.077,16.832 4,13.186 4,9 C4,6.794 5.794,5 8,5 C9.263,5 10.429,5.592 11.198,6.625 C11.575,7.131 12.425,7.131 12.802,6.625 C13.571,5.592 14.737,5 16,5 C18.206,5 20,6.794 20,9 C20,13.186 14.923,16.832 12,18.797 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use fill-rule="nonzero" href="#ic_action_favorite-a" fill="currentColor"></use></g></svg>
                                        )
                                    }
                                </button>

                            </td>
                            <td className="text-right px-4 relative">
                                <button
                                    className="cursor-pointer text-gray-400 hover:text-white flex-shrink-0 ml-2"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleDropdown(index);
                                    }}
                                >
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
                                {showDropdown === index && (
                                    <div
                                        ref={dropdownRef}
                                        className="absolute right-0 -mt-10 w-48 bg-gradient-to-b from-neutral-950 to-neutral-900 border border-[#2E3030] transform transition-all duration-300 ease-in-out rounded-lg shadow-lg z-10 animate-fade-in"
                                    >
                                        <div className="py-1">
                                            <button
                                                className="block w-full px-4 py-3 text-sm text-gray-300 hover:bg-[#3a3b3c] text-left"
                                                onClick={async (e) => {
                                                    e.stopPropagation();
                                                    await handleRemoveTrackFromPlaylist(track.id);
                                                }}
                                            >
                                                Remove From Playlist
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PlaylistTrackItems;

// // hey dont change any design i just want to not make the text trucated of the title until we have space or thiis more icion is not close to this pls dont make it scroll make it resposive
// // and dont changfe any design
// import React, { useState, useRef, useEffect } from 'react';
// import { GetPlaylistTracksResponse, Track } from 'gql/graphql';
// import { useTrackStore } from '~/store/useTrackStore';
// import { useRemoveSongFromPlaylist } from '~/hooks/playlist';

// interface PlaylistTrackItemsProps {
//     res: GetPlaylistTracksResponse;
//     handleControll: (track: Track) => void;
//     initialized: boolean;
//     setInitialized: React.Dispatch<React.SetStateAction<boolean>>;
// }

// function PlaylistTrackItems({ res, handleControll, initialized, setInitialized }: PlaylistTrackItemsProps) {
//     const { trackDetails } = useTrackStore();
//     const [showDropdown, setShowDropdown] = useState<number | null>(null);
//     const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown container

//     const [mount, setMount] = useState(false)

//     // Function to toggle dropdown
//     const toggleDropdown = (index: number) => {
//         setShowDropdown(showDropdown === index ? null : index);
//     };

//     const [tracks, setTracks] = useState<Track[]>([])
//     const { mutateAsync: removeSongFromPlaylist } = useRemoveSongFromPlaylist()

//     useEffect(() => {
//         if (res.tracks) {
//             setTracks(res.tracks)
//             setMount(true)
//         }
//     }, [])

//     // Handle clicks outside the dropdown
//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//                 setShowDropdown(null); // Close the dropdown
//             }
//         };

//         // Add event listener when the dropdown is open
//         if (showDropdown !== null) {
//             document.addEventListener('mousedown', handleClickOutside);
//         }

//         // Cleanup the event listener
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [showDropdown]);

//     const handleRemoveTrackFromPlaylist = async (trackId: string) => {
//         await removeSongFromPlaylist({ trackId, playlistId: res.id })
//         const newTracks = tracks.filter((track) => track.id != trackId)
//         console.log("newTracks", newTracks);
//         setTracks(newTracks)
//         setShowDropdown(null); // Close the dropdown
//     }

//     return (
//         <div className="pb-8 mt-3">
//             <table className="w-full">
//                 <tbody>
//                     {((tracks.length > 0 || mount) ? tracks : res.tracks)?.map((track, index) => (
//                         <tr
//                             key={index}
//                             className="hover:bg-[#161616] group rounded-lg border-b border-[#2a2b2c] mt-4"
//                             onClick={() => handleControll(track)}
//                         >
//                             <td className="py-7 pl-4">
//                                 <span>{index + 1}</span>
//                             </td>
//                             <td>
//                                 <div className="flex items-center gap-4">
//                                     <div className="relative">
//                                         <img
//                                             src={track?.coverImageUrl || ""}
//                                             alt={track?.title}
//                                             className="w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 rounded object-cover"
//                                         />
//                                         <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded flex items-center justify-center">
//                                             <button className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                                                 {(track?.id == trackDetails.id && trackDetails.isPlaying && initialized) ? (
//                                                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
//                                                         <defs>
//                                                             <path id="ic_playback_pause-a" d="M9,22 L6,22 C5.45,22 5,21.55 5,21 L5,3 C5,2.45 5.45,2 6,2 L9,2 C9.55,2 10,2.45 10,3 L10,21 C10,21.55 9.55,22 9,22 Z M19,21 L19,3 C19,2.45 18.55,2 18,2 L15,2 C14.45,2 14,2.45 14,3 L14,21 C14,21.55 14.45,22 15,22 L18,22 C18.55,22 19,21.55 19,21 Z"></path>
//                                                         </defs>
//                                                         <g fillRule="evenodd" fill="transparent">
//                                                             <rect width="24" height="24"></rect>
//                                                             <use fillRule="nonzero" href="#ic_playback_pause-a" fill="currentColor"></use>
//                                                         </g>
//                                                     </svg>
//                                                 ) : (
//                                                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                                         <polygon points="5 3 19 12 5 21 5 3" />
//                                                     </svg>
//                                                 )}
//                                             </button>
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div>
//                                             <div className={`font-medium ${track?.id == trackDetails.id && trackDetails.isPlaying && initialized ? "text-[#fa586a]" : ""} truncate max-w-[180px] sm:max-w-[250px] md:max-w-full`}>
//                                                 {track?.title}
//                                             </div>
//                                             <div className="text-sm text-gray-400 truncate max-w-[180px] sm:max-w-[250px] md:max-w-full">
//                                                 {track?.singer}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td className="hidden lg:table-cell text-gray-400">{"track.album"}</td>
//                             <td className="hidden lg:table-cell text-gray-400">{"track.dateAdded"}</td>
//                             <td className="text-right hidden md:table-cell text-gray-400 pr-8">{track?.duration}</td>
//                             <td className="text-right pr-4 relative">
//                                 <button
//                                     className="cursor-pointer text-gray-400 hover:text-white"
//                                     onClick={(e) => {
//                                         e.stopPropagation();
//                                         toggleDropdown(index);
//                                     }}
//                                 >
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
//                                         <defs>
//                                             <path id="ic_action_more-a" d="M19,14 C17.895,14 17,13.105 17,12 C17,10.895 17.895,10 19,10 C20.105,10 21,10.895 21,12 C21,13.105 20.105,14 19,14 Z M14,12 C14,10.895 13.105,10 12,10 C10.895,10 10,10.895 10,12 C10,13.105 10.895,14 12,14 C13.105,14 14,13.105 14,12 Z M7,12 C7,10.895 6.105,10 5,10 C3.895,10 3,10.895 3,12 C3,13.105 3.895,14 5,14 C6.105,14 7,13.105 7,12 Z"></path>
//                                         </defs>
//                                         <g fillRule="evenodd" fill="transparent">
//                                             <rect width="24" height="24"></rect>
//                                             <use fillRule="nonzero" href="#ic_action_more-a" fill="currentColor"></use>
//                                         </g>
//                                     </svg>
//                                 </button>
//                                 {showDropdown === index && (
//                                     <div
//                                         ref={dropdownRef}
//                                         className="absolute right-0 -mt-10 w-48 bg-gradient-to-b from-neutral-950 to-neutral-900 border border-[#2E3030] transform transition-all duration-300 ease-in-out rounded-lg shadow-lg z-10 animate-fade-in"
//                                     >
//                                         <div className="py-1">
//                                             {/* Remove From Playlist Button */}
//                                             <button
//                                                 className="block w-full px-4 py-3 text-sm text-gray-300 hover:bg-[#3a3b3c] text-left"
//                                                 onClick={async (e) => {
//                                                     e.stopPropagation(); // Prevent parent click handler
//                                                     await handleRemoveTrackFromPlaylist(track.id); // Remove track
//                                                 }}
//                                             >
//                                                 Remove From Playlist
//                                             </button>
//                                         </div>
//                                     </div>
//                                 )}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default PlaylistTrackItems;