import { useNavigate } from '@remix-run/react';
import React, { useRef, useState, useEffect } from 'react';
import { useActiveTabStore } from '~/store/useActiveTabStore';
import useSearchStore from '~/store/useSearchStore';

interface SearchHistoryItem {
    query: string;
    timestamp?: number;
}

function SearchBar() {
    const { searchQuery, setSearchQuery, setPage } = useSearchStore();
    const navigate = useNavigate()
    const { activeTab, setActiveTab } = useActiveTabStore()
    const [showHistory, setShowHistory] = useState(false)

    const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([
        { query: "previous search 1", timestamp: Date.now() - 86400000 },
        { query: "cats video", timestamp: Date.now() - 172800000 },
        { query: "react hooks tutorial", timestamp: Date.now() - 259200000 },
        { query: "funny videos", timestamp: Date.now() - 345600000 },
        { query: "javascript tips", timestamp: Date.now() - 432000000 }
    ]);

    const historyRef = useRef<HTMLDivElement>(null);
    const searchBarRef = useRef<HTMLDivElement>(null);

    // Handle outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                historyRef.current && 
                searchBarRef.current && 
                !historyRef.current.contains(event.target as Node) && 
                !searchBarRef.current.contains(event.target as Node)
            ) {
                setShowHistory(false);
            }
        }

        // Add event listener when history is shown
        if (showHistory) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup function to remove event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showHistory]);

    return (
        <div className="block md:hidden mt-2 mb-10">
            <div className="relative" ref={searchBarRef}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setPage(1) }}
                    className="w-full p-2 pr-10 text-black rounded-lg bg-[#FFFFFF] placeholder-[#757575] focus:outline-none focus:ring-2 focus:ring-[#fa586a]"
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && searchQuery.trim()) {
                            navigate(`/search-results/${activeTab}/${searchQuery}`);
                        }
                    }}
                    onClick={() => setShowHistory(true)}
                />
                <button
                    onClick={() => navigate(`/search-results/${activeTab}/${searchQuery}`)}
                >
                    <svg
                        className="absolute right-3 top-2.5 h-5 w-5 text-black"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                    </svg>
                </button>
            </div>

            {/* Search History Dropdown */}
            {showHistory && (
    <div
        ref={historyRef}
        className="absolute z-50 mt-1 bg-gradient-to-b from-neutral-950 to-neutral-900 border border-[#2E3030] rounded-lg shadow-xl overflow-hidden"
        style={{
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '30rem'
        }}
    >
        <div className="py-2 w-full">
            <h3 className="px-4 py-1 text-sm font-medium text-gray-400 border-b border-[#2E3030]">Search History</h3>
            {searchHistory.length > 0 ? (
                <ul className="max-h-72 overflow-y-auto">
                    {searchHistory.map((item, index) => (
                        <li
                            key={index}
                            className="flex items-center px-4 py-2.5 hover:bg-[#1E1E1E] cursor-pointer text-gray-200 group"
                            // onClick={() => handleHistoryItemClick(item)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-3 text-gray-500 flex-shrink-0"
                            >
                                <path d="M12 8v4l3 3" />
                                <circle cx="12" cy="12" r="10" />
                            </svg>
                            <span className="flex-1 truncate text-sm">{item.query}</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSearchHistory(searchHistory.filter((_, i) => i !== index));
                                }}
                                className="ml-2 text-gray-500 hover:text-gray-300 flex-shrink-0"
                                aria-label="Remove from history"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="px-4 py-3 text-sm text-gray-500">No search history</p>
            )}
            {searchHistory.length > 0 && (
                <div className="border-t border-[#2E3030] mt-1 justify-center items-center">
                    <button
                        className="w-full text-center py-2.5 text-sm font-bold text-gray-400 hover:text-white transition-colors duration-150"
                        onClick={() => setSearchHistory([])}
                    >
                        Clear search history
                    </button>
                </div>
            )}
        </div>
    </div>
)}
        </div>
    );
}

export default SearchBar;