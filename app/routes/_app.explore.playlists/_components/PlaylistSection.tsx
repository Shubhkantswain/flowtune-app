import React, { useEffect, useRef, useState } from 'react'
import { ScrollDirection } from '~/types';
import { Playlist, Track } from 'gql/graphql';
import Header from './Header';
import PlaylistItems from './PlaylistItems';

function PlaylistSection({ playlists, title }: {
    playlists: Playlist[],
    title: string
}) {
    const scrollContainerRef = useRef(null);
    const [canScroll, setCanScroll] = useState({ left: false, right: false });

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
            const scrollAmount = direction === 'left' ? -350 : 350;
            container.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });

            // Update scroll buttons after scrolling
            setTimeout(checkScrollability, 300);
        } 
    };

    const handleScroll = () => {
        checkScrollability();
    };

    useEffect(() => {
        checkScrollability();
        window.addEventListener('resize', checkScrollability);
        return () => window.removeEventListener('resize', checkScrollability);
    }, []);

    return (
        <div className="text-white p-4 sm:p-6 md:p-8">
            {/* Haeder:- which include the title, left and right arrows and see all button //*/}
            <Header scroll={scroll} title={title} playlists={playlists} canScrollLeft={canScroll.left} canScrollRight={canScroll.right} />

            <div className="relative">
                <div
                    ref={scrollContainerRef}
                    className="flex gap-4 sm:gap-5 md:gap-8 overflow-x-auto scrollbar-hide [-webkit-overflow-scrolling:touch] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <PlaylistItems playlists={playlists} />
                </div>
            </div>
        </div>
    )
}

export default PlaylistSection