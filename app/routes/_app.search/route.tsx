import React, { useEffect, useState } from 'react';
import { genre, MoodsAndActivities } from '~/data';
import ExploreSearch from './_components/ExploreSearch';
import SearchBar from './_components/SearchBar';
import { playlistSearchData, searchData } from '~/searchData';
import useSearchStore from '~/store/useSearchStore';
import { useNavigate } from '@remix-run/react';
import { useCurrentUser } from '~/hooks/auth';
import { useActiveTabStore } from '~/store/useActiveTabStore';
import { useSearchHistoryStore } from '~/store/useSearchHistoryStore';
import Footer from '../_app/components/Footer';

interface Song {
  title: string;
  coverImageUrl: string;
}

type searchKey = keyof typeof searchData;

const BrowsePage = () => {
  const { searchQuery, setSearchQuery, setPage, setSearchResults } = useSearchStore();
  const [suggestionResults, setSuggestionResults] = useState<Song[]>([]);
  const { history, setHistory } = useSearchHistoryStore()

  const { data } = useCurrentUser()

  console.log("user", data);

  const { activeTab, setActiveTab } = useActiveTabStore()
  useEffect(() => {
    if (searchQuery.trim()) {
      if (activeTab == "Tracks") {

        const firstLetter = searchQuery[0].toLowerCase(); // Extract first letter
        const filteredSongs: Song[] = searchData[firstLetter as searchKey] || []; // Get songs for that letter

        // Filter songs containing searchQuery
        const results = filteredSongs.filter((song) =>
          song.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setSuggestionResults(results);
      }

      if (activeTab == "Playlists") {
        const firstLetter = searchQuery[0].toLowerCase(); // Extract first letter
        const filteredSongs: Song[] = playlistSearchData[firstLetter as searchKey] || []; // Get songs for that letter

        // Filter songs containing searchQuery
        const results = filteredSongs.filter((song) =>
          song.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setSuggestionResults(results);
      }
    } else {
      setSuggestionResults([]); // Clear results when searchQuery is empty
    }
  }, [searchQuery, activeTab]);

  const navigate = useNavigate()

  const tabs = [
    "Tracks", "Playlists", "Podcasts"
  ];

  return (
    <>
      {/* Search bar - only visible on small screens */}
      <div className=' block md:hidden p-4 sm:p-6 md:p-8 -mb-10'>
        <SearchBar />
      </div>

      <div className="min-h-screen p-4 sm:p-6 md:p-8 text-white">
        {/* Display search results */}
        {searchQuery.trim() && (
          <>
            <div className="flex space-x-2 overflow-x-auto  no-scrollbar">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors duration-200 ${activeTab === tab ? 'bg-white text-black'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-gray-300'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-6 text-white">Suggestions</h2>

              {suggestionResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {suggestionResults.map((song, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-lg bg-[#1A1A1A] hover:bg-[#2A2A2A] transition duration-200 cursor-pointer shadow-sm"
                      onClick={() => {
                        setPage(1);
                        if (searchQuery.trim()) {
                          if (!history.includes(searchQuery)) {
                            const data = [song.title, ...history.slice(0, 9)];
                            setHistory(data);
                            localStorage.setItem("searchHistory", JSON.stringify(data));
                          }
                          navigate(`/search-results/${activeTab.toLowerCase()}/${song.title}`);
                        }
                      }}
                    >
                      <img
                        src={song.coverImageUrl}
                        alt={song.title}
                        className="w-14 h-14 rounded-lg object-cover shadow-md"
                      />
                      <div>
                        <p className="text-xs uppercase text-[#02fad5] font-semibold mb-1">Track</p>
                        <h3 className="text-white text-sm font-medium leading-tight hover:text-[#02fad5]">
                          {song.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 mt-4 text-sm">No results found.</p>
              )}
            </div>

          </>
        )}

        {!searchQuery.trim() && (
          <>
            {/* Moods & Activities */}
            <ExploreSearch title="Moods & Activities" exploreItems={MoodsAndActivities} />

            {/* Music By Genre */}
            <ExploreSearch title="Music By Genre" exploreItems={genre} gapFromTop={true} />
          </>
        )}
        <Footer/>
      </div>
    </>

  );
};

export default BrowsePage;