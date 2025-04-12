import { useNavigate } from "@remix-run/react";
import { Playlist, Track } from "gql/graphql";
import { useEffect, useState } from "react";
import { SECTION_SIZE } from "~/constants";
import usePlaylistStore from "~/store/usePlaylistStore";
import { useTrackStore } from "~/store/useTrackStore";

interface PlaylistItemsProps {
    playlists: Playlist[]
}

const PlaylistItems: React.FC<PlaylistItemsProps> = ({ playlists }) => {
    const playlistsToRender: Playlist[] = [
        ...playlists,
        ...Array(Math.max(0, SECTION_SIZE - playlists.length)).fill(null)
    ];

    const navigate = useNavigate()

    return (
        <>
            {playlistsToRender.map((playlist, index) => {
                return playlist ? (
                    <div key={playlist.id} className="cursor-pointer flex-none w-36 sm:w-40 md:w-44 transition-transform duration-300"
                        onClick={() => {
                            navigate(`/playlist/${playlist.id}`)
                        }}
                    >
                        <div className="group relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
                            <img
                                src={playlist.coverImageUrl || ""}
                                alt={`Album cover for ${playlist.name}`}
                                className="w-full aspect-square rounded-lg transition-opacity duration-300 group-hover:brightness-50 object-cover"
                            />
                        </div>
                        <div className="font-medium mt-2 truncate overflow-ellipsis">
                            {playlist.name}
                        </div>
                        <div className="text-sm text-gray-400 truncate overflow-ellipsis mt-0.5">
                            Total Tracks : {playlist.totalTracks}
                        </div>
                    </div>
                ) : (
                    <div key={`dummy-${index}`} className="flex-none w-36 sm:w-40 md:w-44 opacity-50">
                        <div className="bg-[#313232] aspect-square rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-disc-3">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M6 12c0-1.7.7-3.2 1.8-4.2" />
                                <circle cx="12" cy="12" r="2" />
                                <path d="M18 12c0 1.7-.7 3.2-1.8 4.2" />
                            </svg>
                        </div>
                    </div>
                );
            })}

        </>
    )
}

export default PlaylistItems;