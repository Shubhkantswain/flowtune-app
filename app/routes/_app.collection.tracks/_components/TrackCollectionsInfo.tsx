import { Track } from 'gql/graphql'
import React from 'react'
import TrackCollectionsCover from './TrackCollectionsCover';
import { CompactIcon, ListIcon, MoreIcon } from '~/Svgs';

interface TrackCollectionsInfoProps {
    showDropdown: boolean;
    screenType: string;
    handlePlayTrack: (track: Track) => void;
    toggleScreenType: () => void;
    toggleDropdown: () => void;
    dropdownRef: React.RefObject<HTMLDivElement>;
    initialTrack: Track
}

const TrackCollectionsInfo: React.FC<TrackCollectionsInfoProps> = ({
    showDropdown,
    screenType,
    handlePlayTrack,
    toggleScreenType,
    toggleDropdown,
    dropdownRef,
    initialTrack
}) => {
    return (
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start mb-8">
            {/* Playlist Cover with Gradient Heart */}
            <TrackCollectionsCover />

            {/* Playlist Info */}
            <div className="flex flex-col gap-4 items-center md:items-start">
                <span className="text-cyan-400 text-sm font-medium uppercase tracking-wide">Playlist</span>
                <h1 className="text-white text-4xl md:text-6xl font-bold text-center md:text-left">My Likes</h1>
                <span className="text-gray-400 text-sm">PRIVATE</span>

                <div className="flex gap-4 items-center mt-4">
                    <button
                        className="flex items-center gap-2 bg-[#25d1da] hover:bg-[#25d1da]/70 text-black font-semibold px-8 py-3 rounded-full"
                        onClick={() => handlePlayTrack(initialTrack)}
                    >
                        Play
                    </button>

                    {/* Toggle view button */}
                    <div className="relative mt-1.5">
                        <button
                            className="transition-colors group hover:text-[#93D0D5] cursor-pointer"
                            onClick={toggleScreenType}
                        >
                            {/* Tooltip */}
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                                Switch to {screenType == "compact" ? "list" : "compact"} screen
                            </div>

                            {/* Icon */}
                            {screenType === "compact" ? (
                                <CompactIcon width="24" height="24" />
                            ) : (
                                <ListIcon width="24" height="24" />
                            )}
                        </button>
                    </div>


                    {/* More options button with dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={toggleDropdown}
                            className="group mt-1.5 transition-colors focus:outline-none hover:text-[#93D0D5]"
                            aria-label="More options"
                        >
                            {/* Tooltip INSIDE the button */}
                            <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white z-10">
                                More
                            </div>

                            <MoreIcon width="24" height="24" />
                        </button>

                        {showDropdown && (
                            <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 w-64 z-0 transform transition-all duration-300 ease-in-out ${showDropdown ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                                <div className="bg-gradient-to-b from-neutral-950 to-neutral-900 rounded-md shadow-xl border border-[#2E3030]">
                                    <div className="py-1">
                                        <button
                                            className="flex items-center justify-between w-full text-left px-4 py-4 text-sm text-gray-200 hover:bg-[#29292A] hover:text-white"
                                            onClick={() => {
                                                handlePlayTrack(initialTrack)
                                            }}
                                        >
                                            Play
                                        </button>
                                        <div className="border-b border-[#2E3030]"></div>

                                        <button
                                            className="flex items-center justify-between w-full text-left px-4 py-4 text-sm text-gray-200 hover:bg-[#29292A] hover:text-white"
                                            onClick={async () => {
                                                const shareUrl = window.location.href;
                                                if (navigator.share) {
                                                    try {
                                                        await navigator.share({
                                                            title: document.title,
                                                            url: shareUrl,
                                                        });
                                                    } catch (error) {
                                                        console.error("Error sharing:", error);
                                                    }
                                                } else {
                                                    try {
                                                        await navigator.clipboard.writeText(shareUrl);
                                                        alert("Link copied to clipboard!");
                                                    } catch (error) {
                                                        console.error("Failed to copy link:", error);
                                                    }
                                                }
                                            }}
                                        >
                                            Share
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>


                </div>
            </div>
        </div>
    )
}

export default TrackCollectionsInfo