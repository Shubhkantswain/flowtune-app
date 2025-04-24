import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, Play } from 'lucide-react';
import { Link, useLoaderData, useNavigate } from '@remix-run/react';
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
import { useGetCurrentUserPlaylists } from '~/hooks/playlist';
import { useLikedTrackStore } from '~/store/useLikedTrackStore';
import { useCurrentUser } from '~/hooks/auth';
import { LoadingSpinnerIcon, PlusIcon } from '~/Svgs';

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
    const { getCurrentUserPlaylists } = await graphqlClient.request(getCurrentUserPlaylistsQuery, { input: { page: 1, limit: 16 } });

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

  const { data: user, isLoading: isFetchingUser } = useCurrentUser()

  const { likedTracks, setLikedTracks } = useLikedTrackStore()

  const [recentTracks, setRecentTracks] = useState<string[]>([]);

  const navigate = useNavigate()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tracks = JSON.parse(localStorage.getItem("recentTracks") || "[]");
      setRecentTracks(tracks);
    }
  }, []);

  const { data, isLoading } = useGetRecentTracks(recentTracks);

  // Ensure fetched tracks are sorted in the order they appear in `recentTracks`
  const [sortedTracks, setSortedTracks] = useState<Track[]>([])

  const [trackId, setTrackId] = useState("")

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

  const [playlistSections, setPlaylistSections] = useState<Playlist[][]>([])
  const [isAddToPlaylistOpen, setAddToPlaylistOpen] = useState(false);
  const [isNewPlaylistDialogOpen, setNewPlaylistDialogOpen] = useState(false);
  const [page, setPage] = useState(1)
  const { data: userPlaylists, isLoading: isFetchingCurrentUserPlaylists } = useGetCurrentUserPlaylists({ page, limit: 16 }, page != 1)

  useEffect(() => {
    if (userPlaylists && userPlaylists.length > 0) {
      if (page == 2) {
        setPlaylistSections([playlists, userPlaylists])
      } else {
        setPlaylistSections((prev) => [...prev, userPlaylists])
      }
    }
  }, [userPlaylists])

  useEffect(() => {
    const newTracks = data?.filter((item) => item.hasLiked) || [];

    setLikedTracks(newTracks);
  }, [data]);

  return (
    <div className="text-white min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Header activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

        <div className="mb-6">
          {/* Scroll Controls */}
          {/* Scrollable Container for playlists - combined for both mobile and desktop */}
          {
            playlistSections.length > 0 ? (
              playlistSections.map((section, index) => (
                <div className={`${index != 0 ? "mt-7" : "mt-0"}`}>
                  <PlaylistItems
                    playlists={section || []}
                    activeTab={activeTab}
                    shouldShowLikedPlaylist={index == 0}
                  />
                </div>
              ))
            ) : (
              < PlaylistItems playlists={playlists || []} activeTab={activeTab} shouldShowLikedPlaylist={true} />
            )
          }

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

        </div>
      </div>

      <div className="w-full md:w-1/2 md:mr-auto md:ml-0 mx-auto">
        <h2 className="text-xl font-bold mb-4">{(data?.length > 0) ? "Recently Play" : ""}</h2>

        {isLoading ? (
          <div className="space-y-4">

            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center p-2 bg-[#1A1A1A] rounded-lg gap-4 border border-[#2a2a2a]"
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
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 rounded-sm object-cover"
                  />
                  <div>
                    <p className="font-normal">{track.title}</p>
                    <p className="text-neutral-400 text-sm">{track.singer}</p>
                  </div>
                </div>
                <div className="relative group flex items-center space-x-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (isFetchingUser) return
                    if (!user?.isPro) {
                      return navigate("/pro-plan")
                    }
                    setAddToPlaylistOpen(true)
                    setTrackId(track.id)
                  }}
                >
                  <div className="absolute -top-10 left-0 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                    Add To Playlist
                  </div>

                  <button className='text-gray-400 hover:text-white'>
                    <PlusIcon width="20" height="20" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {
          isAddToPlaylistOpen && (
            <AddToPlaylistDialog isOpen={isAddToPlaylistOpen} setIsOpen={setAddToPlaylistOpen} setNewPlaylistDialogOpen={setNewPlaylistDialogOpen} trackId={trackId} />
          )
        }
        <AddToNewPlaylistDialog isOpen={isNewPlaylistDialogOpen} setIsOpen={setNewPlaylistDialogOpen} trackId={trackId} />

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