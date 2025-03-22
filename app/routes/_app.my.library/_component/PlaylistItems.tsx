import { useNavigate } from '@remix-run/react';
import { UserPlaylistsResponseItem } from 'gql/graphql';
import { Link } from 'lucide-react';
import React from 'react'

interface PlaylistItemsProps {
    handleScroll: () => void
    scrollContainerRef: React.RefObject<HTMLDivElement>;
    playlists: UserPlaylistsResponseItem[]
}

const PlaylistItems: React.FC<PlaylistItemsProps> = ({ playlists, handleScroll, scrollContainerRef }) => {
    const navigate = useNavigate();

    return (
        <div
            ref={scrollContainerRef}
            className="overflow-x-auto pb-4 hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onScroll={handleScroll}
        >
            <div className="grid grid-flow-col auto-cols-max gap-4">
                {playlists?.map(playlist => (
                    <div key={playlist.id} className="group w-32 sm:w-40 md:w-48">
                        <div className="relative aspect-square overflow-hidden rounded-lg mb-2 bg-neutral-800">

                            <div className="absolute inset-0 cursor-pointer hover:opacity-70" onClick={() => { navigate(`/playlist/${playlist.id}`) }}>
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
                ))}
            </div>
        </div>
    )
}

export default PlaylistItems