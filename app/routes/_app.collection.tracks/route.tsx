import React, { useEffect, useState } from 'react';
import { Heart, Shuffle, MoreHorizontal, Share2, Play } from 'lucide-react';
import { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { Track } from 'gql/graphql';
import { createGraphqlClient } from '~/clients/api';
import { getLikedTracksQuery } from '~/graphql/queries/track';
import { useLoaderData } from '@remix-run/react';
import usePlaylistStore from '~/store/usePlaylistStore';
import { useTrackStore } from '~/store/useTrackStore';

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
  const { initialize, setCurrentTrack, getCurrent } = usePlaylistStore()
  const { setTrackDetails, trackDetails } = useTrackStore()
  const [initialized, setInitialized] = useState(false)
  
  return (
    <div className="min-h-screen">
      <div className="p-4 sm:p-6 md:p-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start mb-8">
          {/* Playlist Cover with Gradient Heart */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden bg-black shrink-0">
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

            {/* Text overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              {/* <h2 className="text-white text-2xl md:text-3xl font-bold z-10">My Likes</h2> */}
            </div>
          </div>

          {/* Playlist Info */}
          <div className="flex flex-col gap-4 items-center md:items-start">
            <span className="text-cyan-400 text-sm font-medium uppercase tracking-wide">Playlist</span>
            <h1 className="text-white text-4xl md:text-6xl font-bold text-center md:text-left">My Likes</h1>
            <span className="text-gray-400 text-sm">PRIVATE</span>

            <div className="flex gap-4 items-center mt-4">
              <button className="bg-cyan-400 text-black px-6 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-cyan-300 transition-colors" onClick={() => {
                if (trackDetails.id == tracks[0].id) {
                  if (trackDetails.isPlaying) {
                    return
                  } else {
                    setTrackDetails({ isPlaying: true })
                  }
                }

                setTrackDetails({
                  id: tracks[0].id,
                  title: tracks[0].title,
                  artist: tracks[0].artist,
                  duration: tracks[0].duration,
                  coverImageUrl: tracks[0].coverImageUrl || "",
                  audioFileUrl: tracks[0].audioFileUrl,
                  hasLiked: tracks[0].hasLiked,
                  authorName: tracks[0].authorName,
                  isPlaying: true,
                  fromClick: true
                });
              }}>
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                Play
              </button>
              <button className="text-white hover:text-cyan-400 transition-colors">
                <Share2 className="w-6 h-6" />
              </button>
              <button className="text-white hover:text-cyan-400 transition-colors">
                <MoreHorizontal className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Tracks Table */}
        <div className="relative">
          {
            tracks.length == 0 ? (
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
            ) : (
              <>
                {/* Table Headers - Only visible on medium and larger screens */}
                <div className="hidden md:grid md:grid-cols-[auto_1fr_1fr_1fr_80px] gap-4 px-4 py-2 border-b border-gray-800 sticky top-0 backdrop-blur-sm">
                  <div className="text-gray-400 text-sm font-medium w-8">#</div>
                  <div className="text-gray-400 text-sm font-medium">Title</div>
                  <div className="text-gray-400 text-sm font-medium">Artist</div>
                  <div className="text-gray-400 text-sm font-medium">Album</div>
                  <div className="text-gray-400 text-sm font-medium text-center">More</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-800">
                  {tracks.map((track, index) => (
                    <div key={track.id} className="group hover:bg-white/5" onClick={() => {
                      const isPlayingCurrentSong = track?.id == trackDetails.id && trackDetails.isPlaying;

                      if (isPlayingCurrentSong && initialized) {
                        setTrackDetails({ isPlaying: false });
                        return;
                      } else if (track?.id == trackDetails.id && !trackDetails.isPlaying && initialized) {
                        setTrackDetails({ isPlaying: true });
                        return;
                      }
                      else {
                        if(!initialized){
                          initialize(tracks)
                        }

                        setTrackDetails({
                          id: track.id,
                          title: track.title,
                          artist: track.artist,
                          duration: track.duration,
                          coverImageUrl: track.coverImageUrl || "",
                          audioFileUrl: track.audioFileUrl,
                          hasLiked: track.hasLiked,
                          authorName: track.authorName,
                          isPlaying: true,
                          fromClick: true
                        });

                        setCurrentTrack(track.id)
                        setInitialized(true)
                      }
                    }}>
                      {/* Mobile View */}
                      <div className="md:hidden flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="text-gray-400 w-5 flex-shrink-0">{index + 1}</div>
                          <div className="relative">
                            <img
                              src={track.coverImageUrl || ""}
                              alt={track.title}
                              className="w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 rounded"
                            />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded">
                              {/* <Play className="w-5 h-5 text-white" /> */}
                              <button className="cursor-pointer">
                                {(track?.id == trackDetails.id && trackDetails.isPlaying && initialized) ? (
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
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-white font-medium truncate">{track.title}</span>
                            <span className="text-gray-400 text-sm truncate">{track.artist}</span>
                          </div>
                        </div>
              
                      </div>

                      {/* Desktop View */}
                      <div className="hidden md:grid md:grid-cols-[auto_1fr_1fr_1fr_80px] gap-4 px-4 py-3 items-center">
                        <div className="text-gray-400 w-8">
                          {index + 1}
                        </div>

                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative">
                            <img
                              src={track.coverImageUrl || ""}
                              alt={track.title}
                              className="w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 rounded"
                            />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded">
                              <button className="cursor-pointer">
                                {track?.id == trackDetails.id && trackDetails.isPlaying && initialized ? (
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
                              </button>
                            </div>
                          </div>
                          <span className="text-white font-medium truncate">{track.title}</span>
                        </div>

                        <div className="text-gray-400 truncate">{track.artist}</div>
                        <div className="text-gray-400 truncate">{track.artist}</div>
                        <div className="flex justify-center">
                          <button className="text-gray-400 hover:text-white p-2">
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )
          }
        </div>
      </div>
    </div >
  );
};

export default LikedTracks;