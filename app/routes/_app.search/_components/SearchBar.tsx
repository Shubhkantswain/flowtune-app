import { useNavigate, useLocation } from 'react-router-dom';
import useSearchStore from '~/store/useSearchStore';
import { useActiveTabStore } from '~/store/useActiveTabStore';
import { useSearchHistoryStore } from '~/store/useSearchHistoryStore';

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSearchPage = location.pathname == "/search";

  const {searchQuery, setSearchQuery} = useSearchStore()
  const{activeTab} = useActiveTabStore()
  
  const {history, setHistory} = useSearchHistoryStore()

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

  return (
    <div className="mt-2 mb-10 relative">
    {isSearchPage ? (
      <div className="flex items-center bg-[#2E2F2F] rounded-none px-4 py-2 relative">
        <input
          type="text"
          value={searchQuery}
          placeholder="Search"
          className="bg-transparent text-white flex-1 outline-none"
          autoFocus
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
          }}
        />
        {searchQuery && (
          <button 
            className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-xs mx-2"
            onClick={clearSearchQuery}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
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
      <div
        className="flex items-center bg-white rounded-full cursor-pointer px-4 py-2 h-11 relative"
        onClick={handleSearchClick}
      >
        <span className={`flex-1 text-black ${searchQuery ? "opacity-100" : "opacity-50"}`}>
          {searchQuery || "Search"}
        </span>
        <div className="ml-2">
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

export default SearchBar;


// import { useLocation, useNavigate } from '@remix-run/react';
// import React, { useRef, useState, useEffect } from 'react';
// import { useActiveTabStore } from '~/store/useActiveTabStore';
// import { useSearchHistoryStore } from '~/store/useSearchHistoryStore';
// import useSearchStore from '~/store/useSearchStore';

// interface SearchHistoryItem {
//     query: string;
//     timestamp?: number;
// }

// function SearchBar() {
//     const { searchQuery, setSearchQuery, setPage } = useSearchStore();
//     const navigate = useNavigate()
//     const { activeTab, setActiveTab } = useActiveTabStore()
//     const [showHistory, setShowHistory] = useState(false)
//     const location = useLocation()
//     const isSearchPage = location.pathname == "/search"

//     const historyRef = useRef<HTMLDivElement>(null);
//     const searchBarRef = useRef<HTMLDivElement>(null);

//     // Handle outside click
//     useEffect(() => {
//         function handleClickOutside(event: MouseEvent) {
//             if (
//                 historyRef.current &&
//                 searchBarRef.current &&
//                 !historyRef.current.contains(event.target as Node) &&
//                 !searchBarRef.current.contains(event.target as Node)
//             ) {
//                 setShowHistory(false);
//             }
//         }

//         // Add event listener when history is shown
//         if (showHistory) {
//             document.addEventListener('mousedown', handleClickOutside);
//         }

//         // Cleanup function to remove event listener
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [showHistory]);

//     const { history, setHistory } = useSearchHistoryStore()

//     const handleSubmitSearch = (): void => {
//         if (searchQuery.trim()) {
//             // Add to search history if not already there
//             if (!history.some(item => item === searchQuery)) {
//                 const data = [searchQuery, ...history.slice(0, 9)]
//                 setHistory(data);
//                 localStorage.setItem("searchHistory", JSON.stringify(data))
//             } else {
//                 const data = history.filter((item) => item != searchQuery)
//                 setHistory([searchQuery, ...data])
//                 localStorage.setItem("searchHistory", JSON.stringify([searchQuery, ...data]))
//             }
//             setShowHistory(false);
//             navigate(`/search-results/${activeTab.toLocaleLowerCase()}/${searchQuery}`);
//         }
//     };

//     return (
//         <div className="block md:hidden mt-2 mb-10">
//             <div className="relative">
//                 <input
//                     type="text"
//                     placeholder="Search..."
//                     value={searchQuery}
//                     onChange={(e) => { setSearchQuery(e.target.value); setPage(1) }}
//                     className="w-full p-2 pr-10 text-black rounded-lg bg-[#FFFFFF] placeholder-[#757575] focus:outline-none focus:ring-2 focus:ring-[#25d1da]"
//                     onKeyDown={(e) => {
//                         if (e.key === "Enter" && searchQuery.trim()) {
//                             handleSubmitSearch()
//                         }
//                     }}
//                     onClick={() => setShowHistory(true)}
//                 />
//                 <button
//                     onClick={() => navigate(`/search-results/${activeTab}/${searchQuery}`)}
//                 >
//                     <svg
//                         className="absolute right-3 top-2.5 h-5 w-5 text-black"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                     >
//                         <circle cx="11" cy="11" r="8" />
//                         <path d="m21 21-4.3-4.3" />
//                     </svg>
//                 </button>
//             </div>

          
//         </div>
//     );
// }

// export default SearchBar;