import React, { useEffect, useState } from 'react';
import { useLoaderData, useLocation, useNavigate, useParams } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { SearchUserResponse, Track, User } from 'gql/graphql';
import { createGraphqlClient } from '~/clients/api';
import { getSearchTracksQuery } from '~/graphql/queries/track';
import { useGetSearchTracks } from '~/hooks/track';
import usePlaylistStore from '~/store/usePlaylistStore';
import useSearchStore from '~/store/useSearchStore';
import { useTrackStore } from '~/store/useTrackStore';
import SearchBar from '../_app.search/_components/SearchBar';
import { MoreHorizontal } from 'lucide-react';
import { getSearchUserQuery } from '~/graphql/queries/user';
import { useGetSearchUsers } from '~/hooks/user';
import { LoadingSpinnerIcon } from '~/Svgs';

// ─────────────────────────────
// LOADER FUNCTION
// ─────────────────────────────
export async function loader({ request, params }: LoaderFunctionArgs) {
  try {
    const cookieHeader = request.headers.get("Cookie") || "";
    const cookies = Object.fromEntries(cookieHeader.split("; ").map(c => {
      const [key, ...val] = c.split("=");
      return [key, val.join("=")];
    }));

    const token = cookies["__FlowTune_Token_server"];
    const client = createGraphqlClient(token);
    const { getSearchUser } = await client.request(getSearchUserQuery, {
      input: { page: 1, query: params.searchQuery || "" },
    });

    return getSearchUser || [];
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return [];
  }
}

// ─────────────────────────────
// COMPONENT
// ─────────────────────────────
function SearchResultsRoute() {
  const initialUsers = useLoaderData<SearchUserResponse[]>();
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate()

  console.log("initiaalusers", initialUsers);


  const { trackDetails, setTrackDetails } = useTrackStore();
  const { initialize } = usePlaylistStore();
  const { searchQuery, setSearchQuery } = useSearchStore();

  const [page, setPage] = useState(1);
  const [searchResults, setSearchResults] = useState<SearchUserResponse[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const { data, isLoading } = useGetSearchUsers({ page, query: searchQuery }, true);

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
    setHasMore(data.length >= 15);

    if (searchQuery && data.length === 0 && !isLoading) {
      setHasMore(false);
    }
  }, [data, page]);

  const displayedUsers = searchResults.length ? searchResults : initialUsers;

  return (
    <>
      {/* Track Results */}
      <div className="p-4 sm:p-6 md:p-8 -mt-4 lg:-mt-12 md:-mt-12">
        {displayedUsers.map(user => (
          <div
            key={user.id}
            className="flex items-center justify-between rounded-sm hover:bg-[#29292A] p-3 cursor-pointer"
            onClick={() => navigate(`/show/${user.id}`)}
          >
            <div className="flex-grow flex items-center space-x-4">
              <img
                src={user.profileImageURL || "https://www.shutterstock.com/image-vector/male-default-avatar-profile-icon-600nw-1725062341.jpg"}
                alt={user.username}
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 rounded-sm object-cover"
              />
              <div>
                <div className="text-white">{user.username}</div>
                {/* <div className="text-[#b3b3b3] text-sm">{track.singer}</div> */}
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
