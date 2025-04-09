import React, { useEffect, useRef, useState } from 'react'
import { ScrollDirection } from '~/types';
import { Playlist, Track } from 'gql/graphql';
import Header from './Header';
import PlaylistItems from './PlaylistItems';

function PlaylistSection({ playlists, title }: {
    playlists: Playlist[],
    title: string
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    const scroll = (direction: ScrollDirection): void => {
        if (containerRef.current && !isAnimating) {
            setIsAnimating(true);
            const scrollAmount = 400;
            const container = containerRef.current;
            const currentScroll = container.scrollLeft;
            const targetScroll = direction === 'left'
                ? Math.max(0, currentScroll - scrollAmount)
                : Math.min(container.scrollWidth - container.clientWidth, currentScroll + scrollAmount);

            const startTime = performance.now();
            const duration = 500; // Animation duration in ms

            const easeInOutCubic = (t: number): number =>
                t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

            const animateScroll = (currentTime: number): void => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                const easedProgress = easeInOutCubic(progress);

                if (container) {
                    container.scrollLeft = currentScroll + (targetScroll - currentScroll) * easedProgress;
                }

                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                } else {
                    setIsAnimating(false);
                }
            };

            requestAnimationFrame(animateScroll);
        }
    }

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateScrollArrows = () => {
        if (containerRef.current) {
            const container = containerRef.current;
            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth);
        }
    };

    useEffect(() => {
        updateScrollArrows(); // run once on mount

        const container = containerRef.current;
        if (!container) return;

        container.addEventListener('scroll', updateScrollArrows);
        window.addEventListener('resize', updateScrollArrows); // optional, in case of responsive design

        return () => {
            container.removeEventListener('scroll', updateScrollArrows);
            window.removeEventListener('resize', updateScrollArrows);
        };
    }, []);

    return (
        <div className="text-white p-4 sm:p-6 md:p-8">
            {/* Haeder:- which include the title, left and right arrows and see all button //*/}
            <Header scroll={scroll} title={title} playlists={playlists} canScrollLeft={canScrollLeft} canScrollRight={canScrollRight} />

            <div className="relative">
                <div
                    ref={containerRef}
                    className="flex gap-4 sm:gap-5 md:gap-8 overflow-x-auto scrollbar-hide [-webkit-overflow-scrolling:touch] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden font-serif"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <PlaylistItems playlists={playlists} />
                </div>
            </div>
        </div>
    )
}

export default PlaylistSection