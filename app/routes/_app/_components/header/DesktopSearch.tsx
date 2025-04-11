import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from '@remix-run/react';
import useSearchStore from '~/store/useSearchStore';
import { useActiveTabStore } from '~/store/useActiveTabStore';
import { useSearchHistoryStore } from '~/store/useSearchHistoryStore';
import ShowHistoryDropdown from './ShowHistoryDropdown';

interface SearchHistoryItem {
    query: string;
    timestamp?: number;
}

const DesktopSearch = () =>  {
    const location = useLocation();
    const navigate = useNavigate();

    const { history, setHistory } = useSearchHistoryStore()
    const { activeTab } = useActiveTabStore();
    const { searchQuery, setSearchQuery, setPage } = useSearchStore();

    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [showHistory, setShowHistory] = useState<boolean>(false);
    
    const inputRef = useRef<HTMLInputElement>(null);
    const historyRef = useRef<HTMLDivElement>(null);

    const isSearchPage = location.pathname === "/search" || location.pathname.includes("/search-results");

    const handleInputClick = (): void => {
        if (!isSearchPage) {
            navigate('/search');
        }
        setShowHistory(true);
    };

    const handleSubmitSearch = (): void => {
        if (searchQuery.trim()) {
            // Add to search history if not already there
            if (!history.some(item => item === searchQuery)) {
                const data = [searchQuery, ...history.slice(0, 9)]
                setHistory(data);
                localStorage.setItem("searchHistory", JSON.stringify(data))
            } else {
                const data = history.filter((item) => item != searchQuery)
                setHistory([searchQuery, ...data])
                localStorage.setItem("searchHistory", JSON.stringify([searchQuery, ...data]))
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

    useEffect(() => {
        try {
            const storedData = localStorage.getItem("searchHistory");
            const data = storedData ? JSON.parse(storedData) : [];
            // Optional: validate that data is an array
            setHistory(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error loading search history:", error);
            setHistory([]);
        }
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
           <ShowHistoryDropdown showHistory={showHistory} setShowHistory={setShowHistory} historyRef={historyRef}/>
        </div>
    );
}

export default DesktopSearch;