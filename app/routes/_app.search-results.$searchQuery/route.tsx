import { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { Track } from 'gql/graphql';
import React, { useEffect, useState } from 'react'
import { createGraphqlClient } from '~/clients/api';
import { getSearchTracksQuery } from '~/graphql/queries/track';
import usePlaylistStore from '~/store/usePlaylistStore';
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

    console.log("params.searchQuery", params.searchQuery);

    const graphqlClient = createGraphqlClient(token);
    const { getSearchTracks } = await graphqlClient.request(getSearchTracksQuery, { searchQuery: params.searchQuery || "" });

    return getSearchTracks || []; // Expecting an array of `Track`
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return []; // Return an empty array to match the expected type
  }
}

function route() {
  const tracks = useLoaderData<Track[]>(); // Ensure type safety
  const { trackDetails, setTrackDetails } = useTrackStore()

  const [initialized, setInitialized] = useState(false)

  const { initialize } = usePlaylistStore()

  const handleClick = (isPlayingCurrentSong: boolean, track: Track) => {
    if (isPlayingCurrentSong && initialized) {
      setTrackDetails({ isPlaying: false });
    } else {
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

  useEffect(() => {
    initialize([])
  }, [])

  return (
    <div className="p-2">
      {tracks.map((track, index) => (
        <div
          key={track.id}
          className="flex items-center hover:bg-[#282828] p-2 cursor-pointer"
          onClick={() => handleClick(trackDetails.isPlaying && trackDetails.id == track.id, track)}
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
    </div>
  )
}

export default route