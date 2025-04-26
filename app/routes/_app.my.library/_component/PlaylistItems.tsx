import { useNavigate } from '@remix-run/react';
import { Playlist } from 'gql/graphql';
import { Heart, Link, PlusCircle } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { useTrackStore } from '~/store/useTrackStore';
import ScrollControls from './ScrollControls';

interface PlaylistItemsProps {
    playlists: Playlist[]
    activeTab: string
    shouldShowLikedPlaylist?: boolean
}


const PlaylistItems: React.FC<PlaylistItemsProps> = ({ playlists, activeTab, shouldShowLikedPlaylist }) => {
    const scrollContainerRef = useRef(null);
    const [canScroll, setCanScroll] = useState({ left: false, right: false });

    const navigate = useNavigate();

    const { setTrackDetails } = useTrackStore()

    const handleScroll = () => {
        checkScrollability();
    };

    const checkScrollability = (): void => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current as HTMLDivElement;
            const hasHorizontalScroll: boolean = container.scrollWidth > container.clientWidth;
            const atStart: boolean = container.scrollLeft <= 0;
            const atEnd: boolean = container.scrollLeft + container.clientWidth >= container.scrollWidth - 5;

            setCanScroll({
                left: hasHorizontalScroll && !atStart,
                right: hasHorizontalScroll && !atEnd,
            });
        }
    };


    const scroll = (direction: 'left' | 'right'): void => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current as HTMLDivElement;
            const scrollAmount = direction === 'left' ? -300 : 300;
            container.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });

            // Update scroll buttons after scrolling
            setTimeout(checkScrollability, 300);
        }
    };


    useEffect(() => {
        checkScrollability();
        window.addEventListener('resize', checkScrollability);
        return () => window.removeEventListener('resize', checkScrollability);
    }, [activeTab]);

    return (
        <>
            <ScrollControls canScroll={canScroll} scroll={scroll} activeTab={activeTab} />
            <div
                ref={scrollContainerRef}
                className="overflow-x-auto pb-4 hide-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onScroll={handleScroll}
            >

                <div className="grid grid-flow-col auto-cols-max gap-4">
                    {
                        ((activeTab == "Likes" || activeTab == "All") && shouldShowLikedPlaylist) && (
                            <div className="group w-36 sm:w-40 md:w-44 sm:mr-2 md:mr-3 lg:mr-5">
                                <div className="relative aspect-square overflow-hidden rounded-sm mb-2 bg-neutral-800">
                                    <div
                                        className="absolute inset-0 flex items-center justify-center cursor-pointer hover:brightness-50"
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
                                <div className="font-normal truncate">My Likes</div>
                                <div className="text-sm truncate text-gray-400"></div>
                            </div>
                        )
                    }

                    {
                        (activeTab == "Playlists" || activeTab == "All") && (
                            playlists?.map(playlist => (
                                <div key={playlist.id} className="group w-36 sm:w-40 md:w-44 sm:mr-2 md:mr-3 lg:mr-5">
                                    <div className="relative aspect-square overflow-hidden rounded-sm mb-2 bg-neutral-800">
                                        <div
                                            className="absolute inset-0 cursor-pointer"
                                            onClick={() => { navigate(`/playlist/${playlist.id}`) }}
                                        >
                                            <img
                                                src={playlist.coverImageUrl}
                                                alt="Cover"
                                                className="w-full h-full object-cover group-hover:brightness-50 transition-all"
                                            />
                                        </div>
                                    </div> 
                                    <div className="font-normal mt-2 truncate overflow-ellipsis">
                                        {playlist?.name}
                                    </div>
                                    <div className="text-sm text-gray-400 truncate overflow-ellipsis mt-0.5">
                                        Total Tracks : {playlist.totalTracks}
                                    </div>
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
        </>
    )
}

export default PlaylistItems