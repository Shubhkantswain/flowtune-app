import React, { useEffect, useRef, useState } from 'react';
import { LoaderFunctionArgs, redirect } from '@remix-run/cloudflare';
import { Track } from 'gql/graphql';
import { createGraphqlClient } from '~/clients/api';
import { getLikedTracksQuery } from '~/graphql/queries/track';
import { useLoaderData } from '@remix-run/react';
import usePlaylistStore from '~/store/usePlaylistStore';
import { useTrackStore } from '~/store/useTrackStore';
import NoTracks from './_components/NoTracks';
import ListScreenTracks from './_components/ListScreenTracks';
import TrackCollectionsInfo from './_components/TrackCollectionsInfo';
import CompactScreenTracks from './_components/CompactScreenTracks';
import { useLikedTrackStore } from '~/store/useLikedTrackStore';

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const cookieHeader = request.headers.get("Cookie");
    const cookies = Object.fromEntries(
      (cookieHeader || "")
        .split("; ")
        .map((c) => c.split("="))
        .map(([key, ...value]) => [key, value.join("=")])
    );

    const token = cookies["__FlowTune_Token_server"];
    if (!token) return redirect("/ft/signin");

    const graphqlClient = createGraphqlClient(token);
    const { getLikedTracks } = await graphqlClient.request(getLikedTracksQuery);

    return getLikedTracks || [];
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return [];
  }
}

const LikedTracks = () => {
  const initialTracks = useLoaderData<Track[]>();
  const { initialize, setCurrentTrack, getCurrent, setActiveSectionIndex } = usePlaylistStore();
  const { setTrackDetails, trackDetails } = useTrackStore();
  const { likedTracks, setLikedTracks } = useLikedTrackStore();

  const [initialized, setInitialized] = useState(false);
  const [screenType, setScreenType] = useState("compact");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleScreenType = () => setScreenType(prev => (prev === "compact" ? "list" : "compact"));

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setActiveSectionIndex(-1);
  }, []);

  useEffect(() => {
    setLikedTracks(initialTracks);
  }, [initialTracks, setLikedTracks]);

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
        initialize(initialTracks);
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
        <TrackCollectionsInfo
          showDropdown={showDropdown}
          screenType={screenType}
          handlePlayTrack={handlePlayTrack}
          toggleScreenType={toggleScreenType}
          toggleDropdown={toggleDropdown}
          dropdownRef={dropdownRef}
          initialTrack={initialTracks[0]}
        />

        <div className="relative">
          {initialTracks.length === 0 ? (
            <NoTracks />
          ) : screenType === "compact" ? (
            <CompactScreenTracks
              likedTracks={likedTracks.length ? likedTracks : initialTracks}
              initialized={initialized}
              handlePlayTrack={handlePlayTrack}
            />
          ) : (
            <ListScreenTracks
              likedTracks={likedTracks.length ? likedTracks : initialTracks}
              initialized={initialized}
              handlePlayTrack={handlePlayTrack}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LikedTracks;
