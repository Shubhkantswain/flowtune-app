import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from '@remix-run/react';
import useSearchStore from '~/store/useSearchStore';
import { useActiveTabStore } from '~/store/useActiveTabStore';

interface SearchHistoryItem {
    query: string;
    timestamp?: number;
}

function DesktopSearch(): JSX.Element {
    const location = useLocation();
    const navigate = useNavigate();
    const isSearchPage = location.pathname === "/search" || location.pathname.includes("/search-results");
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [showHistory, setShowHistory] = useState<boolean>(false);
    const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([
        { query: "previous search 1", timestamp: Date.now() - 86400000 },
        { query: "cats video", timestamp: Date.now() - 172800000 },
        { query: "react hooks tutorial", timestamp: Date.now() - 259200000 },
        { query: "funny videos", timestamp: Date.now() - 345600000 },
        { query: "javascript tips", timestamp: Date.now() - 432000000 }
    ]);
    const inputRef = useRef<HTMLInputElement>(null);
    const historyRef = useRef<HTMLDivElement>(null);

    const handleInputClick = (): void => {
        if (!isSearchPage) {
            navigate('/search');
        }
        setShowHistory(true);
    };

    const { activeTab, setActiveTab } = useActiveTabStore();
    const { searchQuery, setSearchQuery, setPage } = useSearchStore();

    const handleHistoryItemClick = (item: SearchHistoryItem): void => {
        setSearchQuery(item.query);
        setShowHistory(false);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleSubmitSearch = (): void => {
        if (searchQuery.trim()) {
            // Add to search history if not already there
            if (!searchHistory.some(item => item.query === searchQuery)) {
                setSearchHistory([
                    { query: searchQuery, timestamp: Date.now() },
                    ...searchHistory.slice(0, 9)
                ]);
            }
            setShowHistory(false);
            navigate(`/search-results/${activeTab.toLocaleLowerCase()}/${searchQuery}`);
        }
    };

    const handleClickOutside = (event: MouseEvent): void => {
        if (
            historyRef.current &&
            !historyRef.current.contains(event.target as Node) &&
            inputRef.current &&
            !inputRef.current.contains(event.target as Node)
        ) {
            setShowHistory(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative">
            <div
                className={`
                    hidden md:flex items-center backdrop-blur-sm rounded-full px-4 py-2 mr-6
                    ${isSearchPage ? 'bg-[#313232] shadow-lg' : 'hover:bg-gray-50  bg-white'} 
                    transition-all duration-300 ease-in-out
                    transform origin-right
                    ${isSearchPage ? 'scale-105 translate-y-0' : 'translate-y-0'}
                    ${isHovered ? 'w-80' : 'w-72'}
                    hover:ring-2 hover:ring-blue-200 hover:ring-opacity-50
                    group cursor-pointer
                `}
                onClick={handleInputClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    transformOrigin: 'center right',
                }}
            >
                <div className={`
                    relative
                    transition-transform duration-300
                    ${isSearchPage ? 'rotate-90' : 'rotate-0'}
                    ${isHovered ? 'scale-110' : 'scale-100'}
                    group-hover:rotate-12
                `}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={isSearchPage ? '#4B5563' : '#b2b2b2'}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-search transition-colors duration-300"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                    </svg>
                </div>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search"
                    className={`
                        bg-transparent outline-none ml-2
                        transition-all duration-300 ease-in-out
                        placeholder-gray-400
                        ${isHovered ? 'w-64' : 'w-56'}
                        focus:ring-0 focus:outline-none
                        transform
                        ${isSearchPage ? 'scale-105 text-white' : 'scale-100 text-black'}
                        ${isHovered ? 'translate-x-2' : 'translate-x-0'}
                    `}
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setPage(1) }}
                    onClick={handleInputClick}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSubmitSearch();
                        }
                    }}
                />

                <div className={`
                    absolute right-4
                    transition-all duration-300 ease-in-out
                    transform
                    ${searchQuery ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                `}>
                    {searchQuery && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setSearchQuery('');
                            }}
                            className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
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
                            >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Search History Dropdown */}
            {showHistory && (
                <div
                    ref={historyRef}
                    className="hidden md:flex absolute z-50 mt-1 w-80 bg-gradient-to-b from-neutral-950 to-neutral-900 border  border-[#2E3030] rounded-lg shadow-xl overflow-hidden"
                    style={{
                        top: '100%',
                        right: '1.5rem',
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
                                        onClick={() => handleHistoryItemClick(item)}
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

export default DesktopSearch;