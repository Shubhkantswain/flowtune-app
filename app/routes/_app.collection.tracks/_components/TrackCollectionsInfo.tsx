import { Track } from 'gql/graphql'
import React from 'react'
import TrackCollectionsCover from './TrackCollectionsCover';

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
                    <div className="relative mt-1.5 group">
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                            Switch to {screenType == "compact" ? "list" : "compact"} screen
                        </div>

                        <button
                            className="text-white hover:text-[#25d1da] transition-colors"
                            onClick={toggleScreenType}
                        >
                            {screenType === "compact" ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-list-icon lucide-list"><path d="M3 12h.01" /><path d="M3 18h.01" /><path d="M3 6h.01" /><path d="M8 12h13" /><path d="M8 18h13" /><path d="M8 6h13" /></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-align-justify-icon lucide-align-justify"><path d="M3 12h18" /><path d="M3 18h18" /><path d="M3 6h18" /></svg>
                            )}
                        </button>
                    </div>

                    {/* More options button with dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={toggleDropdown}
                            className="p-2 rounded-full transition-colors focus:outline-none group"
                            aria-label="More options"
                        >
                            {/* Tooltip inside the button */}
                            <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                                More
                            </div>

                            <div className='hover:scale-110'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis">
                                    <circle cx="12" cy="12" r="1" />
                                    <circle cx="19" cy="12" r="1" />
                                    <circle cx="5" cy="12" r="1" />
                                </svg>
                            </div>
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