/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "#graphql\n    mutation SignupUser($input: SignupUserInput!) {\n        signupUser(input: $input)\n    }\n": typeof types.SignupUserDocument,
    "#graphql\n    mutation VerifyEmail($input: VerifyEmailInput!) {\n        verifyEmail(input: $input) {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n            language\n            isPro\n            authToken\n        }\n    }\n": typeof types.VerifyEmailDocument,
    "#graphql\n    mutation LoginUser($input: LoginUserInput!) {\n        loginUser(input: $input) {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n            language\n            isPro\n            authToken\n        }\n    }\n": typeof types.LoginUserDocument,
    "#graphql\n    mutation ForgotPassword($usernameOrEmail: String!) {\n        forgotPassword(usernameOrEmail: $usernameOrEmail)\n    }\n": typeof types.ForgotPasswordDocument,
    "#graphql\n    mutation ResetPassword($input: ResetPasswordInput!) {\n        resetPassword(input: $input)\n    }\n": typeof types.ResetPasswordDocument,
    "#graphql\nmutation AddSongToPlaylist($payload: AddSongToPlaylistInput!) {\n  addSongToPlaylist(payload: $payload) {\n    id\n    name\n    coverImageUrl\n    Visibility\n    totalTracks\n    authorId\n  }\n}\n": typeof types.AddSongToPlaylistDocument,
    "#graphql\n  mutation CreatePlaylist($payload: CreatePlaylistInput!) {\n    createPlaylist(payload: $payload) {\n      id\n      name\n      coverImageUrl\n      Visibility\n      totalTracks\n      authorId\n    }\n  }\n": typeof types.CreatePlaylistDocument,
    "#graphql\nmutation RemoveSongFromPlaylist($payload: RemoveSongFromPlaylistInput!) {\n  removeSongFromPlaylist(payload: $payload)\n}\n": typeof types.RemoveSongFromPlaylistDocument,
    "#graphql\n  mutation DeletePlaylist($playlistId: String!) {\n  deletePlaylist(playlistId: $playlistId)\n}\n": typeof types.DeletePlaylistDocument,
    "#graphql\n    mutation CreateTrack($payload: createTrackPayload!) {\n        createTrack(payload: $payload) \n    }\n": typeof types.CreateTrackDocument,
    "#graphql\n    mutation LikeTrack($trackId: String!) {\n        likeTrack(trackId: $trackId)\n    }\n": typeof types.LikeTrackDocument,
    "#graphql\nmutation ChangeMusicPreference($language: String!) {\n  changeMusicPreference(language: $language)\n}\n": typeof types.ChangeMusicPreferenceDocument,
    "#graphql\nmutation FollowUser($userId: String!) {\n  followUser(userId: $userId)\n}\n  ": typeof types.FollowUserDocument,
    "#graphql\n  mutation UpdateUserProfile($payload: UpdateUserProfilePayload!) {\n    updateUserProfile(payload: $payload)\n  }\n": typeof types.UpdateUserProfileDocument,
    "\n    #graphql\n    query GetCurrentUser {\n        getCurrentUser {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n            language\n            isPro\n        }\n    }\n": typeof types.GetCurrentUserDocument,
    "#graphql\n  query GetCurrentUserPlaylists($input: getCurrentUserPlaylistsInput!) {\n    getCurrentUserPlaylists(input: $input) {\n      id\n      name\n      coverImageUrl\n      Visibility\n      totalTracks\n      authorId\n    }\n  }\n": typeof types.GetCurrentUserPlaylistsDocument,
    "#graphql\n  query GetExplorePlaylists($page: Int!) {\n    getExplorePlaylists(page: $page) {\n      id\n      name\n      coverImageUrl\n      Visibility\n      totalTracks\n      authorId\n    }\n  }\n": typeof types.GetExplorePlaylistsDocument,
    "#graphql\n  query GetSearchPlaylists($input: SearchInput!) {\n    getSearchPlaylists(input: $input) {\n      id\n      name\n      coverImageUrl\n      Visibility\n      totalTracks\n      authorId\n    }  \n  }\n": typeof types.GetSearchPlaylistsDocument,
    "#graphql\n  query GetPlaylistTracks($playlistId: String!) {\n    getPlaylistTracks(playlistId: $playlistId) {\n      id\n      title\n      coverImageUrl\n      visibility\n      tracks {\n        id    \n        title            \n        singer         \n        starCast\n        duration             \n        coverImageUrl      \n        videoUrl\n        audioFileUrl  \n        hasLiked\n        authorId \n        createdAt\n      }\n      authorId\n    }\n  }\n": typeof types.GetPlaylistTracksDocument,
    "#graphql\n  query GetFeedTracks {\n    getFeedTracks {\n      id   \n      title            \n      singer          \n      starCast\n      duration             \n      coverImageUrl    \n      videoUrl\n      audioFileUrl \n      hasLiked\n      authorId\n    }\n  }\n": typeof types.GetFeedTracksDocument,
    "#graphql\n  query GetExploreTracks($page: Int!) {\n    getExploreTracks(page: $page) {\n      id   \n      title            \n      singer          \n      starCast\n      duration             \n      coverImageUrl    \n      videoUrl\n      audioFileUrl \n      hasLiked\n      authorId\n    }\n  }\n": typeof types.GetExploreTracksDocument,
    "#graphql\n  query GetTracksByGenreId($input: GetTracksByGenreIdInput!) {\n    getTracksByGenreId(input: $input) {\n      id\n      title\n      singer\n      starCast\n      duration\n      coverImageUrl\n      videoUrl\n      audioFileUrl\n      hasLiked\n      authorId\n    }\n  }\n": typeof types.GetTracksByGenreIdDocument,
    "#graphql\n  query GetRecentTracks($recentTracks: [String!]!) {\n    getRecentTracks(recentTracks: $recentTracks) {\n      id   \n      title            \n      singer          \n      starCast\n      duration             \n      coverImageUrl    \n      videoUrl\n      audioFileUrl \n      hasLiked\n      authorId  \n    }\n  }\n": typeof types.GetRecentTracksDocument,
    "\n  #graphql\n  query GetSearchTracks($input: SearchInput!) {\n    getSearchTracks(input: $input) {\n      id\n      title\n      singer\n      starCast\n      duration\n      coverImageUrl\n      videoUrl\n      audioFileUrl\n      hasLiked\n      authorId\n    }\n  }\n": typeof types.GetSearchTracksDocument,
    "\n  #graphql\n  query GetLikedTracks {\n    getLikedTracks {\n      id\n      title\n      singer\n      starCast\n      duration\n      coverImageUrl\n      videoUrl\n      audioFileUrl\n      hasLiked\n      authorId\n    }\n  }\n\n": typeof types.GetLikedTracksDocument,
    "#graphql\n    query GetUserProfile($userId: String!) {\n      getUserProfile(userId: $userId) {\n            id\n            username\n            fullName\n            profileImageURL\n            bio\n            totalTracks\n            followedByMe\n      }\n    }\n        ": typeof types.GetUserProfileDocument,
    "#graphql\n  query GetSearchUser($input: SearchInput!) {\n  getSearchUser(input: $input) {\n    id\n    username\n    profileImageURL\n  }\n}\n": typeof types.GetSearchUserDocument,
    "#graphql\n    query GetUserTracks($payload: GetUserTracksPayload!) {\n      getUserTracks(payload: $payload) {\n        id   \n        title            \n        singer          \n        starCast\n        duration             \n        coverImageUrl    \n        videoUrl\n        audioFileUrl \n        hasLiked\n        authorId\n        createdAt\n      }\n    }\n": typeof types.GetUserTracksDocument,
};
const documents: Documents = {
    "#graphql\n    mutation SignupUser($input: SignupUserInput!) {\n        signupUser(input: $input)\n    }\n": types.SignupUserDocument,
    "#graphql\n    mutation VerifyEmail($input: VerifyEmailInput!) {\n        verifyEmail(input: $input) {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n            language\n            isPro\n            authToken\n        }\n    }\n": types.VerifyEmailDocument,
    "#graphql\n    mutation LoginUser($input: LoginUserInput!) {\n        loginUser(input: $input) {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n            language\n            isPro\n            authToken\n        }\n    }\n": types.LoginUserDocument,
    "#graphql\n    mutation ForgotPassword($usernameOrEmail: String!) {\n        forgotPassword(usernameOrEmail: $usernameOrEmail)\n    }\n": types.ForgotPasswordDocument,
    "#graphql\n    mutation ResetPassword($input: ResetPasswordInput!) {\n        resetPassword(input: $input)\n    }\n": types.ResetPasswordDocument,
    "#graphql\nmutation AddSongToPlaylist($payload: AddSongToPlaylistInput!) {\n  addSongToPlaylist(payload: $payload) {\n    id\n    name\n    coverImageUrl\n    Visibility\n    totalTracks\n    authorId\n  }\n}\n": types.AddSongToPlaylistDocument,
    "#graphql\n  mutation CreatePlaylist($payload: CreatePlaylistInput!) {\n    createPlaylist(payload: $payload) {\n      id\n      name\n      coverImageUrl\n      Visibility\n      totalTracks\n      authorId\n    }\n  }\n": types.CreatePlaylistDocument,
    "#graphql\nmutation RemoveSongFromPlaylist($payload: RemoveSongFromPlaylistInput!) {\n  removeSongFromPlaylist(payload: $payload)\n}\n": types.RemoveSongFromPlaylistDocument,
    "#graphql\n  mutation DeletePlaylist($playlistId: String!) {\n  deletePlaylist(playlistId: $playlistId)\n}\n": types.DeletePlaylistDocument,
    "#graphql\n    mutation CreateTrack($payload: createTrackPayload!) {\n        createTrack(payload: $payload) \n    }\n": types.CreateTrackDocument,
    "#graphql\n    mutation LikeTrack($trackId: String!) {\n        likeTrack(trackId: $trackId)\n    }\n": types.LikeTrackDocument,
    "#graphql\nmutation ChangeMusicPreference($language: String!) {\n  changeMusicPreference(language: $language)\n}\n": types.ChangeMusicPreferenceDocument,
    "#graphql\nmutation FollowUser($userId: String!) {\n  followUser(userId: $userId)\n}\n  ": types.FollowUserDocument,
    "#graphql\n  mutation UpdateUserProfile($payload: UpdateUserProfilePayload!) {\n    updateUserProfile(payload: $payload)\n  }\n": types.UpdateUserProfileDocument,
    "\n    #graphql\n    query GetCurrentUser {\n        getCurrentUser {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n            language\n            isPro\n        }\n    }\n": types.GetCurrentUserDocument,
    "#graphql\n  query GetCurrentUserPlaylists($input: getCurrentUserPlaylistsInput!) {\n    getCurrentUserPlaylists(input: $input) {\n      id\n      name\n      coverImageUrl\n      Visibility\n      totalTracks\n      authorId\n    }\n  }\n": types.GetCurrentUserPlaylistsDocument,
    "#graphql\n  query GetExplorePlaylists($page: Int!) {\n    getExplorePlaylists(page: $page) {\n      id\n      name\n      coverImageUrl\n      Visibility\n      totalTracks\n      authorId\n    }\n  }\n": types.GetExplorePlaylistsDocument,
    "#graphql\n  query GetSearchPlaylists($input: SearchInput!) {\n    getSearchPlaylists(input: $input) {\n      id\n      name\n      coverImageUrl\n      Visibility\n      totalTracks\n      authorId\n    }  \n  }\n": types.GetSearchPlaylistsDocument,
    "#graphql\n  query GetPlaylistTracks($playlistId: String!) {\n    getPlaylistTracks(playlistId: $playlistId) {\n      id\n      title\n      coverImageUrl\n      visibility\n      tracks {\n        id    \n        title            \n        singer         \n        starCast\n        duration             \n        coverImageUrl      \n        videoUrl\n        audioFileUrl  \n        hasLiked\n        authorId \n        createdAt\n      }\n      authorId\n    }\n  }\n": types.GetPlaylistTracksDocument,
    "#graphql\n  query GetFeedTracks {\n    getFeedTracks {\n      id   \n      title            \n      singer          \n      starCast\n      duration             \n      coverImageUrl    \n      videoUrl\n      audioFileUrl \n      hasLiked\n      authorId\n    }\n  }\n": types.GetFeedTracksDocument,
    "#graphql\n  query GetExploreTracks($page: Int!) {\n    getExploreTracks(page: $page) {\n      id   \n      title            \n      singer          \n      starCast\n      duration             \n      coverImageUrl    \n      videoUrl\n      audioFileUrl \n      hasLiked\n      authorId\n    }\n  }\n": types.GetExploreTracksDocument,
    "#graphql\n  query GetTracksByGenreId($input: GetTracksByGenreIdInput!) {\n    getTracksByGenreId(input: $input) {\n      id\n      title\n      singer\n      starCast\n      duration\n      coverImageUrl\n      videoUrl\n      audioFileUrl\n      hasLiked\n      authorId\n    }\n  }\n": types.GetTracksByGenreIdDocument,
    "#graphql\n  query GetRecentTracks($recentTracks: [String!]!) {\n    getRecentTracks(recentTracks: $recentTracks) {\n      id   \n      title            \n      singer          \n      starCast\n      duration             \n      coverImageUrl    \n      videoUrl\n      audioFileUrl \n      hasLiked\n      authorId  \n    }\n  }\n": types.GetRecentTracksDocument,
    "\n  #graphql\n  query GetSearchTracks($input: SearchInput!) {\n    getSearchTracks(input: $input) {\n      id\n      title\n      singer\n      starCast\n      duration\n      coverImageUrl\n      videoUrl\n      audioFileUrl\n      hasLiked\n      authorId\n    }\n  }\n": types.GetSearchTracksDocument,
    "\n  #graphql\n  query GetLikedTracks {\n    getLikedTracks {\n      id\n      title\n      singer\n      starCast\n      duration\n      coverImageUrl\n      videoUrl\n      audioFileUrl\n      hasLiked\n      authorId\n    }\n  }\n\n": types.GetLikedTracksDocument,
    "#graphql\n    query GetUserProfile($userId: String!) {\n      getUserProfile(userId: $userId) {\n            id\n            username\n            fullName\n            profileImageURL\n            bio\n            totalTracks\n            followedByMe\n      }\n    }\n        ": types.GetUserProfileDocument,
    "#graphql\n  query GetSearchUser($input: SearchInput!) {\n  getSearchUser(input: $input) {\n    id\n    username\n    profileImageURL\n  }\n}\n": types.GetSearchUserDocument,
    "#graphql\n    query GetUserTracks($payload: GetUserTracksPayload!) {\n      getUserTracks(payload: $payload) {\n        id   \n        title            \n        singer          \n        starCast\n        duration             \n        coverImageUrl    \n        videoUrl\n        audioFileUrl \n        hasLiked\n        authorId\n        createdAt\n      }\n    }\n": types.GetUserTracksDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    mutation SignupUser($input: SignupUserInput!) {\n        signupUser(input: $input)\n    }\n"): (typeof documents)["#graphql\n    mutation SignupUser($input: SignupUserInput!) {\n        signupUser(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    mutation VerifyEmail($input: VerifyEmailInput!) {\n        verifyEmail(input: $input) {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n            language\n            isPro\n            authToken\n        }\n    }\n"): (typeof documents)["#graphql\n    mutation VerifyEmail($input: VerifyEmailInput!) {\n        verifyEmail(input: $input) {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n            language\n            isPro\n            authToken\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    mutation LoginUser($input: LoginUserInput!) {\n        loginUser(input: $input) {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n            language\n            isPro\n            authToken\n        }\n    }\n"): (typeof documents)["#graphql\n    mutation LoginUser($input: LoginUserInput!) {\n        loginUser(input: $input) {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n            language\n            isPro\n            authToken\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    mutation ForgotPassword($usernameOrEmail: String!) {\n        forgotPassword(usernameOrEmail: $usernameOrEmail)\n    }\n"): (typeof documents)["#graphql\n    mutation ForgotPassword($usernameOrEmail: String!) {\n        forgotPassword(usernameOrEmail: $usernameOrEmail)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    mutation ResetPassword($input: ResetPasswordInput!) {\n        resetPassword(input: $input)\n    }\n"): (typeof documents)["#graphql\n    mutation ResetPassword($input: ResetPasswordInput!) {\n        resetPassword(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\nmutation AddSongToPlaylist($payload: AddSongToPlaylistInput!) {\n  addSongToPlaylist(payload: $payload) {\n    id\n    name\n    coverImageUrl\n    Visibility\n    totalTracks\n    authorId\n  }\n}\n"): (typeof documents)["#graphql\nmutation AddSongToPlaylist($payload: AddSongToPlaylistInput!) {\n  addSongToPlaylist(payload: $payload) {\n    id\n    name\n    coverImageUrl\n    Visibility\n    totalTracks\n    authorId\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  mutation CreatePlaylist($payload: CreatePlaylistInput!) {\n    createPlaylist(payload: $payload) {\n      id\n      name\n      coverImageUrl\n      Visibility\n      totalTracks\n      authorId\n    }\n  }\n"): (typeof documents)["#graphql\n  mutation CreatePlaylist($payload: CreatePlaylistInput!) {\n    createPlaylist(payload: $payload) {\n      id\n      name\n      coverImageUrl\n      Visibility\n      totalTracks\n      authorId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\nmutation RemoveSongFromPlaylist($payload: RemoveSongFromPlaylistInput!) {\n  removeSongFromPlaylist(payload: $payload)\n}\n"): (typeof documents)["#graphql\nmutation RemoveSongFromPlaylist($payload: RemoveSongFromPlaylistInput!) {\n  removeSongFromPlaylist(payload: $payload)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  mutation DeletePlaylist($playlistId: String!) {\n  deletePlaylist(playlistId: $playlistId)\n}\n"): (typeof documents)["#graphql\n  mutation DeletePlaylist($playlistId: String!) {\n  deletePlaylist(playlistId: $playlistId)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    mutation CreateTrack($payload: createTrackPayload!) {\n        createTrack(payload: $payload) \n    }\n"): (typeof documents)["#graphql\n    mutation CreateTrack($payload: createTrackPayload!) {\n        createTrack(payload: $payload) \n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    mutation LikeTrack($trackId: String!) {\n        likeTrack(trackId: $trackId)\n    }\n"): (typeof documents)["#graphql\n    mutation LikeTrack($trackId: String!) {\n        likeTrack(trackId: $trackId)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\nmutation ChangeMusicPreference($language: String!) {\n  changeMusicPreference(language: $language)\n}\n"): (typeof documents)["#graphql\nmutation ChangeMusicPreference($language: String!) {\n  changeMusicPreference(language: $language)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\nmutation FollowUser($userId: String!) {\n  followUser(userId: $userId)\n}\n  "): (typeof documents)["#graphql\nmutation FollowUser($userId: String!) {\n  followUser(userId: $userId)\n}\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  mutation UpdateUserProfile($payload: UpdateUserProfilePayload!) {\n    updateUserProfile(payload: $payload)\n  }\n"): (typeof documents)["#graphql\n  mutation UpdateUserProfile($payload: UpdateUserProfilePayload!) {\n    updateUserProfile(payload: $payload)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    query GetCurrentUser {\n        getCurrentUser {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n            language\n            isPro\n        }\n    }\n"): (typeof documents)["\n    #graphql\n    query GetCurrentUser {\n        getCurrentUser {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n            language\n            isPro\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query GetCurrentUserPlaylists($input: getCurrentUserPlaylistsInput!) {\n    getCurrentUserPlaylists(input: $input) {\n      id\n      name\n      coverImageUrl\n      Visibility\n      totalTracks\n      authorId\n    }\n  }\n"): (typeof documents)["#graphql\n  query GetCurrentUserPlaylists($input: getCurrentUserPlaylistsInput!) {\n    getCurrentUserPlaylists(input: $input) {\n      id\n      name\n      coverImageUrl\n      Visibility\n      totalTracks\n      authorId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query GetExplorePlaylists($page: Int!) {\n    getExplorePlaylists(page: $page) {\n      id\n      name\n      coverImageUrl\n      Visibility\n      totalTracks\n      authorId\n    }\n  }\n"): (typeof documents)["#graphql\n  query GetExplorePlaylists($page: Int!) {\n    getExplorePlaylists(page: $page) {\n      id\n      name\n      coverImageUrl\n      Visibility\n      totalTracks\n      authorId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query GetSearchPlaylists($input: SearchInput!) {\n    getSearchPlaylists(input: $input) {\n      id\n      name\n      coverImageUrl\n      Visibility\n      totalTracks\n      authorId\n    }  \n  }\n"): (typeof documents)["#graphql\n  query GetSearchPlaylists($input: SearchInput!) {\n    getSearchPlaylists(input: $input) {\n      id\n      name\n      coverImageUrl\n      Visibility\n      totalTracks\n      authorId\n    }  \n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query GetPlaylistTracks($playlistId: String!) {\n    getPlaylistTracks(playlistId: $playlistId) {\n      id\n      title\n      coverImageUrl\n      visibility\n      tracks {\n        id    \n        title            \n        singer         \n        starCast\n        duration             \n        coverImageUrl      \n        videoUrl\n        audioFileUrl  \n        hasLiked\n        authorId \n        createdAt\n      }\n      authorId\n    }\n  }\n"): (typeof documents)["#graphql\n  query GetPlaylistTracks($playlistId: String!) {\n    getPlaylistTracks(playlistId: $playlistId) {\n      id\n      title\n      coverImageUrl\n      visibility\n      tracks {\n        id    \n        title            \n        singer         \n        starCast\n        duration             \n        coverImageUrl      \n        videoUrl\n        audioFileUrl  \n        hasLiked\n        authorId \n        createdAt\n      }\n      authorId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query GetFeedTracks {\n    getFeedTracks {\n      id   \n      title            \n      singer          \n      starCast\n      duration             \n      coverImageUrl    \n      videoUrl\n      audioFileUrl \n      hasLiked\n      authorId\n    }\n  }\n"): (typeof documents)["#graphql\n  query GetFeedTracks {\n    getFeedTracks {\n      id   \n      title            \n      singer          \n      starCast\n      duration             \n      coverImageUrl    \n      videoUrl\n      audioFileUrl \n      hasLiked\n      authorId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query GetExploreTracks($page: Int!) {\n    getExploreTracks(page: $page) {\n      id   \n      title            \n      singer          \n      starCast\n      duration             \n      coverImageUrl    \n      videoUrl\n      audioFileUrl \n      hasLiked\n      authorId\n    }\n  }\n"): (typeof documents)["#graphql\n  query GetExploreTracks($page: Int!) {\n    getExploreTracks(page: $page) {\n      id   \n      title            \n      singer          \n      starCast\n      duration             \n      coverImageUrl    \n      videoUrl\n      audioFileUrl \n      hasLiked\n      authorId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query GetTracksByGenreId($input: GetTracksByGenreIdInput!) {\n    getTracksByGenreId(input: $input) {\n      id\n      title\n      singer\n      starCast\n      duration\n      coverImageUrl\n      videoUrl\n      audioFileUrl\n      hasLiked\n      authorId\n    }\n  }\n"): (typeof documents)["#graphql\n  query GetTracksByGenreId($input: GetTracksByGenreIdInput!) {\n    getTracksByGenreId(input: $input) {\n      id\n      title\n      singer\n      starCast\n      duration\n      coverImageUrl\n      videoUrl\n      audioFileUrl\n      hasLiked\n      authorId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query GetRecentTracks($recentTracks: [String!]!) {\n    getRecentTracks(recentTracks: $recentTracks) {\n      id   \n      title            \n      singer          \n      starCast\n      duration             \n      coverImageUrl    \n      videoUrl\n      audioFileUrl \n      hasLiked\n      authorId  \n    }\n  }\n"): (typeof documents)["#graphql\n  query GetRecentTracks($recentTracks: [String!]!) {\n    getRecentTracks(recentTracks: $recentTracks) {\n      id   \n      title            \n      singer          \n      starCast\n      duration             \n      coverImageUrl    \n      videoUrl\n      audioFileUrl \n      hasLiked\n      authorId  \n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query GetSearchTracks($input: SearchInput!) {\n    getSearchTracks(input: $input) {\n      id\n      title\n      singer\n      starCast\n      duration\n      coverImageUrl\n      videoUrl\n      audioFileUrl\n      hasLiked\n      authorId\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetSearchTracks($input: SearchInput!) {\n    getSearchTracks(input: $input) {\n      id\n      title\n      singer\n      starCast\n      duration\n      coverImageUrl\n      videoUrl\n      audioFileUrl\n      hasLiked\n      authorId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query GetLikedTracks {\n    getLikedTracks {\n      id\n      title\n      singer\n      starCast\n      duration\n      coverImageUrl\n      videoUrl\n      audioFileUrl\n      hasLiked\n      authorId\n    }\n  }\n\n"): (typeof documents)["\n  #graphql\n  query GetLikedTracks {\n    getLikedTracks {\n      id\n      title\n      singer\n      starCast\n      duration\n      coverImageUrl\n      videoUrl\n      audioFileUrl\n      hasLiked\n      authorId\n    }\n  }\n\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    query GetUserProfile($userId: String!) {\n      getUserProfile(userId: $userId) {\n            id\n            username\n            fullName\n            profileImageURL\n            bio\n            totalTracks\n            followedByMe\n      }\n    }\n        "): (typeof documents)["#graphql\n    query GetUserProfile($userId: String!) {\n      getUserProfile(userId: $userId) {\n            id\n            username\n            fullName\n            profileImageURL\n            bio\n            totalTracks\n            followedByMe\n      }\n    }\n        "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query GetSearchUser($input: SearchInput!) {\n  getSearchUser(input: $input) {\n    id\n    username\n    profileImageURL\n  }\n}\n"): (typeof documents)["#graphql\n  query GetSearchUser($input: SearchInput!) {\n  getSearchUser(input: $input) {\n    id\n    username\n    profileImageURL\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    query GetUserTracks($payload: GetUserTracksPayload!) {\n      getUserTracks(payload: $payload) {\n        id   \n        title            \n        singer          \n        starCast\n        duration             \n        coverImageUrl    \n        videoUrl\n        audioFileUrl \n        hasLiked\n        authorId\n        createdAt\n      }\n    }\n"): (typeof documents)["#graphql\n    query GetUserTracks($payload: GetUserTracksPayload!) {\n      getUserTracks(payload: $payload) {\n        id   \n        title            \n        singer          \n        starCast\n        duration             \n        coverImageUrl    \n        videoUrl\n        audioFileUrl \n        hasLiked\n        authorId\n        createdAt\n      }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;