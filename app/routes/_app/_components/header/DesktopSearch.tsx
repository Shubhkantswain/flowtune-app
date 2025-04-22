import { useNavigate, useLocation } from 'react-router-dom';
import useSearchStore from '~/store/useSearchStore';
import { useActiveTabStore } from '~/store/useActiveTabStore';
import { useSearchHistoryStore } from '~/store/useSearchHistoryStore';
import { useEffect } from 'react';

const DesktopSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSearchPage = location.pathname == "/search";

  const {history, setHistory} = useSearchHistoryStore()
  const {searchQuery, setSearchQuery} = useSearchStore()
  const{activeTab} = useActiveTabStore()
  
  const handleSearchClick = () => {
    if (!isSearchPage) {
      navigate('/search');
    }
  };

const handleSubmit = (): void => {
    if (searchQuery.trim()) {
        if (!history.some(item => item === searchQuery)) {
            const data = [searchQuery, ...history.slice(0, 9)];
            setHistory(data);
            localStorage.setItem("searchHistory", JSON.stringify(data));
        } else {
            const data = history.filter((item) => item !== searchQuery);
            setHistory([searchQuery, ...data]);
            localStorage.setItem("searchHistory", JSON.stringify([searchQuery, ...data]));
        }
        navigate(`/search-results/${activeTab.toLocaleLowerCase()}/${searchQuery}`);
    }
};

  const clearSearchQuery = () => {
    setSearchQuery("")
  }

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
    <div className="hidden md:block relative mr-6">
      {isSearchPage ? (
        <div className="flex items-center bg-[#2E2F2F] rounded-none px-4 py-2 md:w-[300px] lg:w-[340px] relative">
          <input
            type="text"
            value={searchQuery}
            placeholder="Search"
            className="bg-transparent text-white flex-1 outline-none"
            autoFocus
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
          />
          {
            searchQuery && (
              <button 
                className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-xs mx-2"
                onClick={clearSearchQuery}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            )
          }
          <button
            className="w-7 h-7 rounded-full bg-cyan-400 text-black flex items-center justify-center"
            onClick={handleSubmit}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      ) : (
        // Default search input (unchanged)
        <div
          className="flex items-center bg-white rounded-full overflow-hidden cursor-pointer w-48 sm:w-56 md:w-64 h-11"
          onClick={handleSearchClick}
        >
          <span className={`pl-4 text-black ${searchQuery ? "opacity-100" : "opacity-50"}`}>
            {searchQuery || "Search"}
          </span>
          <div className="absolute right-3">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={`text-black ${searchQuery ? "opacity-100" : "opacity-50"}`}
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesktopSearch;


// import { useState, useEffect, useRef } from 'react';
// import { useLocation, useNavigate } from '@remix-run/react';
// import useSearchStore from '~/store/useSearchStore';
// import { useActiveTabStore } from '~/store/useActiveTabStore';
// import { useSearchHistoryStore } from '~/store/useSearchHistoryStore';
// import ShowHistoryDropdown from './ShowHistoryDropdown';

// interface SearchHistoryItem {
//     query: string;
//     timestamp?: number;
// }

// const DesktopSearch = () =>  {
//     const location = useLocation();
//     const navigate = useNavigate();

//     const { history, setHistory } = useSearchHistoryStore()
//     const { activeTab } = useActiveTabStore();
//     const { searchQuery, setSearchQuery, setPage } = useSearchStore();

//     const [isHovered, setIsHovered] = useState<boolean>(false);
//     const [showHistory, setShowHistory] = useState<boolean>(false);
    
//     const inputRef = useRef<HTMLInputElement>(null);
//     const historyRef = useRef<HTMLDivElement>(null);

//     const isSearchPage = location.pathname === "/search";

//     const handleInputClick = (): void => {
//         if (!isSearchPage) {
//             navigate('/search');
//         }
//         setShowHistory(true);
//     };

// const handleSubmitSearch = (): void => {
//     if (searchQuery.trim()) {
//         if (!history.some(item => item === searchQuery)) {
//             const data = [searchQuery, ...history.slice(0, 9)];
//             setHistory(data);
//             localStorage.setItem("searchHistory", JSON.stringify(data));
//         } else {
//             const data = history.filter((item) => item !== searchQuery);
//             setHistory([searchQuery, ...data]);
//             localStorage.setItem("searchHistory", JSON.stringify([searchQuery, ...data]));
//         }
//         setShowHistory(false);
//         inputRef.current?.blur(); // 👈 Blur the input after submission
//         navigate(`/search-results/${activeTab.toLocaleLowerCase()}/${searchQuery}`);
//     }
// };


//     const handleClickOutside = (event: MouseEvent): void => {
//         if (
//             historyRef.current &&
//             !historyRef.current.contains(event.target as Node) &&
//             inputRef.current &&
//             !inputRef.current.contains(event.target as Node)
//         ) {
//             setShowHistory(false);
//         }
//     };

//     useEffect(() => {
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     useEffect(() => {
//         try {
//             const storedData = localStorage.getItem("searchHistory");
//             const data = storedData ? JSON.parse(storedData) : [];
//             // Optional: validate that data is an array
//             setHistory(Array.isArray(data) ? data : []);
//         } catch (error) {
//             console.error("Error loading search history:", error);
//             setHistory([]);
//         }
//     }, []);
 
//     return (
//         <div className="relative">
//             <div
//                 className={`
//                     hidden md:flex items-center backdrop-blur-sm rounded-full px-4 py-2 mr-6
//                     ${isSearchPage ? 'bg-[#313232] shadow-lg' : 'hover:bg-gray-50  bg-white'} 
//                     transition-all duration-300 ease-in-out
//                     transform origin-right
//                     ${isSearchPage ? 'scale-105 translate-y-0' : 'translate-y-0'}
//                     ${isHovered ? 'w-80' : 'w-72'}
//                     hover:ring-2 hover:ring-blue-200 hover:ring-opacity-50
//                     group cursor-pointer
//                 `}
//                 onClick={handleInputClick}
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//                 style={{
//                     transformOrigin: 'center right',
//                 }}
//             >
//                 <div className={`
//                     relative
//                     transition-transform duration-300
//                     ${isSearchPage ? 'rotate-90' : 'rotate-0'}
//                     ${isHovered ? 'scale-110' : 'scale-100'}
//                     group-hover:rotate-12
//                 `}>
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke={isSearchPage ? '#4B5563' : '#b2b2b2'}
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="lucide lucide-search transition-colors duration-300"
//                     >
//                         <circle cx="11" cy="11" r="8" />
//                         <path d="m21 21-4.3-4.3" />
//                     </svg>
//                 </div>
//                 <input
//                     ref={inputRef}
//                     type="text"
//                     placeholder="Search"
//                     className={`
//                         bg-transparent outline-none ml-2
//                         transition-all duration-300 ease-in-out
//                         placeholder-gray-400
//                         ${isHovered ? 'w-64' : 'w-56'}
//                         focus:ring-0 focus:outline-none
//                         transform
//                         ${isSearchPage ? 'scale-105 text-white' : 'scale-100 text-black'}
//                         ${isHovered ? 'translate-x-2' : 'translate-x-0'}
//                     `}
//                     value={searchQuery}
//                     onChange={(e) => { setSearchQuery(e.target.value); setPage(1) }}
//                     onClick={handleInputClick}
//                     onKeyDown={(e) => {
//                         if (e.key === "Enter") {
//                             handleSubmitSearch();
//                         }
//                     }}
//                 />

//                 <div className={`
//                     absolute right-4
//                     transition-all duration-300 ease-in-out
//                     transform
//                     ${searchQuery ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
//                 `}>
//                     {searchQuery && (
//                         <button
//                             onClick={(e) => {
//                                 e.stopPropagation();
//                                 setSearchQuery('');
//                             }}
//                             className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
//                         >
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 width="16"
//                                 height="16"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                             >
//                                 <path d="M18 6 6 18" />
//                                 <path d="m6 6 12 12" />
//                             </svg>
//                         </button>
//                     )}
//                 </div>
//             </div>

//             {/* Search History Dropdown */}
//            <ShowHistoryDropdown showHistory={showHistory} setShowHistory={setShowHistory} historyRef={historyRef}/>
//         </div>
//     );
// }

// export default DesktopSearch;