import React from 'react';
import { artistsData, Artist } from '~/data';
import { useCurrentUser } from '~/hooks/auth';

function ArtistGrid() {
  const { data } = useCurrentUser();
  const lang = data?.language;

  // Get artists safely. If lang not found, fallback to empty array.
  const artists: Artist[] = artistsData[lang ?? ""] ?? [];

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h2 className="text-white text-3xl font-bold mb-8">Popular artists</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {artists.map((artist, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden bg-gray-800">
              <img
                src={artist.coverImageUrl}
                alt={artist.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-white text-lg font-semibold mt-4">{artist.name}</h3>
            {/* role is optional */}
            {artist.role && <p className="text-gray-400 text-sm">{artist.role}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArtistGrid;
