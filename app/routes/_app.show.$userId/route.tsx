import { json, LoaderFunctionArgs } from '@remix-run/cloudflare';
import { useLoaderData, useNavigate, useParams } from '@remix-run/react';
import { GetUserProfileResponse, Track } from 'gql/graphql';
import { useEffect, useState } from 'react';
import { createGraphqlClient } from '~/clients/api';
import { getUserProfileQuery, getUserTracksQuery } from '~/graphql/queries/user';
import { useFollowUser, useGetUserTracks } from '~/hooks/user';
import usePlaylistStore from '~/store/usePlaylistStore';
import { useTrackStore } from '~/store/useTrackStore';

interface UserData {
    data: GetUserProfileResponse | null
    tracks: Track[]
    userExist: boolean
}

export async function loader({ params }: LoaderFunctionArgs) {
    try {
        const graphqlClient = createGraphqlClient();
        const { getUserProfile } = await graphqlClient.request(getUserProfileQuery, { userId: params.userId || "" });
        console.log("params.userId", params.userId);

        if (!getUserProfile) {
            return json<UserData>({
                data: null,
                tracks: [],
                userExist: false
            })
        }

        const graphqlClient2 = createGraphqlClient();
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
    const navigate = useNavigate()

    const user = useLoaderData<UserData>(); // Properly typed loader data
    const { setTrackDetails, trackDetails } = useTrackStore()
    const { userId } = useParams(); // Get the dynamic userId

    const [initialized, setInitialized] = useState(false)
    const { initialize, setCurrentTrack, setActiveSectionIndex } = usePlaylistStore()

    const [tracks, setTracks] = useState<Track[]>(user.tracks)
    const [page, setPage] = useState(1)

    const { data } = useGetUserTracks(userId || "", page)
    const [follow, setFollow] = useState<boolean>(user.data?.followedByMe || false)

    const { mutateAsync: followUser } = useFollowUser()

    const handleLoadMore = () => {
        setPage(page + 1)
    }

    useEffect(() => {
        if (data) {
            const newArray = [...tracks, ...(Array.isArray(data) ? data : [data])]
            setTracks(newArray);
            initialize(newArray)
            setCurrentTrack(trackDetails.id)
        }
    }, [data]);

    // to prevent the main page
    useEffect(() => {
        setActiveSectionIndex(-1)
    }, [])

    if (!user.userExist) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center">
                <h1 className="text-2xl font-semibold text-gray-400 mb-4">
                    Sorry, User Not Found ☹️
                </h1>
                <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition"
                >
                    Go Back
                </button>
            </div>
        )
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
                    <div className="py-8 md:py-12 flex flex-col md:flex-row items-center md:items-start gap-8">
                        <img
                            src={user?.data?.profileImageURL || "https://www.shutterstock.com/image-vector/male-default-avatar-profile-icon-600nw-1725062341.jpg"}
                            alt={user?.data?.username}
                            className="w-56 h-56 md:w-64 md:h-64 rounded-lg shadow-xl object-cover"
                        />
                        <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
                            {/* Username with Instagram-Like Verified Badge */}
                            <div className="flex items-center gap-2">
                                <h1 className="text-4xl md:text-5xl font-bold">{user?.data?.username}</h1>
                                {user?.data?.username === "flowtune" && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#fa586a"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-6 h-6"
                                    >
                                        <circle cx="12" cy="12" r="10" fill="#fa586a" />
                                        <path d="M8 12l2 2 4-4" stroke="white" strokeWidth="2" />
                                    </svg>
                                )}
                            </div>

                            {/* Bio */}
                            <p className="text-white -mt-3">{user?.data?.bio || "No Bio Provided"}</p>

                            {/* Track Count */}
                            <div className="text-sm text-white -mt-3">{user?.data?.totalTracks} Tracks</div>

                            {/* Buttons Section */}
                            <div className="flex items-center gap-4 mt-4">
                                <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-2 rounded-full"
                                    onClick={async () => {
                                        await followUser(user.data?.id || "")
                                        setFollow(!follow)
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="17"
                                        height="17"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M16,3 C14.499,3 13.092,3.552 12,4.544 C10.908,3.552 9.501,3 8,3 C4.691,3 2,5.691 2,9 C2,14.535 8.379,18.788 11.445,20.832 C11.613,20.944 11.807,21 12,21 C12.193,21 12.387,20.944 12.555,20.832 C15.62,18.788 22,14.535 22,9 C22,5.691 19.309,3 16,3 Z"
                                        />
                                    </svg>
                                    {
                                        follow ? "Unfollow" : "Follow"
                                    }
                                </button>

                                <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M19,14 C17.895,14 17,13.105 17,12 C17,10.895 17.895,10 19,10 C20.105,10 21,10.895 21,12 C21,13.105 20.105,14 19,14 Z M14,12 C14,10.895 13.105,10 12,10 C10.895,10 10,10.895 10,12 C10,13.105 10.895,14 12,14 C13.105,14 14,13.105 14,12 Z M7,12 C7,10.895 6.105,10 5,10 C3.895,10 3,10.895 3,12 C3,13.105 3.895,14 5,14 C6.105,14 7,13.105 7,12 Z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>

                    <div className="mt-6 md:mt-8">
                        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Episodes</h2>
                        <div className="space-y-5 md:space-y-6">
                            {(tracks.length > 0 ? tracks : user.tracks)?.map((track, index) => (
                                <div
                                    key={index}
                                    className="group bg-white/5 hover:bg-white/10 transition-colors rounded-lg p-3 md:p-4 cursor-pointer"
                                >
                                    <div className="flex gap-3 md:gap-4">
                                        <div className="min-w-[50px] md:min-w-[60px]">
                                            <img
                                                src={track.coverImageUrl || ""}
                                                alt={track.title}
                                                className="w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 rounded-md"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center">
                                                <div className="space-y-1 flex-1">
                                                    <div className="text-gray-400 text-xs md:text-sm">{"track.date"}</div>
                                                    <h3 className="font-medium text-base md:text-lg sm:truncate">{track.title}</h3>
                                                    <p className="text-gray-400 text-xs md:text-sm line-clamp-2 max-w-2xl">{"track.description"}</p>
                                                </div>
                                                <div className="hidden md:flex items-center gap-4 ml-4">
                                                    <button className="group-hover:bg-white/20 backdrop-blur-sm bg-white/10 rounded-full p-1.5 md:p-2 transition-all" onClick={() => {
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
                                                                initialize(user.tracks)
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
                                                    }}>
                                                        {track?.id == trackDetails.id && trackDetails.isPlaying && initialized ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                                                                <defs>
                                                                    <path id="ic_playback_pause-a" d="M9,22 L6,22 C5.45,22 5,21.55 5,21 L5,3 C5,2.45 5.45,2 6,2 L9,2 C9.55,2 10,2.45 10,3 L10,21 C10,21.55 9.55,22 9,22 Z M19,21 L19,3 C19,2.45 18.55,2 18,2 L15,2 C14.45,2 14,2.45 14,3 L14,21 C14,21.55 14.45,22 15,22 L18,22 C18.55,22 19,21.55 19,21 Z"></path>
                                                                </defs>
                                                                <g fillRule="evenodd" fill="transparent">
                                                                    <rect width="24" height="24"></rect>
                                                                    <use fillRule="nonzero" href="#ic_playback_pause-a" fill="currentColor"></use>
                                                                </g>
                                                            </svg>
                                                        ) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <polygon points="5 3 19 12 5 21 5 3" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                    <div className="text-gray-400 text-xs md:text-sm w-12 text-center">{track.duration}</div>
                                                    <button className="group-hover:bg-white/20 backdrop-blur-sm bg-white/10 rounded-full p-1 md:p-1.5 transition-all">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>

                                                    </button>
                                                </div>
                                            </div>

                                            <div className="md:hidden flex items-center justify-between mt-3 md:mt-4">
                                                <div className="flex items-center gap-2">
                                                    <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full p-1.5 transition-all" onClick={() => {
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
                                                                initialize(user.tracks)
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
                                                    }}>
                                                        {track?.id == trackDetails.id && trackDetails.isPlaying && initialized ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                                                                <defs>
                                                                    <path id="ic_playback_pause-a" d="M9,22 L6,22 C5.45,22 5,21.55 5,21 L5,3 C5,2.45 5.45,2 6,2 L9,2 C9.55,2 10,2.45 10,3 L10,21 C10,21.55 9.55,22 9,22 Z M19,21 L19,3 C19,2.45 18.55,2 18,2 L15,2 C14.45,2 14,2.45 14,3 L14,21 C14,21.55 14.45,22 15,22 L18,22 C18.55,22 19,21.55 19,21 Z"></path>
                                                                </defs>
                                                                <g fillRule="evenodd" fill="transparent">
                                                                    <rect width="24" height="24"></rect>
                                                                    <use fillRule="nonzero" href="#ic_playback_pause-a" fill="currentColor"></use>
                                                                </g>
                                                            </svg>
                                                        ) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <polygon points="5 3 19 12 5 21 5 3" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                    <span className="text-gray-400 text-xs md:text-sm">{track.duration}</span>
                                                </div>
                                                <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full p-1.5 transition-all">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><defs><path id="ic_action_add-a" d="M21,11 L13,11 L13,3 C13,2.448 12.552,2 12,2 C11.448,2 11,2.448 11,3 L11,11 L3,11 C2.448,11 2,11.448 2,12 C2,12.552 2.448,13 3,13 L11,13 L11,21 C11,21.553 11.448,22 12,22 C12.552,22 13,21.553 13,21 L13,13 L21,13 C21.552,13 22,12.552 22,12 C22,11.448 21.552,11 21,11 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use href="#ic_action_add-a" fill="currentColor"></use></g></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleLoadMore}
                        className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md transition-all"
                    >
                        Load More
                    </button>
                </div>

            </div>
        </div>
    );
};

export default UserPage;