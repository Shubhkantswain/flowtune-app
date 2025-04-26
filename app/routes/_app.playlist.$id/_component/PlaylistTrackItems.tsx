
//hhhhh
import React, { useState, useRef, useEffect } from 'react';
import { GetPlaylistTracksResponse, Track } from 'gql/graphql';
import { useTrackStore } from '~/store/useTrackStore';
import { useRemoveSongFromPlaylist } from '~/hooks/playlist';
import { useLikeTrack } from '~/hooks/track';
import { formatDuration, formatTime } from '~/utils';
import { Link } from '@remix-run/react';
import { useCurrentUser } from '~/hooks/auth';
import AddToPlaylistDialog from '~/components/AddToPlaylistDialog';
import AddToNewPlaylistDialog from '~/components/AddToNewPlaylistDialog';
import { useQueueStore } from '~/store/useQueueStore';
import { toast } from 'sonner';
import usePlaylistStore from '~/store/usePlaylistStore';
import Footer from '~/components/Footer';
import { HeartIcon, HeartIconFilled, MoreIcon, PauseIcon, PlayIcon } from '~/Svgs';
import { useLikedTracksStore } from '~/store/useLikedTracksStore';

interface PlaylistTrackItemsProps {
    res: GetPlaylistTracksResponse;
    handleControll: (track: Track) => void;
    initialized: boolean;
    setInitialized: React.Dispatch<React.SetStateAction<boolean>>;
}

function PlaylistTrackItems({ res, handleControll, initialized, setInitialized }: PlaylistTrackItemsProps) {
    const { trackDetails, setTrackDetails } = useTrackStore();
    const { isTrackInQueue, dequeueTrack, enqueueTrack, getAllTracks, getQueueSize } = useQueueStore()
    const { initializePlaylist, setCurrentlyPlayingTrack, removeTrackFromPlaylist } = usePlaylistStore()

    const [showDropdown, setShowDropdown] = useState<number | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [mount, setMount] = useState(false)
    const [isAddToPlaylistOpen, setAddToPlaylistOpen] = useState(false);
    const [isNewPlaylistDialogOpen, setNewPlaylistDialogOpen] = useState(false);

    const [tracks, setTracks] = useState<Track[]>([])
    const { mutateAsync: removeSongFromPlaylist } = useRemoveSongFromPlaylist()
    const { data } = useCurrentUser()

    const { mutateAsync: likeTrackMutation } = useLikeTrack()

    const { likedTrackMap, setLikedTrackIds, unlikeTrack, likeTrack, isTrackLiked, isTrackUnliked } = useLikedTracksStore()

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
        removeTrackFromPlaylist(trackId)
        setCurrentlyPlayingTrack(trackDetails.id)
        setShowDropdown(null);
    }

    const handleLikeTrack = async (trackId: string) => {
        const like = await likeTrackMutation(trackId)

        if (like) {
            likeTrack(trackId)
            // if (trackId == trackDetails.id) {
            //     setTrackDetails({ hasLiked: true })
            // }
            // const newTracks = tracks.map((track) => {
            //     if (track.id == trackId) {
            //         return {
            //             ...track,
            //             hasLiked: true
            //         }
            //     }

            //     return track
            // })

            // setTracks(newTracks)
        } else {
            unlikeTrack(trackId)
            // if (trackId == trackDetails.id) {
            //     setTrackDetails({ hasLiked: false })
            // }
            // const newTracks = tracks.map((track) => {
            //     if (track.id == trackId) {
            //         return {
            //             ...track,
            //             hasLiked: false
            //         }
            //     }

            //     return track
            // })

            // setTracks(newTracks)

        }

    }

    const handleAddToQueue = (track: Track) => {
        if (queueTracks?.[track.id]) {
            dequeueTrack(trackDetails.id);
            toast.success(`"${trackDetails.title}" removed from queue`);
        } else {
            enqueueTrack(track);
            toast.success(`"${trackDetails.title}" added to queue`);
        }
    }
    // Function to toggle dropdown
    const toggleDropdown = (index: number) => {
        setShowDropdown(showDropdown === index ? null : index);
    };

    const queueTracks = getAllTracks()

    const detectLike = (track: Track) => {
        if(track.hasLiked){
            if(!isTrackUnliked(track.id)){
                return true
            } else{
                return false 
            }
        }

        if(!track.hasLiked){
            if(!isTrackLiked(track.id)){
                return false
            } else{
                return true 
            }
        }

        
    }
    return (
        <>
            <div className="pb-8 mt-3">
                <table className="w-full">
                    <tbody>
                        {((tracks.length > 0 || mount) ? tracks : res.tracks)?.map((track, index) => (
                            <tr
                                key={index}
                                className="hover:bg-[#29292A] group border-b border-[#2a2b2c] mt-4"
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
                                                className="w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 rounded-sm object-cover"
                                            />
                                            {/* Play button overlay */}
                                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded">
                                                <button className='hover:text-[#93D0D5] text-white'>
                                                    {(track?.id === trackDetails.id && trackDetails.isPlaying && initialized) ? (
                                                        <PauseIcon width="24" height="24" />
                                                    ) : (
                                                        <PlayIcon width="24" height="24" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="min-w-0 flex-1 overflow-hidden">
                                            <div className={`font-normal ${track?.id == trackDetails.id && trackDetails.isPlaying && initialized ? "text-[#25d1da]" : ""} truncate overflow-ellipsis`}>
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
                                        className={`cursor-pointer hover:text-[#93D0D5] ${detectLike(track) ? "text-[#25d1da]" : "text-white"} flex-shrink-0 ml-2`}
                                        onClick={async (e) => {
                                            e.stopPropagation();
                                            await handleLikeTrack(track.id)
                                        }}
                                    >
                                        {
                                            detectLike(track) ? (
                                                <HeartIconFilled width="20" height="20" />
                                            ) : (
                                                <HeartIcon width="20" height="20" />
                                            )
                                        }
                                    </button>

                                </td>
                                <td className="text-right px-4 relative">
                                    <button
                                        className="cursor-pointer hover:text-[#93D0D5] flex-shrink-0 ml-2"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleDropdown(index);
                                        }}
                                    >
                                        <MoreIcon width="20" height="20" />
                                    </button>
                                    {showDropdown === index && (
                                        <div
                                            ref={dropdownRef}
                                            className={`absolute right-0 top-0 w-64 z-50 transform transition-all duration-300 ease-in-out ${showDropdown === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                                        >
                                            <div className="bg-gradient-to-b from-neutral-950 to-neutral-900 rounded-md shadow-xl border border-[#2E3030]">
                                                <div className="py-1">
                                                    <button
                                                        className="flex items-center justify-between w-full text-left px-4 py-4 text-sm text-gray-200 hover:bg-[#29292A] hover:text-white"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            setAddToPlaylistOpen(true)
                                                        }}

                                                    >
                                                        Add To Playlist

                                                    </button>

                                                    <div className="border-b border-[#2E3030]"></div>

                                                    <button
                                                        className="flex items-center justify-between w-full text-left px-4 py-4 text-sm text-gray-200 hover:bg-[#29292A] hover:text-white"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            handleAddToQueue(track)
                                                        }}
                                                    >
                                                        {queueTracks?.[track.id] ? "Remove From Queue" : "Add To Queue"}
                                                    </button>

                                                    <div className="border-b border-[#2E3030]"></div>

                                                    <button
                                                        className="flex items-center justify-between w-full text-left px-4 py-4 text-sm text-gray-200 hover:bg-[#29292A] hover:text-white"
                                                        onClick={async (e) => {
                                                            e.preventDefault()
                                                            await handleLikeTrack(track.id)
                                                        }}
                                                    >
                                                        {
                                                            track.hasLiked ? "Unlike This Track" : "Like This Track"
                                                        }

                                                    </button>

                                                    <div className="border-b border-[#2E3030]"></div>

                                                    <button
                                                        className="flex items-center justify-between w-full text-left px-4 py-4 text-sm text-gray-200 hover:bg-[#29292A] hover:text-white"
                                                        onClick={() => handleControll(track)}

                                                    >
                                                        {
                                                            (track?.id === trackDetails.id && trackDetails.isPlaying && initialized) ? "Pause This Track" : "Play This Track"
                                                        }

                                                    </button>

                                                    {
                                                        res.authorId == data?.id && (
                                                            <>
                                                                <div className="border-b border-[#2E3030]"></div>

                                                                <button
                                                                    className="flex items-center justify-between w-full text-left px-4 py-4 text-sm text-gray-200 hover:bg-[#29292A] hover:text-white"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        handleRemoveTrackFromPlaylist(track.id)
                                                                    }}
                                                                >
                                                                    Remove This Track

                                                                </button>
                                                            </>
                                                        )
                                                    }

                                                </div>
                                            </div>

                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {
                    isAddToPlaylistOpen && (
                        <AddToPlaylistDialog isOpen={isAddToPlaylistOpen} setIsOpen={setAddToPlaylistOpen} setNewPlaylistDialogOpen={setNewPlaylistDialogOpen} trackId={trackDetails.id} />
                    )
                }

                {
                    isNewPlaylistDialogOpen && (
                        <AddToNewPlaylistDialog isOpen={isNewPlaylistDialogOpen} setIsOpen={setNewPlaylistDialogOpen} trackId={trackDetails.id} />
                    )
                }



            </div>

        </>
    );
}

export default PlaylistTrackItems;
