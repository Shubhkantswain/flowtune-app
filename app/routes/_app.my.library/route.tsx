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
import { Skeleton } from '~/components/ui/skeleton';
import AddToPlaylistDialog from '~/components/AddToPlaylistDialog';
import AddToNewPlaylistDialog from '~/components/AddToNewPlaylistDialog';

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

  const { data, isLoading } = useGetRecentTracks(recentTracks);

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

  const [isAddToPlaylistOpen, setAddToPlaylistOpen] = useState(false);
  const [isNewPlaylistDialogOpen, setNewPlaylistDialogOpen] = useState(false);

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

        {isLoading ? (
          <div className="space-y-4">

            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center p-2 bg-[#1A1A1A] rounded-lg gap-4"
              >
                <div className="w-16 h-16 bg-[#333333] rounded-md" />
                <div className="flex flex-col space-y-2">
                  <div className="w-32 h-4 bg-[#333333] rounded-md" />
                  <div className="w-24 h-3 bg-[#333333] rounded-md" />
                </div>
                <div className="ml-auto w-6 h-6 bg-[#333333] rounded-md" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {(sortedTracks.length ? sortedTracks : tracks).map((track) => (
              <div
                key={track.id}
                className="flex items-center p-2 hover:bg-white/15 hover:backdrop-filter hover:backdrop-blur-sm justify-between rounded-lg cursor-pointer"
                onClick={() =>
                  handleClick(trackDetails.isPlaying && trackDetails.id === track.id, track)
                }
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={track.coverImageUrl || ""}
                    alt={track.title}
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 rounded object-cover"
                  />
                  <div>
                    <p className="font-medium">{track.title}</p>
                    <p className="text-neutral-400 text-sm">{track.singer}</p>
                  </div>
                </div>
                <div className="relative group flex items-center space-x-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    setAddToPlaylistOpen(true)
                  }}
                >
                  <div className="absolute -top-10 left-0 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                    Add To Playlist
                  </div>

                  <button className='text-gray-400 hover:text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><defs><path id="ic_action_add-a" d="M21,11 L13,11 L13,3 C13,2.448 12.552,2 12,2 C11.448,2 11,2.448 11,3 L11,11 L3,11 C2.448,11 2,11.448 2,12 C2,12.552 2.448,13 3,13 L11,13 L11,21 C11,21.553 11.448,22 12,22 C12.552,22 13,21.553 13,21 L13,13 L21,13 C21.552,13 22,12.552 22,12 C22,11.448 21.552,11 21,11 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use href="#ic_action_add-a" fill="currentColor"></use></g></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <AddToPlaylistDialog isOpen={isAddToPlaylistOpen} setIsOpen={setAddToPlaylistOpen} setNewPlaylistDialogOpen={setNewPlaylistDialogOpen} />
        <AddToNewPlaylistDialog isOpen={isNewPlaylistDialogOpen} setIsOpen={setNewPlaylistDialogOpen} trackId={trackDetails.id} />

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