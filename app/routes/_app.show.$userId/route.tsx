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

interface UserData {
    data: GetUserProfileResponse | null
    tracks: Track[]
    userExist: boolean
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
                userExist: false
            })
        }

        const graphqlClient2 = createGraphqlClient(token);
        const { getUserTracks } = await graphqlClient2.request(getUserTracksQuery, { payload: { userId: params.userId || "", page: 1 } });

        return json<UserData>({
            data: getUserProfile,
            tracks: getUserTracks,
            userExist: true
        })

    } catch (error) {
        console.error("Error fetching tracks:", error);
        return json<UserData>({
            data: null,
            tracks: [],
            userExist: false
        });
    }

}

const UserPage = () => {
    const user = useLoaderData<UserData>(); // Properly typed loader data
    const { userId } = useParams(); // Get the dynamic userId

    const { trackDetails } = useTrackStore();
    const { initialize, setCurrentTrack, setActiveSectionIndex } = usePlaylistStore();

    const [tracks, setTracks] = useState<Track[]>(user.tracks);
    const [page, setPage] = useState(1);

    const { data, isLoading } = useGetUserTracks(userId || "", page);

    useEffect(() => {
        if (data && data.length > 0) {
            const newArray = [...tracks, ...(Array.isArray(data) ? data : [data])];
            setTracks(newArray);
            initialize(newArray);
            setCurrentTrack(trackDetails.id);
        }
    }, [data]);

    useEffect(() => {
        setActiveSectionIndex(-1); // To prevent the main page
    }, []);

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    if (!user.userExist) {
        return <UserDoesNotExists />;
    }

    return (
        <div className="text-white relative min-h-screen">
            <div
                className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-0"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,1) 100%), url(${user?.data?.profileImageURL || "https://www.shutterstock.com/image-vector/male-default-avatar-profile-icon-600nw-1725062341.jpg"})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                    filter: 'blur(20px)',
                    opacity: '0.6',
                }}
            />

            <div className="relative z-10">
                <div className="p-4 sm:p-6 md:p-8">
                    <UserProfileInfo user={user.data} />

                    <UserTracks tracks={user.tracks} page={page} allTracks={tracks} />
                </div>

                <LoadMore handleLoadMore={handleLoadMore} isLoading={isLoading} />

            </div>
        </div>
    );
};

export default UserPage;