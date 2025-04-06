import { useParams } from '@remix-run/react';
import { Track } from 'gql/graphql';
import React, { useEffect, useState } from 'react'
import { useGetUserTracks } from '~/hooks/user';
import usePlaylistStore from '~/store/usePlaylistStore';
import { useTrackStore } from '~/store/useTrackStore';

interface UserProfileInfo {
    tracks: Track[]
    allTracks: Track[]
    page: number
}

function UserTracks({ tracks, allTracks,page }: UserProfileInfo) {
    const { trackDetails, setTrackDetails } = useTrackStore()
    const { initialize, setCurrentTrack } = usePlaylistStore()
    
    const [initialized, setInitialized] = useState(false)

    return (
        <div className="mt-6 md:mt-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Episodes</h2>
            <div className="space-y-5 md:space-y-6">
                {(allTracks.length > 0 ? allTracks : tracks)?.map((track, index) => (
                    <div
                        key={index}
                        className="group bg-white/5 hover:bg-white/10 transition-colors rounded-lg p-3 md:p-4 cursor-pointer"
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
                                        <div className="text-gray-400 text-xs md:text-sm">{"track.date"}</div>
                                        <h3 className="font-medium text-base md:text-lg sm:truncate">{track.title}</h3>
                                        <p className="text-gray-400 text-xs md:text-sm line-clamp-2 max-w-2xl">{"track.description"}</p>
                                    </div>
                                    <div className="hidden md:flex items-center gap-4 ml-4">
                                        <button className="group-hover:bg-white/20 backdrop-blur-sm bg-white/10 rounded-full p-1.5 md:p-2 transition-all" onClick={() => {
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
                                                    initialize(tracks)
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

                                                setCurrentTrack(track.id)
                                                setInitialized(true)
                                            }
                                        }}>
                                            {track?.id == trackDetails.id && trackDetails.isPlaying && initialized ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                                                    <defs>
                                                        <path id="ic_playback_pause-a" d="M9,22 L6,22 C5.45,22 5,21.55 5,21 L5,3 C5,2.45 5.45,2 6,2 L9,2 C9.55,2 10,2.45 10,3 L10,21 C10,21.55 9.55,22 9,22 Z M19,21 L19,3 C19,2.45 18.55,2 18,2 L15,2 C14.45,2 14,2.45 14,3 L14,21 C14,21.55 14.45,22 15,22 L18,22 C18.55,22 19,21.55 19,21 Z"></path>
                                                    </defs>
                                                    <g fillRule="evenodd" fill="transparent">
                                                        <rect width="24" height="24"></rect>
                                                        <use fillRule="nonzero" href="#ic_playback_pause-a" fill="currentColor"></use>
                                                    </g>
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polygon points="5 3 19 12 5 21 5 3" />
                                                </svg>
                                            )}
                                        </button>
                                        <div className="text-gray-400 text-xs md:text-sm w-12 text-center">{track.duration}</div>
                                        <button className="group-hover:bg-white/20 backdrop-blur-sm bg-white/10 rounded-full p-1 md:p-1.5 transition-all">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>

                                        </button>
                                    </div>
                                </div>

                                <div className="md:hidden flex items-center justify-between mt-3 md:mt-4">
                                    <div className="flex items-center gap-2">
                                        <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full p-1.5 transition-all" onClick={() => {
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
                                                    initialize(tracks)
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

                                                setCurrentTrack(track.id)
                                                setInitialized(true)
                                            }
                                        }}>
                                            {track?.id == trackDetails.id && trackDetails.isPlaying && initialized ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                                                    <defs>
                                                        <path id="ic_playback_pause-a" d="M9,22 L6,22 C5.45,22 5,21.55 5,21 L5,3 C5,2.45 5.45,2 6,2 L9,2 C9.55,2 10,2.45 10,3 L10,21 C10,21.55 9.55,22 9,22 Z M19,21 L19,3 C19,2.45 18.55,2 18,2 L15,2 C14.45,2 14,2.45 14,3 L14,21 C14,21.55 14.45,22 15,22 L18,22 C18.55,22 19,21.55 19,21 Z"></path>
                                                    </defs>
                                                    <g fillRule="evenodd" fill="transparent">
                                                        <rect width="24" height="24"></rect>
                                                        <use fillRule="nonzero" href="#ic_playback_pause-a" fill="currentColor"></use>
                                                    </g>
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polygon points="5 3 19 12 5 21 5 3" />
                                                </svg>
                                            )}
                                        </button>
                                        <span className="text-gray-400 text-xs md:text-sm">{track.duration}</span>
                                    </div>
                                    <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full p-1.5 transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><defs><path id="ic_action_add-a" d="M21,11 L13,11 L13,3 C13,2.448 12.552,2 12,2 C11.448,2 11,2.448 11,3 L11,11 L3,11 C2.448,11 2,11.448 2,12 C2,12.552 2.448,13 3,13 L11,13 L11,21 C11,21.553 11.448,22 12,22 C12.552,22 13,21.553 13,21 L13,13 L21,13 C21.552,13 22,12.552 22,12 C22,11.448 21.552,11 21,11 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use href="#ic_action_add-a" fill="currentColor"></use></g></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserTracks