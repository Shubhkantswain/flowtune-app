import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, Play } from 'lucide-react';
import { Link, useLoaderData } from '@remix-run/react';
import { Playlist, Track } from 'gql/graphql';
import { createGraphqlClient } from '~/clients/api';
import { LoaderFunctionArgs, redirect } from '@remix-run/cloudflare';
import { getCurrentUserPlaylistsQuery } from '~/graphql/queries/playlist';
import Header from './_component/Header';
import PlaylistItems from './_component/PlaylistItems';
import ScrollControls from './_component/ScrollControls';
import { useGetRecentTracks } from '~/hooks/track';
import usePlaylistStore from '~/store/usePlaylistStore';
import { useTrackStore } from '~/store/useTrackStore';

export async function loader({ request }: LoaderFunctionArgs) {
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

    if (!token) {
      return redirect("/ft/signin")
    }

    const graphqlClient = createGraphqlClient(token);
    const { getCurrentUserPlaylists } = await graphqlClient.request(getCurrentUserPlaylistsQuery);

    return getCurrentUserPlaylists; // Expecting an array of `Track`
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return []; // Return an empty array to match the expected type
  }
}

const MusicApp = () => {
  const playlists = useLoaderData<Playlist[]>(); // Properly typed loader data
  const { trackDetails, setTrackDetails } = useTrackStore()
  const [initialized, setInitialized] = useState(false)

  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Playlists', 'Likes', 'Podcast'];


  const scrollContainerRef = useRef(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });

  const checkScrollability = (): void => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current as HTMLDivElement;
      const hasHorizontalScroll: boolean = container.scrollWidth > container.clientWidth;
      const atStart: boolean = container.scrollLeft <= 0;
      const atEnd: boolean = container.scrollLeft + container.clientWidth >= container.scrollWidth - 5;

      setCanScroll({
        left: hasHorizontalScroll && !atStart,
        right: hasHorizontalScroll && !atEnd,
      });
    }
  };


  const scroll = (direction: 'left' | 'right'): void => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current as HTMLDivElement;
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });

      // Update scroll buttons after scrolling
      setTimeout(checkScrollability, 300);
    }
  };

  const handleScroll = () => {
    checkScrollability();
  };

  const [recentTracks, setRecentTracks] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tracks = JSON.parse(localStorage.getItem("recentTracks") || "[]");
      setRecentTracks(tracks);
    }
  }, []);

  const { data } = useGetRecentTracks(recentTracks);

  // Ensure fetched tracks are sorted in the order they appear in `recentTracks`
  const [sortedTracks, setSortedTracks] = useState<Track[]>([])

  const tracks = data
    ? [...data].sort((a, b) => recentTracks.indexOf(a.id) - recentTracks.indexOf(b.id))
    : []

  useEffect(() => {
    if (trackDetails?.id) {
      const storedTracks: (string)[] = JSON.parse(localStorage.getItem("recentTracks") || "[]");

      // Ensure it's an array and keep only last 3 unique track IDs
      const updatedTracks = [
        trackDetails.id,
        ...storedTracks.filter((id: string) => id !== trackDetails.id)
      ].slice(0, 3);

      setSortedTracks(data
        ? [...data].sort((a, b) => updatedTracks.indexOf(a.id) - updatedTracks.indexOf(b.id))
        : [])
    }
  }, [trackDetails])

  useEffect(() => {
    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    return () => window.removeEventListener('resize', checkScrollability);
  }, [activeTab]);


  const { initialize } = usePlaylistStore()

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

  return (
    <div className="text-white min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Header activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

        <div className="mb-6">
          {/* Scroll Controls */}
          <ScrollControls canScroll={canScroll} scroll={scroll} />

          {/* Scrollable Container for playlists - combined for both mobile and desktop */}
          <PlaylistItems playlists={playlists || []} handleScroll={handleScroll} scrollContainerRef={scrollContainerRef} activeTab={activeTab} />
        </div>
      </div>

      <div className="w-full md:w-1/2 md:mr-auto md:ml-0 mx-auto">
        <h2 className="text-xl font-bold mb-4">Recently Play</h2>
        <div className="space-y-4">
          {(sortedTracks.length ? sortedTracks : tracks).map((track) => (
            <div
              key={track.id}
              className="flex items-center p-2 hover:bg-white/15 hover:backdrop-filter hover:backdrop-blur-sm justify-between rounded-lg cursor-pointer"
              onClick={() => handleClick(trackDetails.isPlaying && trackDetails.id == track.id, track)}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={track.coverImageUrl || ""}
                  alt={track.title}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div>
                  <p className="font-semibold">{track.title}</p>
                  <p className="text-neutral-400 text-sm">{track.singer}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button>
                  <Plus size={24} className="text-neutral-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* CSS for hiding scrollbar */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default MusicApp;