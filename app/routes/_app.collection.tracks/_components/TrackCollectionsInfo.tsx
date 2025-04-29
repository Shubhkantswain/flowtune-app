import { Track } from 'gql/graphql'
import React from 'react'
import TrackCollectionsCover from './TrackCollectionsCover';
import { CompactIcon, ListIcon, MoreIcon, PlayIcon } from '~/Svgs';
import Tooltip from '~/components/Tooltip';

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
                {/* <span className="text-cyan-400 text-sm font-medium uppercase tracking-wide">PRIVATE</span> */}
                <span className="text-[#25d1da] text-sm">PRIVATE</span>

                <h1 className="text-white text-4xl md:text-6xl font-bold text-center md:text-left">My Likes</h1>
                <span className="text-gray-400 text-sm"></span>

                <div className="flex gap-7 items-center mt-4">
                    <button
                        onClick={() => handlePlayTrack(initialTrack)}
                        className="flex items-center gap-2 bg-[#25d1da] hover:scale-105 hover:bg-[#93D0D5] text-black  font-normal px-4 py-2 rounded-full transition-transform"
                    >
                        <PlayIcon width='16' height='16' />
                        Play
                    </button>

                    {/* Toggle view button */}
                    <div className="relative mt-1.5">
                        <button
                            className="transition-colors group hover:text-[#93D0D5] cursor-pointer"
                            onClick={toggleScreenType}
                        >
                            {/* Tooltip */}
                            <Tooltip text={`Switch To ${screenType == "compact" ? "List" : "Compact"} Screen`} className='-top-12' />

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
                            className="group mt-1.5 rounded-full transition-colors focus:outline-none hover:text-[#93D0D5]"
                            aria-label="More options"
                        >
                            <Tooltip text='more' className='-top-7' />

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