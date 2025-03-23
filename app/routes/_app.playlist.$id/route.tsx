import { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { GetPlaylistTracksResponse, Track } from 'gql/graphql';
import React, { useRef, useState } from 'react'
import { createGraphqlClient } from '~/clients/api';
import { getPlaylistTracksQuery } from '~/graphql/queries/playlist';
import usePlaylistStore from '~/store/usePlaylistStore';
import { useTrackStore } from '~/store/useTrackStore';
// import SpotifyMenu from '~/components/SpotifyMenu';

export async function loader({ params }: LoaderFunctionArgs) {
    try {
        const graphqlClient = createGraphqlClient();
        const { getPlaylistTracks } = await graphqlClient.request(getPlaylistTracksQuery, { playlistId: params.id || "" });

        return getPlaylistTracks; // Expecting an array of `Track`
    } catch (error) {
        console.error("Error fetching tracks:", error);
        return []; // Return an empty array to match the expected type
    }
}

function ExplorePlaylistsPage() {
    const res = useLoaderData<GetPlaylistTracksResponse>()

    const [initialized, setInitialized] = useState(false)

    const { setTrackDetails, trackDetails } = useTrackStore()
    const { initialize, setCurrentTrack } = usePlaylistStore()
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [currentIdx, setCurrentIndex] = useState(-1)

    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const dropdownRef = useRef(null);

    console.log("openDropdownIndex", openDropdownIndex);

    const handleDropdownClick = (index, e) => {
        e.stopPropagation(); // Prevent event bubbling
        setOpenDropdownIndex(openDropdownIndex === index ? null : index);
    };

    // Fixed click outside handler
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            // Don't close if clicking inside the dropdown
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdownIndex(null);
            }
        };

        if (openDropdownIndex !== null) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [openDropdownIndex]);

    const dropdownItems = [
        { label: "Add to Queue", action: () => console.log("Added to queue") },
        { label: "Add to Playlist", action: () => console.log("Add to playlist") },
        { label: "Share", action: () => console.log("Share") },
        { label: "Add to Liked Songs", action: () => console.log("Added to liked songs") },
        { label: "Add to Liked Songs", action: () => console.log("Added to liked songs") },
        { label: "Add to Liked Songs", action: () => console.log("Added to liked songs") },

    ];

    const handleControll = (track: Track) => {
        const isPlayingCurrentSong = track?.id == trackDetails.id && trackDetails.isPlaying;

        if (isPlayingCurrentSong && initialized) {
            setTrackDetails({ isPlaying: false });
            return;
        } else if (track?.id == trackDetails.id && !trackDetails.isPlaying && initialized) {
            setTrackDetails({ isPlaying: true });
            return;
        }
        else {
            if (!initialized) {
                if (res?.tracks) {
                    initialize(res.tracks);
                }
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

            setCurrentTrack(track.id)
            setInitialized(true)
        }
    }

    return (
        <div className="text-white relative min-h-screen">
            <div
                className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-0"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,1) 100%), url(${res.coverImageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                    filter: 'blur(20px)',
                    opacity: '0.6',
                }}
            />

            <div className="relative z-10">
                <div className="p-4 sm:p-6 md:p-8">
                    <div className="py-8 md:py-12 flex flex-col md:flex-row items-center md:items-start gap-8">
                        <img
                            src={res.coverImageUrl}
                            alt={res.title}
                            className="w-56 h-56 md:w-64 md:h-64 rounded-lg shadow-xl"
                        />
                        <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-bold">{res.title}</h1>
                            <p className="text-gray-400">{"res.description"}</p>
                            <div className="text-sm text-gray-400">
                                {res?.tracks?.length} songs
                            </div>
                            <div className="flex items-center gap-4 mt-4">
                                <button
                                    onClick={() => {
                                        if(res.tracks){
                                            handleControll(res.tracks[0])
                                        }
                                    }}
                                    className="flex items-center gap-2 bg-[#fa586a] hover:bg-[#fa586a]/70 text-black font-semibold px-8 py-3 rounded-full"
                                >
                                    Play
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="pb-8">
                        <table className="w-full">
                            <thead>
                                <tr className="text-gray-400 border-b border-[#2a2b2c]">
                                    <th className="text-left py-4 w-12 pl-4">#</th>
                                    <th className="text-left">Title</th>
                                    <th className="text-left hidden lg:table-cell">Album</th>
                                    <th className="text-left hidden lg:table-cell">Date Added</th>
                                    <th className="text-right hidden md:table-cell w-24">
                                        {/* <Clock3 size={16} className="ml-auto mr-8" /> */}
                                        <div className="ml-auto mr-8">clock</div>
                                    </th>
                                    <th className="text-right w-16">More</th>
                                </tr>
                            </thead>
                            <tbody>
                                {res?.tracks?.map((track, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-[#2a2b2c] group rounded-lg border-b border-[#2a2b2c] mt-4"
                                        onClick={() => handleControll(track)}
                                    >
                                        <td className="py-7 pl-4">
                                            <span>{index + 1}</span>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-4">
                                                <div className="relative">
                                                    <img
                                                        src={track?.coverImageUrl || ""}
                                                        alt={track?.title}
                                                        className="w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 rounded"
                                                    />
                                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded flex items-center justify-center">
                                                        <button className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
                                                <div>
                                                    <div>
                                                        <div className={`font-medium ${track?.id == trackDetails.id && trackDetails.isPlaying && initialized ? "text-[#fa586a]" : ""} truncate max-w-[180px] sm:max-w-[250px] md:max-w-full`}>
                                                            {track?.title}
                                                        </div>
                                                        <div className="text-sm text-gray-400 truncate max-w-[180px] sm:max-w-[250px] md:max-w-full">
                                                            {track?.singer}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={`hidden lg:table-cell ${index == currentIdx ? "text-[#fa586a]" : "text-gray-400"}`}>{"track.album"}</td>
                                        <td className={`hidden lg:table-cell ${index == currentIdx ? "text-[#fa586a]" : "text-gray-400"}`}>{"track.dateAdded"}</td>
                                        <td className={`text-right hidden md:table-cell pr-8 ${index == currentIdx ? "text-[#fa586a]" : "text-gray-400"}`}>{track?.duration}</td>
                                        <td className="text-right pr-4">
                                            <button className="cursor-pointer text-gray-400 hover:text-white ml-auto" onClick={(e) => handleDropdownClick(index, e)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><defs><path id="ic_action_more-a" d="M19,14 C17.895,14 17,13.105 17,12 C17,10.895 17.895,10 19,10 C20.105,10 21,10.895 21,12 C21,13.105 20.105,14 19,14 Z M14,12 C14,10.895 13.105,10 12,10 C10.895,10 10,10.895 10,12 C10,13.105 10.895,14 12,14 C13.105,14 14,13.105 14,12 Z M7,12 C7,10.895 6.105,10 5,10 C3.895,10 3,10.895 3,12 C3,13.105 3.895,14 5,14 C6.105,14 7,13.105 7,12 Z"></path></defs><g fillRule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use fill-rule="nonzero" href="#ic_action_more-a" fill="currentColor"></use></g></svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExplorePlaylistsPage