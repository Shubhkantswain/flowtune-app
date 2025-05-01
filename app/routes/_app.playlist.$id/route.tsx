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
import Footer from '~/components/Footer';
import { useLikedTracksStore } from '~/store/useLikedTracksStore';
import EmptyState from '~/components/EmptyState';
import { SadIcon, SearchIcon } from '~/Svgs';

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

    const [initialized, setInitialized] = useState(false)

    const { setTrackDetails, trackDetails } = useTrackStore()
    const { initializePlaylist, setCurrentlyPlayingTrack } = usePlaylistStore()

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
                    initializePlaylist(res.tracks);
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

            setCurrentlyPlayingTrack(track.id)
            setInitialized(true)
        }
    }

    if (!res.id) {
        return (
            <EmptyState 
            icon={<SadIcon width="60" height="60" />}
            title='No Playlist Found'
            message='You might lost your path, try another way'
            />
        );
      }
      
    


    return (
        <div className="text-white relative max-w-[90rem] mx-auto">
            <div
                className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-0"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,1) 10%), url(${res.coverImageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                    filter: 'blur(100px)',
                    opacity: '0.9',
                }}
            />

            <div className="relative z-10">
                <div className="p-4 sm:p-6 md:p-8">

                    <PlaylistInfo res={res} handleControll={handleControll} />

                    <PlaylistTrackItems res={res} handleControll={handleControll} initialized={initialized} setInitialized={setInitialized} />

                </div>
            </div>
        </div>
    )
}

export default ExplorePlaylistsPage




