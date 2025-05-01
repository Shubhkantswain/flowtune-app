import React, { useEffect, useState } from 'react';
import { useLoaderData, useLocation, useNavigate, useParams } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { Track } from 'gql/graphql';
import { createGraphqlClient } from '~/clients/api';
import { getSearchTracksQuery } from '~/graphql/queries/track';
import { useGetSearchTracks } from '~/hooks/track';
import usePlaylistStore from '~/store/usePlaylistStore';
import useSearchStore from '~/store/useSearchStore';
import { useTrackStore } from '~/store/useTrackStore';
import SearchBar from '../_app.search/_components/SearchBar';
import { MoreHorizontal } from 'lucide-react';
import { LoadingSpinnerIcon, SadIcon, SearchIcon } from '~/Svgs';
import { useLikedTracksStore } from '~/store/useLikedTracksStore';
import EmptyState from '~/components/EmptyState';

// ─────────────────────────────
// LOADER FUNCTION
// ─────────────────────────────
export async function loader({ request, params }: LoaderFunctionArgs): Promise<Track[]> {
  try {
    const cookieHeader = request.headers.get("Cookie") || "";
    const cookies = Object.fromEntries(cookieHeader.split("; ").map(c => {
      const [key, ...val] = c.split("=");
      return [key, val.join("=")];
    }));

    const token = cookies["__FlowTune_Token_server"];
    const client = createGraphqlClient(token);
    const { getSearchTracks } = await client.request(getSearchTracksQuery, {
      input: { page: 1, query: params.searchQuery || "" },
    });

    return getSearchTracks || [];
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return [];
  }
}

// ─────────────────────────────
// COMPONENT
// ─────────────────────────────
function SearchResultsRoute() {
  const initialTracks = useLoaderData<Track[]>();
  const params = useParams();

  const { trackDetails, setTrackDetails } = useTrackStore();
  const { initializePlaylist } = usePlaylistStore();
  const { searchQuery, setSearchQuery } = useSearchStore();

  const { likedTrackMap, setLikedTrackIds } = useLikedTracksStore()

  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1)

  const { data, isLoading } = useGetSearchTracks({ page, query: searchQuery }, page != 1);

  // Set search query from URL param on mount or when it changes
  useEffect(() => {
    setSearchQuery(params.searchQuery || "");
  }, [params.searchQuery]);

  // Handle newly fetched data
  useEffect(() => {
    if (data?.length) {
      setSearchResults(prev => {
        const newTracks = data

        // If page is 2, include both the initial trackSections and new data
        if (page === 2) {
          return [...initialTracks, ...newTracks];
        }

        // For other pages, just append new sections
        return [...prev, ...newTracks];
      });

    }
    if (data) {
      if (page == 1) {
        setHasMore(initialTracks.length >= 5)
      } else {
        setHasMore(data?.length >= 5)
      }
    }
  }, [data, page]);

  const handleTrackClick = (isPlayingCurrent: boolean, track: Track) => {
    if (isPlayingCurrent && initialized) {
      setTrackDetails({ isPlaying: false });
    } else {
      if (!initialized) initializePlaylist([]);

      setTrackDetails({
        id: track.id,
        title: track.title,
        singer: track.singer,
        starCast: track.starCast,
        duration: track.duration,
        coverImageUrl: track.coverImageUrl || "",
        videoUrl: track.videoUrl,
        audioFileUrl: track.audioFileUrl,
        hasLiked: track.hasLiked,
        authorId: track.authorId,
        isPlaying: true,
      });

      setInitialized(true);
    }
  };

  const displayedTracks = searchResults.length ? searchResults : initialTracks;

  if (!initialTracks.length) {
    return (
      <EmptyState
        icon={
          <SearchIcon width="60" height="60" />
        }
        title='No Results Found'
        message='Try a different search term or check your spelling.'
      />
    )
  }


  return (
    <>
      {/* Track Results */}
      <div className="max-w-[90rem] mx-auto p-4 sm:p-6 md:p-8 -mt-4 lg:-mt-12 md:-mt-12">
        {displayedTracks.map(track => (
          <div
            key={track.id}
            className="flex items-center justify-between hover:bg-[#29292A] p-3 cursor-pointer"
            onClick={() => handleTrackClick(trackDetails.isPlaying && trackDetails.id === track.id, track)}
          >
            <div className="flex-grow flex items-center space-x-4">
              <img
                src={track.coverImageUrl || ""}
                alt={track.title}
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 rounded-sm object-cover"
              />
              <div>
                <div className="text-white">{track.title}</div>
                <div className="text-[#b3b3b3] text-sm">{track.singer}</div>
              </div>
            </div>

            <button
              className="text-gray-400 hover:text-white rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation(); // prevent track click
                // handleMoreClick(track);
              }}
            >
              <MoreHorizontal size={20} />
            </button>
          </div>
        ))}

        {/* Load More Button */}
        {hasMore && (
          <button
            onClick={() => setPage(page + 1)}
            aria-label="Load more tracks"
            className="mx-auto block px-4 py-2 mt-5 text-white bg-[#292a2a] hover:bg-[#5D5E5E] text-sm font-medium rounded-full disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow transition-all duration-200 w-fit"
            disabled={isLoading}
          >
            {isLoading && page != 1 ? (
              <span className="flex items-center justify-center gap-1.5 text-white">
                <LoadingSpinnerIcon width="18" height="18" />
                Loading...
              </span>
            ) : (
              'Load More'
            )}
          </button>
        )}
      </div>
    </>
  );
}

export default SearchResultsRoute;
