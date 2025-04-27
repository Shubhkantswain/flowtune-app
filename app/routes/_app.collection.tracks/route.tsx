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
import { useLikedTracksStore } from '~/store/useLikedTracksStore';
import { useGetLikedTracks, useLikeTrack } from '~/hooks/track';
import { LoadingSpinnerIcon } from '~/Svgs';

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
    const { getLikedTracks } = await graphqlClient.request(getLikedTracksQuery, { page: 1 });

    return getLikedTracks || [];
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return [];
  }
}

const LikedTracks = () => {
  const initialTracks = useLoaderData<Track[]>();
  const [likedTracks, setLikedTracks] = useState<Track[]>([])

  const { initializePlaylist, setCurrentlyPlayingTrack, setActiveSectionIndex } = usePlaylistStore();
  const { setTrackDetails, trackDetails } = useTrackStore();

  const [initialized, setInitialized] = useState(false);
  const [screenType, setScreenType] = useState("compact");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const { data, isLoading } = useGetLikedTracks(page)
  const {isTrackUnliked} = useLikedTracksStore()

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
    setLikedTracks(initialTracks)
  }, [])

  useEffect(() => {
    if (data?.length) {
      setLikedTracks(prev => {
        const newTracks = data.filter((track) => !isTrackUnliked(track.id))

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
        setHasMore(initialTracks.length >= 20)
      } else {
        setHasMore(data?.length >= 20)
      }
    }
  }, [data, page]);

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
        initializePlaylist(likedTracks);
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

      setCurrentlyPlayingTrack(track.id);
      setInitialized(true);
    }
  };

  return (
    <div className="max-w-[90rem] mx-auto">
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
              setLikedTracks={setLikedTracks}
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
    </div>
  );
};

export default LikedTracks;
