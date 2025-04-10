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
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start mb-8">
          {/* Playlist Cover with Gradient Heart */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shrink-0">
            {/* Gradient background with blur */}
            <div className="absolute inset-0">
              <div className="absolute -inset-4 bg-gradient-to-br from-purple-600 to-cyan-400 opacity-50 blur-2xl" />
            </div>

            {/* Heart icon with its own gradient */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <Heart className="w-24 h-24 md:w-32 md:h-32 text-cyan-400" fill="currentColor" />
                <div className="absolute inset-0 blur-md">
                  <Heart className="w-24 h-24 md:w-32 md:h-32 text-purple-500" fill="currentColor" />
                </div>
              </div>
            </div>
          </div>

          {/* Playlist Info */}
          <div className="flex flex-col gap-4 items-center md:items-start">
            <span className="text-cyan-400 text-sm font-medium uppercase tracking-wide">Playlist</span>
            <h1 className="text-white text-4xl md:text-6xl font-bold text-center md:text-left">My Likes</h1>
            <span className="text-gray-400 text-sm">PRIVATE</span>

            <div className="flex gap-4 items-center mt-4">
              <button
                // className="bg-cyan-400 text-black px-6 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-cyan-300 transition-colors"
                className="flex items-center gap-2 bg-[#fa586a] hover:bg-[#fa586a]/70 text-black font-semibold px-8 py-3 rounded-full"
                onClick={() => handlePlayTrack(tracks[0])}
              >
                Play
              </button>

              {/* Toggle view button */}
              <div className="relative mt-1.5 group">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white rounded-md shadow-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                  Currently in {screenType} screen |
                  Switch to {screenType == "compact" ? "list" : "compact"}
                </div>

                <button
                  className="text-white hover:text-[#fa586a] transition-colors"
                  onClick={toggleScreenType}
                >
                  {screenType === "compact" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-align-justify-icon lucide-align-justify"><path d="M3 12h18" /><path d="M3 18h18" /><path d="M3 6h18" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-list-icon lucide-list"><path d="M3 12h.01" /><path d="M3 18h.01" /><path d="M3 6h.01" /><path d="M8 12h13" /><path d="M8 18h13" /><path d="M8 6h13" /></svg>
                  )}
                </button>
              </div>

              {/* More options button with dropdown */}
              <div className="relative group  mt-1.5" ref={dropdownRef}>

                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white rounded-md shadow-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                  More
                </div>

                <button
                  className="text-white hover:scale-110 transition-colors"
                  onClick={toggleDropdown}
                >
                  {/* <MoreHorizontal className="w-6 h-6" /> */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <defs>
                      <path id="ic_action_more-a" d="M19,14 C17.895,14 17,13.105 17,12 C17,10.895 17.895,10 19,10 C20.105,10 21,10.895 21,12 C21,13.105 20.105,14 19,14 Z M14,12 C14,10.895 13.105,10 12,10 C10.895,10 10,10.895 10,12 C10,13.105 10.895,14 12,14 C13.105,14 14,13.105 14,12 Z M7,12 C7,10.895 6.105,10 5,10 C3.895,10 3,10.895 3,12 C3,13.105 3.895,14 5,14 C6.105,14 7,13.105 7,12 Z"></path>
                    </defs>
                    <g fillRule="evenodd" fill="transparent">
                      <rect width="24" height="24"></rect>
                      <use fillRule="nonzero" href="#ic_action_more-a" fill="currentColor"></use>
                    </g>
                  </svg>
                </button>

                {showDropdown && (
                  <div className="absolute z-10 -translate-x-1/2 left-1/2 bottom-full mb-2 w-48 rounded-md bg-gradient-to-b from-neutral-950 to-neutral-900 border border-[#2E3030] shadow-lg overflow-hidden">
                    {[
                      "Play",
                      "Share",
                    ].map((item, index) => (
                      <button
                        key={index}
                        className="flex items-center w-full px-4 py-3 text-sm text-white hover:bg-[#1E1E1E] border-b border-[#2E3030] last:border-b-0"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tracks Table - Responsive to screenType */}
        <div className="relative">
          {tracks.length === 0 ? (
            <div className="flex items-center justify-center min-h-[200px] text-gray-500 font-medium text-lg">
              <div className="flex flex-col items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>No liked tracks found</span>
              </div>
            </div>
          ) : screenType === "compact" ? (
            // Compact View - Original design with album art
            <div className="">
              {tracks.map((track, index) => (
                <div
                  key={track.id}
                  className="group flex items-center justify-between cursor-pointer py-3 px-2 hover:bg-[#161616] transition-colors last:border-0"
                  onClick={() => handlePlayTrack(track)}
                >
                  {/* Left side with album art and title */}
                  <div className="flex items-center gap-3 flex-grow min-w-0">
                    {/* Album art with play button overlay on hover */}
                    <div className="relative h-12 w-12 flex-shrink-0 cursor-pointer">
                      <img
                        src={track.coverImageUrl || ""}
                        alt={track.title}
                        className="h-full w-full object-cover rounded"
                      />
                      {/* Play button overlay */}
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded">
                        {(track?.id === trackDetails.id && trackDetails.isPlaying && initialized) ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <defs>
                              <path id="ic_playback_pause-a" d="M9,22 L6,22 C5.45,22 5,21.55 5,21 L5,3 C5,2.45 5.45,2 6,2 L9,2 C9.55,2 10,2.45 10,3 L10,21 C10,21.55 9.55,22 9,22 Z M19,21 L19,3 C19,2.45 18.55,2 18,2 L15,2 C14.45,2 14,2.45 14,3 L14,21 C14,21.55 14.45,22 15,22 L18,22 C18.55,22 19,21.55 19,21 Z"></path>
                            </defs>
                            <g fillRule="evenodd" fill="transparent">
                              <rect width="24" height="24"></rect>
                              <use fillRule="nonzero" href="#ic_playback_pause-a" fill="currentColor"></use>
                            </g>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Track info with consistent text size */}
                    <div className="flex flex-col min-w-0 w-full">
                      <span className={`${track?.id === trackDetails.id && trackDetails.isPlaying && initialized ? "text-[#fa586a]" : "text-white"} font-medium text-base truncate w-full`}>
                        {track.title}
                      </span>
                      <span className="text-gray-400 text-sm truncate w-full">
                        {track.singer}
                      </span>
                    </div>
                  </div>

                  {/* Right side actions */}
                  <div className="flex items-center gap-3">
                    {/* Heart button - filled green */}
                    <button className="flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><defs><path id="ic_action_favoriteon-a" d="M16,3 C14.499,3 13.092,3.552 12,4.544 C10.908,3.552 9.501,3 8,3 C4.691,3 2,5.691 2,9 C2,14.535 8.379,18.788 11.445,20.832 C11.613,20.944 11.807,21 12,21 C12.193,21 12.387,20.944 12.555,20.832 C15.62,18.788 22,14.535 22,9 C22,5.691 19.309,3 16,3 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use href="#ic_action_favoriteon-a" fill="#fa586a"></use></g></svg>
                    </button>

                    {/* More options */}
                    <button className="text-gray-400 hover:text-[#ffffff] flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <defs>
                          <path id="ic_action_more-a" d="M19,14 C17.895,14 17,13.105 17,12 C17,10.895 17.895,10 19,10 C20.105,10 21,10.895 21,12 C21,13.105 20.105,14 19,14 Z M14,12 C14,10.895 13.105,10 12,10 C10.895,10 10,10.895 10,12 C10,13.105 10.895,14 12,14 C13.105,14 14,13.105 14,12 Z M7,12 C7,10.895 6.105,10 5,10 C3.895,10 3,10.895 3,12 C3,13.105 3.895,14 5,14 C6.105,14 7,13.105 7,12 Z"></path>
                        </defs>
                        <g fillRule="evenodd" fill="transparent">
                          <rect width="24" height="24"></rect>
                          <use fillRule="nonzero" href="#ic_action_more-a" fill="currentColor"></use>
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List View - Table-like layout with consistent font sizes
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-gray-400 border-b border-[#2E3030]">
                  <tr>
                    <th className="px-3 py-3 w-8 text-sm">#</th>
                    <th className="px-3 py-3 text-sm">Title</th>
                    <th className="px-3 py-3 text-sm hidden sm:table-cell">Artist</th>
                    <th className="px-3 py-3 text-sm hidden lg:table-cell">Album</th>
                    <th className="px-3 py-3 text-right text-sm">
                      <div className="flex justify-end items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tracks.map((track, index) => (
                    <tr
                      key={track.id}
                      className="group hover:bg-[#161616] cursor-pointer"
                      onClick={() => handlePlayTrack(track)}
                    >
                      <td className="px-3 py-4 w-8 text-gray-400">
                        <div className="flex items-center justify-center w-5 h-5">
                          {/* Show track number when not hovering */}
                          <span className="group-hover:hidden">{index + 1}</span>
                          {/* Show play/pause icon when hovering */}
                          <span className="hidden group-hover:block text-white">
                            {(track?.id === trackDetails.id && trackDetails.isPlaying && initialized) ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                <defs>
                                  <path id="ic_playback_pause-a" d="M9,22 L6,22 C5.45,22 5,21.55 5,21 L5,3 C5,2.45 5.45,2 6,2 L9,2 C9.55,2 10,2.45 10,3 L10,21 C10,21.55 9.55,22 9,22 Z M19,21 L19,3 C19,2.45 18.55,2 18,2 L15,2 C14.45,2 14,2.45 14,3 L14,21 C14,21.55 14.45,22 15,22 L18,22 C18.55,22 19,21.55 19,21 Z"></path>
                                </defs>
                                <g fillRule="evenodd" fill="transparent">
                                  <rect width="24" height="24"></rect>
                                  <use fillRule="nonzero" href="#ic_playback_pause-a" fill="currentColor"></use>
                                </g>
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="5 3 19 12 5 21 5 3" />
                              </svg>
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <span className={`${track?.id === trackDetails.id && trackDetails.isPlaying && initialized ? "text-[#fa586a]" : "text-white"} text-base font-medium`}>
                          {track.title.split("From")[0].trim()}
                        </span>
                      </td>
                      <td className="px-3 py-4 text-gray-400 text-sm hidden sm:table-cell">
                        {track.singer}
                      </td>
                      <td className="px-3 py-4 text-gray-400 text-sm hidden lg:table-cell">
                        {track?.title?.split("From")[1]?.trim().replace(`("`, "").replace(`")`, "") || "Unknown Album"}
                      </td>
                      <td className="px-3 py-4 text-gray-400 text-sm text-right">
                        {formatDuration(track.duration || "")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LikedTracks;