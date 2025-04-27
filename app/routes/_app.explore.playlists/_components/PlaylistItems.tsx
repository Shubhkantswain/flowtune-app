import { useNavigate } from "@remix-run/react";
import { Playlist, Track } from "gql/graphql";
import { useEffect, useState } from "react";
import { SECTION_SIZE } from "~/constants";
import PlaceholderTrack from "~/routes/_app/_components/PlaceholderTrack";
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
                        <div className="group relative overflow-hidden rounded-sm shadow-xl hover:shadow-2xl transition-shadow duration-300">
                            <img
                                src={playlist.coverImageUrl || ""}
                                alt={`Album cover for ${playlist.name}`}
                                className="w-full aspect-square rounded-sm transition-opacity duration-300 group-hover:brightness-50 object-cover"
                            />
                        </div>
                        <div className="font-normal mt-2 truncate overflow-ellipsis">
                            {playlist.name}
                        </div>
                        <div className="text-sm text-gray-400 truncate overflow-ellipsis mt-0.5">
                            Total Tracks : {playlist.totalTracks}
                        </div>
                    </div>
                ) : (
                    <div key={`dummy-${index}`} className="flex-none w-36 sm:w-40 md:w-44  h-36 sm:h-40 md:h-44 transition-transform duration-300">
                    <PlaceholderTrack width="80" height="80" />
                  </div>
                );
            })}

        </>
    )
}

export default PlaylistItems;