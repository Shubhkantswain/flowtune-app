import { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { GetPlaylistTracksResponse, Track } from 'gql/graphql';
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner';
import { createGraphqlClient } from '~/clients/api';
import { getPlaylistTracksQuery } from '~/graphql/queries/playlist';
import { useDeletePlaylist } from '~/hooks/playlist';
import usePlaylistStore from '~/store/usePlaylistStore';
import { useTrackStore } from '~/store/useTrackStore';
import PlaylistInfo from './_component/PlaylistInfo';
import PlaylistTrackItems from './_component/PlaylistTrackItems';
// import SpotifyMenu from '~/components/SpotifyMenu';

export async function loader({ params, request }: LoaderFunctionArgs) {
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
        const { getPlaylistTracks } = await graphqlClient.request(getPlaylistTracksQuery, { playlistId: params.id || "" });

        return getPlaylistTracks; // Expecting an array of `Track`
    } catch (error) {
        console.error("Error fetching tracks:", error);
        return []; // Return an empty array to match the expected type
    }
}



  
function ExplorePlaylistsPage() {
    const res = useLoaderData<GetPlaylistTracksResponse>()

    console.log("resppppp", res);
    
    const [initialized, setInitialized] = useState(false)

    const { setTrackDetails, trackDetails } = useTrackStore()
    const { initialize, setCurrentTrack } = usePlaylistStore()


    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);


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

    if (!res.id) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center bg-black">
                <h1 className="text-2xl font-semibold text-white">Oops! Playlist not found.</h1>
                <p className="text-white mt-2">The playlist you are looking for doesn't exist or has been removed.</p>
                <button
                    onClick={() => window.history.back()}
                    className="mt-4 px-4 py-2 bg-white text-black rounded-md hover:opacity-80 transition"
                >
                    Go Back
                </button>
            </div>
        );
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

                    <PlaylistInfo res={res} handleControll={handleControll} />

                    <PlaylistTrackItems res={res} handleControll={handleControll} initialized={initialized} setInitialized={setInitialized}/>
                </div>
            </div>
        </div>
    )
}

export default ExplorePlaylistsPage