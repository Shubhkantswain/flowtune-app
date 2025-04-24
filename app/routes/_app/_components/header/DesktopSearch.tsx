import { useNavigate, useLocation } from 'react-router-dom';
import useSearchStore from '~/store/useSearchStore';
import { useActiveTabStore } from '~/store/useActiveTabStore';
import { useSearchHistoryStore } from '~/store/useSearchHistoryStore';
import { useEffect } from 'react';
import { CrossIcon, SearchIcon } from '~/Svgs';

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
                className="p-1 rounded-full bg-white text-black flex items-center justify-center text-xs mx-2"
                onClick={clearSearchQuery}
              >
               <CrossIcon width="16" height="16"/>
            </button>
            )
          }
          <button
            className="p-1.5 rounded-full bg-[#25d1da] text-black flex items-center justify-center"
            onClick={handleSubmit}
          >
            <SearchIcon width="16" height="16"/>

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
          <button className={`absolute right-3 text-black ${searchQuery ? "opacity-100" : "opacity-50"}`}>
            <SearchIcon width="20" height="20"/>
          </button>
        </div>
      )}
    </div>
  );
};

export default DesktopSearch;

