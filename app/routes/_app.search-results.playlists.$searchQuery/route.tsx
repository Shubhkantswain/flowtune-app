import React, { useEffect, useState } from 'react';
import { useLoaderData, useLocation, useNavigate, useParams } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { Playlist, Track } from 'gql/graphql';
import { createGraphqlClient } from '~/clients/api';
import { getSearchTracksQuery } from '~/graphql/queries/track';
import { useGetSearchTracks } from '~/hooks/track';
import usePlaylistStore from '~/store/usePlaylistStore';
import useSearchStore from '~/store/useSearchStore';
import { useTrackStore } from '~/store/useTrackStore';
import SearchBar from '../_app.search/_components/SearchBar';
import { useGetSearchPlaylists } from '~/hooks/playlist';
import { getSearchPlaylistsQuery } from '~/graphql/queries/playlist';
import { LoadingSpinnerIcon } from '~/Svgs';

// type Track {
//   id: ID!    

//   title: String!            
//   singer: String          
//   starCast: String
//   duration: String!             

//   coverImageUrl: String      
//   videoUrl: String
//   audioFileUrl: String!  

//   hasLiked: Boolean!
//   authorId: String!
// }

export async function loader({ request, params }: LoaderFunctionArgs) {
    try {
        const cookieHeader = request.headers.get("Cookie") || "";
        const cookies = Object.fromEntries(cookieHeader.split("; ").map(c => {
            const [key, ...val] = c.split("=");
            return [key, val.join("=")];
        }));

        const token = cookies["__FlowTune_Token_server"];
        const client = createGraphqlClient(token);
        const { getSearchPlaylists } = await client.request(getSearchPlaylistsQuery, { input: { page: 1, query: params.searchQuery || "" }, });

        return getSearchPlaylists || [];
    } catch (error) {
        console.error("Error fetching tracks:", error);
        return [];
    }
}

function SearchResultsRoute() {
    const initialTracks = useLoaderData<Playlist[]>();
    const params = useParams();

    const { trackDetails, setTrackDetails } = useTrackStore();
    const {
        searchQuery,
        setSearchQuery,
    } = useSearchStore();

    const [page, setPage] = useState(1)
    const [searchResults, setSearchResults] = useState<Playlist[]>([])
    const [initialized, setInitialized] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [activeTab, setActiveTab] = useState("Tracks");

    const { data, isLoading } = useGetSearchPlaylists({ page, query: searchQuery }, true);

    const location = useLocation()
    // Set query from URL on mount
    useEffect(() => {
        setSearchQuery(params.searchQuery || "");  //queue
    }, []);

    // Handle fetched data
    useEffect(() => {
        if (!data) return;

        const isFirstPage = page === 1;
        const newResults = isFirstPage
            ? [...data]
            : searchResults.length > 0 ? [...searchResults, ...data] : [...initialTracks, ...data];

        setSearchResults(newResults);

        setHasMore(data.length >= 15);

        if (searchQuery && data.length === 0 && !isLoading) {
            setHasMore(false);
        }
    }, [data, page]);

    useEffect(() => {
        setSearchResults([])
    }, [])

    const displayedPlaylists = searchResults.length ? searchResults : initialTracks;

    const navigate = useNavigate()

    return (
        <>
            <div className="p-4 sm:p-6 md:p-8 -mt-4 lg:-mt-12 md:-mt-12">
                {displayedPlaylists.map(playlist => (
                    <div
                        key={playlist.id}
                        className="flex items-center hover:bg-[#29292A] p-3 cursor-pointer"
                        onClick={() => navigate(`/playlist/${playlist.id}`)}
                    >
                        <div className="flex-grow flex items-center space-x-4">
                            <img
                                src={playlist.coverImageUrl || ""}
                                alt={playlist.name}
                                className="w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 rounded-sm object-cover"
                            />
                            <div>
                                <div className="text-white">{playlist.name}</div>
                                <div className="text-[#b3b3b3] text-sm">Total Tracks : {playlist.totalTracks}</div>
                            </div>
                        </div>
                    </div>
                ))}

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
