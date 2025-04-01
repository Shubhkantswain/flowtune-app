import { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { useLoaderData, useParams } from '@remix-run/react';
import { Track } from 'gql/graphql';
import React, { useEffect, useState } from 'react'
import { createGraphqlClient } from '~/clients/api';
import { getSearchTracksQuery } from '~/graphql/queries/track';
import { useGetSearchTracks } from '~/hooks/track';
import usePlaylistStore from '~/store/usePlaylistStore';
import useSearchStore from '~/store/useSearchStore';
import { useTrackStore } from '~/store/useTrackStore';

export async function loader({ request, params }: LoaderFunctionArgs): Promise<Track[]> {
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

    const graphqlClient = createGraphqlClient(token);
    const { getSearchTracks } = await graphqlClient.request(getSearchTracksQuery, { input: { page: 1, query: params.searchQuery || "" } });

    return getSearchTracks || []; // Expecting an array of `Track`
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return []; // Return an empty array to match the expected type
  }
}
   
function route() {
  const tracks = useLoaderData<Track[]>(); // Ensure type safety
  const { trackDetails, setTrackDetails } = useTrackStore()
  
  const [searchResults, setSearchResults] = useState<Track[]>([])
  const [initialized, setInitialized] = useState(false)
  const { page, setPage, searchQuery, setSearchQuery } = useSearchStore()
  const [results, setResults] = useState(true)

  const { initialize } = usePlaylistStore()
  const params = useParams()

  const { data, isLoading } = useGetSearchTracks({ page, query: searchQuery }, true)
  const [mount, setMount] = useState(false)

  console.log("page", page);
  
  useEffect(() => {
    if (data && data.length > 0) {
      setMount(true)
      if (page == 2) {
        if (!mount) {
          setSearchResults([...tracks, ...data])
        } else {
          setSearchResults((prev: Track[]) => {
            return [
              ...prev, ...data
            ]
          });
        }
      }
      if (page > 2) {
        setSearchResults((prev: Track[]) => {
          console.log("prev", prev);
          console.log("data", data);

          
          return [
            ...prev, ...data
          ]
        });
      }

      if (page == 1) {
        setSearchResults([...data])
        return
      }
    }

    if (data && !data.length && !isLoading && searchQuery) {
      setSearchResults([])
      setResults(false)
    }

  }, [data, page])

  console.log("results", searchResults);

  const handleClick = (isPlayingCurrentSong: boolean, track: Track) => {
    if (isPlayingCurrentSong && initialized) {
      setTrackDetails({ isPlaying: false });
    } else {
      if (!initialized) {
        initialize([])
      }
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
      setInitialized(true)
    }
  };

  const [activeTab, setActiveTab] = useState("Tracks")

  const tabs = [
    "Tracks", "Playlists", "Users", "Podcasts"
  ];

  return (
    <>

      <div className="flex space-x-2 p-4 sm:p-6 md:p-8 overflow-x-auto bg-black no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${activeTab === tab ? 'bg-white text-black'
              : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-4 sm:p-6 md:p-8 -mt-4  lg:-mt-12 md:-mt-12">
        {((searchResults.length || !results) ? searchResults : tracks).map((track, index) => (
          <div
            key={track.id}
            className="flex items-center hover:bg-[#282828] p-3 cursor-pointer"
            onClick={() =>
              handleClick(trackDetails.isPlaying && trackDetails.id === track.id, track)
            }
          >
            <div className="flex-grow flex items-center space-x-4">
              <img
                src={track.coverImageUrl || ""}
                alt={track.title}
                className="w-12 h-12 object-cover"
              />
              <div>
                <div className="text-white">{track.title}</div>
                <div className="text-[#b3b3b3] text-sm">{track.singer}</div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={() => {
            setPage(page + 1);
            if (!searchQuery) setSearchQuery(params.searchQuery || "");
          }}
          className="mt-4 px-4 py-2 bg-neutral-800 text-gray-300 rounded hover:bg-neutral-700"
        >
          Load More
        </button>
      </div>
    </>
  )
}

export default route