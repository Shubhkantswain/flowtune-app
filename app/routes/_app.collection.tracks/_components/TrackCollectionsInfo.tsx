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
            <TrackCollectionsCover/>

            {/* Playlist Info */}
            <div className="flex flex-col gap-4 items-center md:items-start">
                <span className="text-cyan-400 text-sm font-medium uppercase tracking-wide">Playlist</span>
                <h1 className="text-white text-4xl md:text-6xl font-bold text-center md:text-left">My Likes</h1>
                <span className="text-gray-400 text-sm">PRIVATE</span>

                <div className="flex gap-4 items-center mt-4">
                    <button
                        // className="bg-cyan-400 text-black px-6 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-cyan-300 transition-colors"
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
                    <div className="relative group  mt-1.5" ref={dropdownRef}>

                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                            More
                        </div>

                        <button
                            className="text-white hover:scale-110 transition-colors"
                            onClick={toggleDropdown}
                        >
                            {/* <MoreHorizontal className="w-6 h-6" /> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <defs>
                                    <path id="ic_action_more-a" d="M19,14 C17.895,14 17,13.105 17,12 C17,10.895 17.895,10 19,10 C20.105,10 21,10.895 21,12 C21,13.105 20.105,14 19,14 Z M14,12 C14,10.895 13.105,10 12,10 C10.895,10 10,10.895 10,12 C10,13.105 10.895,14 12,14 C13.105,14 14,13.105 14,12 Z M7,12 C7,10.895 6.105,10 5,10 C3.895,10 3,10.895 3,12 C3,13.105 3.895,14 5,14 C6.105,14 7,13.105 7,12 Z"></path>
                                </defs>
                                <g fillRule="evenodd" fill="transparent">
                                    <rect width="24" height="24"></rect>
                                    <use fillRule="nonzero" href="#ic_action_more-a" fill="currentColor"></use>
                                </g>
                            </svg>
                        </button>

                        {showDropdown && (
                            <div className="absolute z-10 -translate-x-1/2 left-1/2 bottom-full mb-2 w-48 rounded-md bg-gradient-to-b from-neutral-950 to-neutral-900 border border-[#2E3030] shadow-lg overflow-hidden">
                                {[
                                    "Play",
                                    "Share",
                                ].map((item, index) => (
                                    <button
                                        key={index}
                                        className="flex items-center w-full px-4 py-3 text-sm text-white hover:bg-[#1E1E1E] border-b border-[#2E3030] last:border-b-0"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrackCollectionsInfo