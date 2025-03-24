import React, { useEffect, useState } from 'react';
import { genre, MoodsAndActivities } from '~/data';
import ExploreSearch from './_components/ExploreSearch';
import SearchBar from './_components/SearchBar';
import { searchData } from '~/searchData';
import useSearchStore from '~/store/useSearchStore';

const BrowsePage = () => {
  const { searchQuery, setSearchQuery } = useSearchStore();
  const [searchResults, setSearchResults] = useState<string[]>([]);

  useEffect(() => {
    if (searchQuery) {
      const firstLetter = searchQuery[0].toLowerCase(); // Extract first letter
      const filteredSongs: string[] = searchData[firstLetter] || []; // Get songs for that letter

      // Filter songs containing searchQuery
      const results = filteredSongs.filter((song) =>
        song.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSearchResults(results);
    } else {
      setSearchResults([]); // Clear results when searchQuery is empty
    }
  }, [searchQuery]);

  console.log(searchResults);

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 text-white">
      {/* Search bar - only visible on small screens */}
      <SearchBar/>

      {/* Display search results */}
      {searchQuery && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4">Search Results</h2>
          {searchResults.length > 0 ? (
            <>
              {searchResults.map((song, index) => (
                <div key={index} className="flex mb-2">
                  <div className="py-2 px-0 cursor-pointer rounded">
                    {song}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="text-gray-400">No results found.</p>
          )}
        </div>
      )}

      {
        !searchQuery && (
          <>
            {/* Moods & Activities */}
            <ExploreSearch title="Moods & Activities" exploreItems={MoodsAndActivities} />

            {/* Music By Genre */}
            <ExploreSearch title="Music By Genre" exploreItems={genre} gapFromTop={true} />
          </>
        )
      }
    </div>
  );
};

export default BrowsePage;