import React, { useState } from 'react';
import { genre, MoodsAndActivities } from '~/data';
import ExploreSearch from './_components/ExploreSearch';
import SearchBar from './_components/SearchBar';

const BrowsePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 text-white">
      {/* Search bar - only visible on small screens */}
      <SearchBar/>
      
      <ExploreSearch title='Moods & Activities' exploreItems={MoodsAndActivities}/>
      
      <ExploreSearch title='Music By Genre' exploreItems={genre} gapFromTop={true}/>
    </div>
  );
};

export default BrowsePage;