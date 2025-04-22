import React, { useEffect, useState } from 'react';
import { genre, MoodsAndActivities } from '~/data';
import ExploreSearch from './_components/ExploreSearch';
import SearchBar from './_components/SearchBar';
import { playlistSearchData, searchData } from '~/searchData';
import useSearchStore from '~/store/useSearchStore';
import { redirect, useLoaderData, useNavigate } from '@remix-run/react';
import { useCurrentUser } from '~/hooks/auth';
import { useActiveTabStore } from '~/store/useActiveTabStore';
import { useSearchHistoryStore } from '~/store/useSearchHistoryStore';
import { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { createGraphqlClient } from '~/clients/api';
import { getLikedTracksQuery } from '~/graphql/queries/track';

interface Song {
  title: string;
  coverImageUrl: string;
}

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const cookieHeader = request.headers.get("Cookie");

    // Parse the cookie manually
    const cookies = Object.fromEntries(
      (cookieHeader || "")
        .split("; ")
        .map((c) => c.split("="))
        .map(([key, ...value]) => [key, value.join("=")])
    );

    // Extract the `__FlowTune_Token_server` cookie
    const token = cookies["__FlowTune_Token_server"];

    return token ? true : false

  } catch (error) {
    console.error("Error fetching tracks:", error);
    return []; // Return an empty array to match the expected type
  }
}


type searchKey = keyof typeof searchData;

const BrowsePage = () => {
  const isAuthenticated = useLoaderData()
  const { searchQuery, setSearchQuery, setSearchResults } = useSearchStore();
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

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("__FlowTune_Token", "")
    }
  }, [isAuthenticated])

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
    <>
      {/* Search bar - only visible on small screens */}
      <div className='block md:hidden p-4 sm:p-6 md:p-8 -mb-10'>
        <SearchBar />
      </div>

      <div className="min-h-screen p-4 sm:p-6 md:p-8 text-white">
        {/* Only show search history if there's no search query */}
        {!searchQuery.trim() && history.length > 0 && (
          <div className="mb-10 text-white rounded-xl max-w-md">
            <h1 className="text-lg font-bold mb-4">Search History</h1>
            <div className="flex flex-wrap gap-2">
              <button
                className="bg-[#292a2a] hover:bg-[#5D5E5E] rounded-full px-4 py-1.5 text-[0.95rem]"
                onClick={() => {
                  setHistory([])
                  localStorage.setItem("searchHistory", JSON.stringify([]))
                }}
              >
                ✕
              </button>
              {history.map((item, index) => (
                <button
                  key={index}
                  className="bg-[#292a2a] hover:bg-[#5D5E5E] rounded-full px-4 py-1.5 text-[0.95rem]"
                  onClick={() => {
                    const currentData = item
                    const data = history.filter((item) => item != currentData)
                    setHistory([currentData, ...data])
                    localStorage.setItem("searchHistory", JSON.stringify([currentData, ...data]))
                    navigate(`/search-results/${activeTab.toLowerCase()}/${item}`)
                  }}


                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Display search results */}
        {searchQuery.trim() ? (
          <>
            <h1 className="text-lg font-bold mb-4">Suggestions</h1>
            <div className="flex space-x-2 overflow-x-auto mb-4 no-scrollbar">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors duration-200 ${activeTab === tab ? 'text-white border bg-[#5D5E5E] border-white'
                    : 'bg-[#292a2a] hover:bg-[#5D5E5E] text-gray-300'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {suggestionResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {suggestionResults.map((song, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg bg-[#1a1a1a] hover:bg-[#2A2A2A] transition duration-200 cursor-pointer shadow-sm"
                    onClick={() => {
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
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 rounded-sm object-cover"
                    />
                    <div>
                      <p className="text-xs uppercase text-[#25d1da] font-semibold mb-1">Track</p>
                      <h3 className="text-white text-sm font-medium leading-tight hover:text-[#25d1da]">
                        {song.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 mt-4 text-sm">No results found.</p>
            )}
          </>
        ) : (
          /* Only show Moods & Activities and Music By Genre when there's no search query */
          <>
            <ExploreSearch title="Moods & Activities" exploreItems={MoodsAndActivities} />
            <ExploreSearch title="Music By Genre" exploreItems={genre} gapFromTop={true} />
          </>
        )}
      </div>
    </>

  );
};

export default BrowsePage;