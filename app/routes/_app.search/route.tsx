import React, { useEffect, useState } from 'react';
import { genre, MoodsAndActivities } from '~/data';
import ExploreSearch from './_components/ExploreSearch';
import SearchBar from './_components/SearchBar';
import { searchData } from '~/searchData';
import useSearchStore from '~/store/useSearchStore';
import { useNavigate } from '@remix-run/react';

interface Song {
  title: string;
  coverImageUrl: string;
}

type searchKey = keyof typeof searchData;

const BrowsePage = () => {
  const { searchQuery, setSearchQuery, setPage, setSearchResults } = useSearchStore();
  const [suggestionResults, setSuggestionResults] = useState<Song[]>([]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const firstLetter = searchQuery[0].toLowerCase(); // Extract first letter
      const filteredSongs: Song[] = searchData[firstLetter as searchKey] || []; // Get songs for that letter

      // Filter songs containing searchQuery
      const results = filteredSongs.filter((song) =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSuggestionResults(results);
    } else {
      setSuggestionResults([]); // Clear results when searchQuery is empty
    }
  }, [searchQuery]);

  const navigate = useNavigate()

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 text-white">
      {/* Search bar - only visible on small screens */}
      <SearchBar />

      {/* Display search results */}
      {searchQuery.trim() && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4">Suggestions</h2>
          {suggestionResults.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
              {suggestionResults.map((song, index) => (
                <div key={index} className="flex items-center mb-4 gap-3 cursor-pointer p-2 hover:bg-[#222222]"
                  onClick={() => {
                    setPage(1)
                    // setSearchResults([])
                    navigate(`/search-results/${song.title}`)

                  }}
                >
                  <img
                    src={song.coverImageUrl}
                    alt={song.title}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div className="py-2 px-0 rounded">
                    <p className="font-bold text-[#fa586a]">Song</p>
                    <h2 className='hover:text-[#fa586a]'>
                      {song.title}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No results found.</p>
          )}
        </div>
      )}

      {!searchQuery.trim() && (
        <>
          {/* Moods & Activities */}
          <ExploreSearch title="Moods & Activities" exploreItems={MoodsAndActivities} />

          {/* Music By Genre */}
          <ExploreSearch title="Music By Genre" exploreItems={genre} gapFromTop={true} />
        </>
      )}
    </div>
  );
};

export default BrowsePage;