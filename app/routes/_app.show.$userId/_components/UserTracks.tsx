import { useNavigate, useParams } from '@remix-run/react';
import { Track } from 'gql/graphql';
import React, { useEffect, useState } from 'react'
import AddToNewPlaylistDialog from '~/components/AddToNewPlaylistDialog';
import AddToPlaylistDialog from '~/components/AddToPlaylistDialog';
import { useCurrentUser } from '~/hooks/auth';
import { useGetUserTracks } from '~/hooks/user';
import usePlaylistStore from '~/store/usePlaylistStore';
import { useTrackStore } from '~/store/useTrackStore';
import { PauseIcon, PlayIcon, PlusIcon } from '~/Svgs';
import { formatDuration, formatTime } from '~/utils';

interface UserProfileInfo {
    tracks: Track[]
    allTracks: Track[]
    page: number
}

function UserTracks({ tracks, allTracks, page }: UserProfileInfo) {
    const { trackDetails, setTrackDetails } = useTrackStore()
    const { initializePlaylist, setCurrentlyPlayingTrack } = usePlaylistStore()

    const [initialized, setInitialized] = useState(false)
    const [trackId, setTrackId] = useState("")
    const [isAddToPlaylistOpen, setAddToPlaylistOpen] = useState(false);
    const [isNewPlaylistDialogOpen, setNewPlaylistDialogOpen] = useState(false);
    const { data: user, isLoading: isFetchingUser } = useCurrentUser()

    const navigate = useNavigate()

    const handleAddToPlaylist = (trackId: string) => {
        if (isFetchingUser) return
        if (!user?.isPro) {
            return navigate("/pro-plan")
        }
        setTrackId(trackId)
        setAddToPlaylistOpen(true)
    }

    return (
        <div className="mt-6 md:mt-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Tracks</h2>
            <div className="">
                {(allTracks.length > 0 ? allTracks : tracks)?.map((track, index) => (
                    <div
                        key={index}
                        className=" hover:bg-[#29292A] transition-colors px-4 py-5 md:py-8 border-b border-white/10"
                    >

                        <div className="flex gap-3 md:gap-4">
                            <div className="min-w-[50px] md:min-w-[60px]">
                                <img
                                    src={track.coverImageUrl || ""}
                                    alt={track.title}
                                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 rounded-md"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center">
                                    <div className="space-y-1 flex-1">
                                        <div className="text-[#25d1da] text-xs md:text-sm">{formatTime(track.createdAt || "")}</div>
                                        <div className="font-normal sm:truncate">{track.title}</div>
                                        <p className="text-gray-400 text-xs md:text-sm line-clamp-2 max-w-2xl">{`In today’s Track on ${formatTime(track.createdAt || "")}, we tell you why Devyani International, the largest franchisee of KFC and Pizza Hut in India, wants to scoop up Sky Gate Hospitality, the company that runs Biryani By Kilo. Speak to Ditto’s advisors now, by clicking the link here – https://ditto.sh/9zoz41`}</p>
                                    </div>
                                    <div className="hidden md:flex items-center gap-4 ml-4">
                                        <div className='group relative'>

                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
                                                opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                                                {trackDetails.isPlaying ? "Pause This Track" : "Play This Track"}
                                            </div>

                                            <button className="hover:bg-white/20 backdrop-blur-sm hover:scale-105 bg-white/10 rounded-full p-1.5 md:p-2 transition-all"
                                                onClick={() => {
                                                    const isPlayingCurrentSong = track?.id == trackDetails.id && trackDetails.isPlaying;

                                                    if (isPlayingCurrentSong && initialized) {
                                                        setTrackDetails({ isPlaying: false });
                                                        return;
                                                    } else if (track?.id == trackDetails.id && !trackDetails.isPlaying && initialized) {
                                                        setTrackDetails({ isPlaying: true });
                                                        return;
                                                    }
                                                    else {
                                                        if (!initialized) {
                                                            initializePlaylist(tracks)
                                                        }

                                                        setTrackDetails({
                                                            id: track.id,
                                                            title: track.title,
                                                            singer: track.singer,
                                                            starCast: track.starCast,
                                                            duration: track.duration,
                                                            coverImageUrl: track.coverImageUrl || "",
                                                            videoUrl: track.videoUrl,
                                                            audioFileUrl: track.audioFileUrl,
                                                            hasLiked: track.hasLiked,
                                                            authorId: track.authorId,
                                                            isPlaying: true,
                                                        });

                                                        setCurrentlyPlayingTrack(track.id)
                                                        setInitialized(true)
                                                    }
                                                }}>

                                                {track?.id == trackDetails.id && trackDetails.isPlaying && initialized ? (
                                                    <PauseIcon width="15" height="15" />
                                                ) : (
                                                    <PlayIcon width="15" height="15" />
                                                )}
                                            </button>

                                        </div>

                                        <div className="text-gray-400  text-xs md:text-sm w-12 text-center">{formatDuration(track.duration)}</div>

                                        <div className='group relative'>
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
                                                opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                                                Add To Playlist
                                            </div>
                                            <button className="hover:bg-white/20 backdrop-blur-sm bg-white/10 rounded-full p-1 md:p-1.5 transition-all"
                                                onClick={() => handleAddToPlaylist(track.id)}
                                            >
                                                <PlusIcon width="15" height="15" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="md:hidden flex items-center justify-between mt-3 md:mt-4">
                                    <div className="flex items-center gap-2">
                                        <div className='group relative'>
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
                                                opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                                                {trackDetails.isPlaying ? "Pause This Track" : "Play This Track"}
                                            </div>
                                            <button className="bg-white/10 hover:scale-105 backdrop-blur-sm hover:bg-white/20 rounded-full p-1.5 transition-all" onClick={() => {
                                                const isPlayingCurrentSong = track?.id == trackDetails.id && trackDetails.isPlaying;

                                                if (isPlayingCurrentSong && initialized) {
                                                    setTrackDetails({ isPlaying: false });
                                                    return;
                                                } else if (track?.id == trackDetails.id && !trackDetails.isPlaying && initialized) {
                                                    setTrackDetails({ isPlaying: true });
                                                    return;
                                                }
                                                else {
                                                    if (!initialized) {
                                                        initializePlaylist(tracks)
                                                    }

                                                    setTrackDetails({
                                                        id: track.id,
                                                        title: track.title,
                                                        singer: track.singer,
                                                        starCast: track.starCast,
                                                        duration: track.duration,
                                                        coverImageUrl: track.coverImageUrl || "",
                                                        videoUrl: track.videoUrl,
                                                        audioFileUrl: track.audioFileUrl,
                                                        hasLiked: track.hasLiked,
                                                        authorId: track.authorId,
                                                        isPlaying: true,
                                                    });

                                                    setCurrentlyPlayingTrack(track.id)
                                                    setInitialized(true)
                                                }
                                            }}>
                                                {track?.id == trackDetails.id && trackDetails.isPlaying && initialized ? (
                                                    <PauseIcon width="15" height="15" />
                                                ) : (
                                                    <PlayIcon width="15" height="15" />
                                                )}
                                            </button>
                                        </div>
                                        <span className="text-gray-400 text-xs md:text-sm">{formatDuration(track.duration)}</span>
                                    </div>

                                    <div className='group relative'>
                                        <div className="absolute -top-10 left-1/2 -ml-2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
                                                opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                                            Add To Playlist
                                        </div>
                                        <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full p-1.5 transition-all"
                                            onClick={() => handleAddToPlaylist(track.id)}
                                        >
                                            <PlusIcon width="15" height="15" />
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {
                isAddToPlaylistOpen && (
                    <AddToPlaylistDialog isOpen={isAddToPlaylistOpen} setIsOpen={setAddToPlaylistOpen} setNewPlaylistDialogOpen={setNewPlaylistDialogOpen} trackId={trackId} />
                )
            }

            {
                isNewPlaylistDialogOpen && (
                    <AddToNewPlaylistDialog isOpen={isNewPlaylistDialogOpen} setIsOpen={setNewPlaylistDialogOpen} trackId={trackId} />
                )
            }

        </div>
    )
}

export default UserTracks