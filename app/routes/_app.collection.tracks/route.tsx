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
import { useLikeTrack } from '~/hooks/track';
import { LoadingSpinnerIcon, SadIcon } from '~/Svgs';
import EmptyState from '~/components/EmptyState';

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
  const [likedTracks, setLikedTracks] = useState<Track[]>([])

  const { initializePlaylist, setCurrentlyPlayingTrack, setActiveSectionIndex, currentlyPlayingNode, getAllPlaylistTracks, removeTrackFromPlaylist } = usePlaylistStore();
  const { setTrackDetails, trackDetails } = useTrackStore();

  const [initialized, setInitialized] = useState(false);
  const [screenType, setScreenType] = useState("compact");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const { isTrackUnliked, likedTracks: likedTracksData, unlikedTracks } = useLikedTracksStore()

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

  // To Reset the Current Active Index
  useEffect(() => {
    setActiveSectionIndex(-1);
  }, []);

  useEffect(() => {
    setLikedTracks(initialTracks)
  }, [])

  useEffect(() => {
    if (likedTracks.length) {
      setLikedTracks([...Object.values(likedTracksData), ...likedTracks])
      if (initialized) {
        initializePlaylist([...Object.values(likedTracksData), ...likedTracks]);
        setCurrentlyPlayingTrack(trackDetails.id);
      }
    }
  }, [likedTracksData])


  useEffect(() => {
    if (likedTracks.length) {
      let removedTrack: Track | null = null;
      const newArray: Track[] = [];

      for (const track of likedTracks) {
        if (isTrackUnliked(track.id)) {
          removedTrack = track;
          continue;
        }
        newArray.push(track);
      }

      if (removedTrack) {
        if (initialized) {
          removeTrackFromPlaylist(removedTrack.id);
          setCurrentlyPlayingTrack(trackDetails.id);
        }
        setLikedTracks(newArray);
      }
    }
  }, [unlikedTracks]);

  console.log("likedTracks", likedTracks);
  // console.log("unlikedTracks", unlikedTracks);



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
        initializePlaylist(likedTracks.length > 0 ? likedTracks : initialTracks);
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
    <div className="text-white relative max-w-[90rem] mx-auto">
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-0"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,1) 10%), url(${"https://res.cloudinary.com/daz21loyl/image/upload/v1746024685/oge5lchk6elcmrzpxtpo.jpg"})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          filter: 'blur(100px)',
          opacity: '0.9',
        }}
      />

      <div className="relative z-10">
        <div className="p-4 sm:p-6 md:p-8">

          <TrackCollectionsInfo initialTrack={likedTracks.length > 0 ? likedTracks[0] : initialTracks[0]} handlePlayTrack={handlePlayTrack} toggleScreenType={toggleScreenType} screenType={screenType} />

          {initialTracks.length == 0 ? (
            <EmptyState
              icon={<SadIcon width="60" height="60" />}
              title="No Liked Tracks Yet"
              message="Start exploring and like some tracks to see them here."
            />

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
      </div>
    </div>
  );
};

export default LikedTracks;


// <div className="max-w-[90rem] mx-auto">
// <div className="p-4 sm:p-6 md:p-8">
//   <TrackCollectionsInfo
//     showDropdown={showDropdown}
//     screenType={screenType}
//     handlePlayTrack={handlePlayTrack}
//     toggleScreenType={toggleScreenType}
//     toggleDropdown={toggleDropdown}
//     dropdownRef={dropdownRef}
//     initialTrack={initialTracks[0]}
//   />

//   <div className="relative">
//     {initialTracks.length === 0 ? (
//       <NoTracks />
//     ) : screenType === "compact" ? (
//       <CompactScreenTracks
//         likedTracks={likedTracks.length ? likedTracks : initialTracks}
//         setLikedTracks={setLikedTracks}
//         initialized={initialized}
//         handlePlayTrack={handlePlayTrack}
//       />
//     ) : (
//       <ListScreenTracks
//         likedTracks={likedTracks.length ? likedTracks : initialTracks}
//         initialized={initialized}
//         handlePlayTrack={handlePlayTrack}
//       />
//     )}
//   </div>


// </div>
// </div>