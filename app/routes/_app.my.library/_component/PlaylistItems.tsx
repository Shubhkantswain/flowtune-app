import { useNavigate } from '@remix-run/react';
import { UserPlaylistsResponseItem } from 'gql/graphql';
import { Heart, Link } from 'lucide-react';
import React from 'react'

interface PlaylistItemsProps {
    handleScroll: () => void
    scrollContainerRef: React.RefObject<HTMLDivElement>;
    playlists: UserPlaylistsResponseItem[]
    activeTab: string
}

const PlaylistItems: React.FC<PlaylistItemsProps> = ({ playlists, handleScroll, scrollContainerRef, activeTab }) => {
    const navigate = useNavigate();

    return (
        <div
            ref={scrollContainerRef}
            className="overflow-x-auto pb-4 hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onScroll={handleScroll}
        >
            <div className="grid grid-flow-col auto-cols-max gap-4">
                {
                    (activeTab == "Likes" || activeTab == "All") && (
                        <div className="group w-32 sm:w-40 md:w-48 sm:mr-2 md:mr-3 lg:mr-5">
                            <div className="relative aspect-square overflow-hidden rounded-lg mb-2 bg-neutral-800">
                                <div
                                    className="absolute inset-0 flex items-center justify-center cursor-pointer hover:opacity-70"
                                    onClick={() => { navigate(`/collection/tracks`) }}
                                >
                                    <div className="relative">
                                        <Heart className="w-24 h-24 md:w-32 md:h-32 text-cyan-400" fill="currentColor" />
                                        <div className="absolute inset-0 blur-md">
                                            <Heart className="w-24 h-24 md:w-32 md:h-32 text-purple-500" fill="currentColor" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-sm truncate">My Likes</div>
                            <div className="text-sm truncate text-gray-400"></div>
                        </div>
                    )
                }

                {
                    (activeTab == "Playlists" || activeTab == "All") && (
                        playlists?.map(playlist => (
                            <div key={playlist.id} className="group w-32 sm:w-40 md:w-48 sm:mr-2 md:mr-3 lg:mr-5">
                                <div className="relative aspect-square overflow-hidden rounded-lg mb-2 bg-neutral-800">

                                    <div className="absolute inset-0 cursor-pointer hover:opacity-70" onClick={() => { navigate(`/playlist/${ playlist.id }`) }}>
                                        <img
                                            src={playlist.coverImageUrl}
                                            alt="Cover"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                </div>
                                <div className="text-sm truncate">{playlist.name}</div>
                                <div className="text-sm truncate text-gray-400">Total Tracks : {playlist.totalTracks}</div>
                            </div>
                        ))
                    )
                }


                {
                    activeTab == "Podcast" && (
                        <h1>Sorry, we could not find any podcast ☹️</h1>
                    )
                }
            </div>
        </div>
    )
}

export default PlaylistItems