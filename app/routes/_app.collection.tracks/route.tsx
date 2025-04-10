import React, { useEffect, useRef, useState } from 'react';
import { Heart, MoreHorizontal, Share2, List, Grid } from 'lucide-react';
import { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { Track } from 'gql/graphql';
import { createGraphqlClient } from '~/clients/api';
import { getLikedTracksQuery } from '~/graphql/queries/track';
import { useLoaderData } from '@remix-run/react';
import usePlaylistStore from '~/store/usePlaylistStore';
import { useTrackStore } from '~/store/useTrackStore';
import { formatDuration } from '~/utils';
import CollectionInfo from './_components/collectionInfo';
import NoTracks from './_components/NoTracks';
import CompactScreenTracks from './_components/CompactScreenTracks';
import ListScreenTracks from './_components/ListScreenTracks';

export async function loader({ request }: LoaderFunctionArgs): Promise<Track[]> {
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
    const { getLikedTracks } = await graphqlClient.request(getLikedTracksQuery);

    return getLikedTracks || []; // Expecting an array of `Track`
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return []; // Return an empty array to match the expected type
  }
}

const LikedTracks = () => {
  const tracks = useLoaderData<Track[]>(); // Properly typed loader data
  const { initialize, setCurrentTrack, getCurrent, setActiveSectionIndex } = usePlaylistStore();
  const { setTrackDetails, trackDetails } = useTrackStore();
  const [initialized, setInitialized] = useState(false);

  const [screenType, setScreenType] = useState<string>("compact");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleScreenType = () => {
    setScreenType(screenType === "compact" ? "list" : "compact");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setActiveSectionIndex(-1);
  }, []);

  const handlePlayTrack = (track: Track) => {
    const isPlayingCurrentSong = track?.id === trackDetails.id && trackDetails.isPlaying;

    if (isPlayingCurrentSong && initialized) {
      setTrackDetails({ isPlaying: false });
      return;
    } else if (track?.id === trackDetails.id && !trackDetails.isPlaying && initialized) {
      setTrackDetails({ isPlaying: true });
      return;
    } else {
      if (!initialized) {
        initialize(tracks);
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

      setCurrentTrack(track.id);
      setInitialized(true);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="p-4 sm:p-6 md:p-8">
        {/* Header Section */}
        <CollectionInfo showDropdown={showDropdown} screenType={screenType} handlePlayTrack={handlePlayTrack} toggleScreenType={toggleScreenType} toggleDropdown={toggleDropdown} dropdownRef={dropdownRef} initialTrack={tracks[0]} />

        {/* Tracks Table - Responsive to screenType */}
        <div className="relative">
          {tracks.length === 0 ? (
            <NoTracks />
          ) : screenType === "compact" ? (
            // Compact View - Original design with album art
            <CompactScreenTracks tracks={tracks} initialized={initialized} handlePlayTrack={handlePlayTrack} />
          ) : (
            // List View - Table-like layout with consistent font sizes
            <ListScreenTracks tracks={tracks} initialized={initialized} handlePlayTrack={handlePlayTrack}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default LikedTracks;