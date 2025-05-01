import { json, LoaderFunctionArgs } from '@remix-run/cloudflare';
import { useLoaderData, useNavigate, useParams } from '@remix-run/react';
import { GetUserProfileResponse, Track } from 'gql/graphql';
import { useEffect, useState } from 'react';
import { createGraphqlClient } from '~/clients/api';
import { getUserProfileQuery, getUserTracksQuery } from '~/graphql/queries/user';
import { useFollowUser, useGetUserTracks } from '~/hooks/user';
import usePlaylistStore from '~/store/usePlaylistStore';
import { useTrackStore } from '~/store/useTrackStore';
import UserProfileInfo from './_components/UserProfileInfo';
import UserTracks from './_components/UserTracks';
import LoadMore from './_components/LoadMore';
import UserDoesNotExists from './_components/UserDoesNotExists';
import Footer from '~/components/Footer';
import EmptyState from '~/components/EmptyState';
import { SadIcon } from '~/Svgs';

interface UserData {
    data: GetUserProfileResponse | null
    tracks: Track[]
    userExist: boolean
    isAuthenticated: boolean
}

export async function loader({ request, params }: LoaderFunctionArgs) {
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
        const { getUserProfile } = await graphqlClient.request(getUserProfileQuery, { userId: params.userId || "" });
        console.log("params.userId", params.userId);

        if (!getUserProfile) {
            return json<UserData>({
                data: null,
                tracks: [],
                userExist: false,
                isAuthenticated: token ? true : false
            })
        }

        const graphqlClient2 = createGraphqlClient(token);
        const { getUserTracks } = await graphqlClient2.request(getUserTracksQuery, { payload: { userId: params.userId || "", page: 1 } });

        return json<UserData>({
            data: getUserProfile,
            tracks: getUserTracks,
            userExist: true,
            isAuthenticated: token ? true : false
        })

    } catch (error) {
        console.error("Error fetching tracks:", error);
        return json<UserData>({
            data: null,
            tracks: [],
            userExist: false,
            isAuthenticated: true
        });
    }

}

const UserPage = () => {
    const user = useLoaderData<UserData>(); // Properly typed loader data
    const { userId } = useParams(); // Get the dynamic userId

    const { trackDetails } = useTrackStore();
    const { initializePlaylist, setCurrentlyPlayingTrack, setActiveSectionIndex } = usePlaylistStore();

    const [tracks, setTracks] = useState<Track[]>(user.tracks);
    const [page, setPage] = useState(1);

    const { data, isLoading } = useGetUserTracks(userId || "", page);

    useEffect(() => {
        if (data && data.length > 0) {
            const newArray = [...tracks, ...(Array.isArray(data) ? data : [data])];
            setTracks(newArray);
            initializePlaylist(newArray);
            setCurrentlyPlayingTrack(trackDetails.id);
        }
    }, [data]);

    console.log("tracks", tracks);
    

    useEffect(() => {
        setActiveSectionIndex(-1); // To prevent the main page
    }, []);

    useEffect(() => {
        if (!user.isAuthenticated) {
            localStorage.setItem("__FlowTune_Token", "")
        }
    }, [user.isAuthenticated])

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    if (!user.userExist) {
        return (
            <EmptyState 
            icon={<SadIcon width="60" height="60" />}
            title='No user found'
            message='You might lost your path, try another way'
            />
        )
    }

    console.log(tracks, "alltraxks");

    return (
        <div className="text-white relative max-w-[90rem] mx-auto ">
            <div
                className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-0"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,1) 10%), url(${user?.data?.profileImageURL || "https://m.media-amazon.com/images/X/l6Hv/M/Wl6HvhcrtVmM8aW._UX250_FMwebp_QL85_.jpg"})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                    filter: 'blur(100px)',
                    opacity: '0.9',
                }}
            />

            <div className="relative z-10">
                <div className="p-4 sm:p-6 md:p-8">
                    <UserProfileInfo user={user.data} />

                    <UserTracks tracks={user.tracks} page={page} allTracks={tracks} />
                </div>

                <LoadMore handleLoadMore={handleLoadMore} isLoading={isLoading && page != 1} />

            </div>
        </div>
    );
};

export default UserPage;