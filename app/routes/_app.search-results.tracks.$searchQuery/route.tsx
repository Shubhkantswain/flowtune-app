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
  const location = useLocation();
  const navigate = useNavigate()

  const { trackDetails, setTrackDetails } = useTrackStore();
  const { initialize } = usePlaylistStore();
  const { searchQuery, setSearchQuery, page, setPage } = useSearchStore();

  // const [page, setPage] = useState(1);
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const { data, isLoading } = useGetSearchTracks({ page, query: searchQuery }, true);
 
  // Set search query from URL param on mount or when it changes
  useEffect(() => {
    setSearchQuery(params.searchQuery || "");
  }, [params.searchQuery]);

  // Handle newly fetched data
  useEffect(() => {
    if (!data) return;

    const isFirstPage = page === 1;
    const newResults = isFirstPage
      ? [...data]
      : [...searchResults, ...data];

    setSearchResults(newResults);
    setHasMore(data.length >= 4);

    if (searchQuery && data.length === 0 && !isLoading) {
      setHasMore(false);
    }
  }, [data, page]);

  const handleTrackClick = (isPlayingCurrent: boolean, track: Track) => {
    if (isPlayingCurrent && initialized) {
      setTrackDetails({ isPlaying: false });
    } else {
      if (!initialized) initialize([]);

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

  return (
    <>
      {/* Track Results */}
      <div className="p-4 sm:p-6 md:p-8 -mt-4 lg:-mt-12 md:-mt-12">
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
            onClick={() => {
              setPage(page + 1);
              if (!searchQuery) setSearchQuery(params.searchQuery || "");
            }}
            aria-label="Load more tracks"
            className="mx-auto block px-4 py-2 mt-5 bg-white text-gray-800 text-sm font-medium rounded-full border border-gray-200 hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow transition-all duration-200 w-fit"
            disabled={isLoading}
          >
            {isLoading && page !== 1 ? (
              <span className="flex items-center justify-center gap-1.5">
                <svg className="animate-spin h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
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
