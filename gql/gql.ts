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
    "\n    #graphql\n    mutation SignupUser($input: SignupUserInput!) {\n        signupUser(input: $input)\n    }\n": typeof types.SignupUserDocument,
    "\n    #graphql\n    mutation VerifyEmail($input: VerifyEmailInput!) {\n        verifyEmail(input: $input) {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n            authToken\n        }\n    }\n": typeof types.VerifyEmailDocument,
    "\n    #graphql\n    mutation LoginUser($input: LoginUserInput!) {\n        loginUser(input: $input) {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n            authToken\n        }\n    }\n": typeof types.LoginUserDocument,
    "#graphql\n    mutation SendReq($text: String!) {\n  sendReq(text: $text)\n}\n": typeof types.SendReqDocument,
    "\n    #graphql\n    mutation CreateTrack($payload: createTrackPayload!) {\n        createTrack(payload: $payload) {\n            id\n            title\n            artist\n            duration\n            coverImageUrl\n            audioFileUrl\n            hasLiked\n            authorName\n        }\n    }\n": typeof types.CreateTrackDocument,
    "\n    #graphql\n    mutation LikeTrack($trackId: String!) {\n        likeTrack(trackId: $trackId)\n    }\n": typeof types.LikeTrackDocument,
    "\n    #graphql\n    query GetCurrentUser {\n        getCurrentUser {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n        }\n    }\n": typeof types.GetCurrentUserDocument,
    "\n    #graphql\n    query GetFeedTracks {\n        getFeedTracks {\n            id\n            title\n            artist\n            duration\n            coverImageUrl\n            audioFileUrl\n            hasLiked\n            authorName\n        }\n    }\n": typeof types.GetFeedTracksDocument,
    "\n  #graphql\n  query GetLikedTracks {\n    getLikedTracks {\n      id\n      title\n      artist\n      duration\n      coverImageUrl\n      audioFileUrl\n      hasLiked\n      authorName\n    }\n  }\n": typeof types.GetLikedTracksDocument,
    "#graphql\n    query GetUserProfile($username: String!) {\n      getUserProfile(username: $username) {\n            id\n            username\n            fullName\n            profileImageURL\n            bio\n            totalTracks\n            followedByMe\n      }\n    }\n        ": typeof types.GetUserProfileDocument,
    "#graphql\n      query GetUserTracks($payload: GetUserTracksPayload!) {\n      getUserTracks(payload: $payload) {\n        \n    id                  \n    title           \n    artist \n    duration           \n    coverImageUrl     \n    audioFileUrl            \n    hasLiked \n    authorName\n      }\n    }\n            ": typeof types.GetUserTracksDocument,
};
const documents: Documents = {
    "\n    #graphql\n    mutation SignupUser($input: SignupUserInput!) {\n        signupUser(input: $input)\n    }\n": types.SignupUserDocument,
    "\n    #graphql\n    mutation VerifyEmail($input: VerifyEmailInput!) {\n        verifyEmail(input: $input) {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n            authToken\n        }\n    }\n": types.VerifyEmailDocument,
    "\n    #graphql\n    mutation LoginUser($input: LoginUserInput!) {\n        loginUser(input: $input) {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n            authToken\n        }\n    }\n": types.LoginUserDocument,
    "#graphql\n    mutation SendReq($text: String!) {\n  sendReq(text: $text)\n}\n": types.SendReqDocument,
    "\n    #graphql\n    mutation CreateTrack($payload: createTrackPayload!) {\n        createTrack(payload: $payload) {\n            id\n            title\n            artist\n            duration\n            coverImageUrl\n            audioFileUrl\n            hasLiked\n            authorName\n        }\n    }\n": types.CreateTrackDocument,
    "\n    #graphql\n    mutation LikeTrack($trackId: String!) {\n        likeTrack(trackId: $trackId)\n    }\n": types.LikeTrackDocument,
    "\n    #graphql\n    query GetCurrentUser {\n        getCurrentUser {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n        }\n    }\n": types.GetCurrentUserDocument,
    "\n    #graphql\n    query GetFeedTracks {\n        getFeedTracks {\n            id\n            title\n            artist\n            duration\n            coverImageUrl\n            audioFileUrl\n            hasLiked\n            authorName\n        }\n    }\n": types.GetFeedTracksDocument,
    "\n  #graphql\n  query GetLikedTracks {\n    getLikedTracks {\n      id\n      title\n      artist\n      duration\n      coverImageUrl\n      audioFileUrl\n      hasLiked\n      authorName\n    }\n  }\n": types.GetLikedTracksDocument,
    "#graphql\n    query GetUserProfile($username: String!) {\n      getUserProfile(username: $username) {\n            id\n            username\n            fullName\n            profileImageURL\n            bio\n            totalTracks\n            followedByMe\n      }\n    }\n        ": types.GetUserProfileDocument,
    "#graphql\n      query GetUserTracks($payload: GetUserTracksPayload!) {\n      getUserTracks(payload: $payload) {\n        \n    id                  \n    title           \n    artist \n    duration           \n    coverImageUrl     \n    audioFileUrl            \n    hasLiked \n    authorName\n      }\n    }\n            ": types.GetUserTracksDocument,
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
export function graphql(source: "\n    #graphql\n    mutation SignupUser($input: SignupUserInput!) {\n        signupUser(input: $input)\n    }\n"): (typeof documents)["\n    #graphql\n    mutation SignupUser($input: SignupUserInput!) {\n        signupUser(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    mutation VerifyEmail($input: VerifyEmailInput!) {\n        verifyEmail(input: $input) {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n            authToken\n        }\n    }\n"): (typeof documents)["\n    #graphql\n    mutation VerifyEmail($input: VerifyEmailInput!) {\n        verifyEmail(input: $input) {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n            authToken\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    mutation LoginUser($input: LoginUserInput!) {\n        loginUser(input: $input) {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n            authToken\n        }\n    }\n"): (typeof documents)["\n    #graphql\n    mutation LoginUser($input: LoginUserInput!) {\n        loginUser(input: $input) {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n            authToken\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    mutation SendReq($text: String!) {\n  sendReq(text: $text)\n}\n"): (typeof documents)["#graphql\n    mutation SendReq($text: String!) {\n  sendReq(text: $text)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    mutation CreateTrack($payload: createTrackPayload!) {\n        createTrack(payload: $payload) {\n            id\n            title\n            artist\n            duration\n            coverImageUrl\n            audioFileUrl\n            hasLiked\n            authorName\n        }\n    }\n"): (typeof documents)["\n    #graphql\n    mutation CreateTrack($payload: createTrackPayload!) {\n        createTrack(payload: $payload) {\n            id\n            title\n            artist\n            duration\n            coverImageUrl\n            audioFileUrl\n            hasLiked\n            authorName\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    mutation LikeTrack($trackId: String!) {\n        likeTrack(trackId: $trackId)\n    }\n"): (typeof documents)["\n    #graphql\n    mutation LikeTrack($trackId: String!) {\n        likeTrack(trackId: $trackId)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    query GetCurrentUser {\n        getCurrentUser {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n        }\n    }\n"): (typeof documents)["\n    #graphql\n    query GetCurrentUser {\n        getCurrentUser {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    query GetFeedTracks {\n        getFeedTracks {\n            id\n            title\n            artist\n            duration\n            coverImageUrl\n            audioFileUrl\n            hasLiked\n            authorName\n        }\n    }\n"): (typeof documents)["\n    #graphql\n    query GetFeedTracks {\n        getFeedTracks {\n            id\n            title\n            artist\n            duration\n            coverImageUrl\n            audioFileUrl\n            hasLiked\n            authorName\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query GetLikedTracks {\n    getLikedTracks {\n      id\n      title\n      artist\n      duration\n      coverImageUrl\n      audioFileUrl\n      hasLiked\n      authorName\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetLikedTracks {\n    getLikedTracks {\n      id\n      title\n      artist\n      duration\n      coverImageUrl\n      audioFileUrl\n      hasLiked\n      authorName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    query GetUserProfile($username: String!) {\n      getUserProfile(username: $username) {\n            id\n            username\n            fullName\n            profileImageURL\n            bio\n            totalTracks\n            followedByMe\n      }\n    }\n        "): (typeof documents)["#graphql\n    query GetUserProfile($username: String!) {\n      getUserProfile(username: $username) {\n            id\n            username\n            fullName\n            profileImageURL\n            bio\n            totalTracks\n            followedByMe\n      }\n    }\n        "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n      query GetUserTracks($payload: GetUserTracksPayload!) {\n      getUserTracks(payload: $payload) {\n        \n    id                  \n    title           \n    artist \n    duration           \n    coverImageUrl     \n    audioFileUrl            \n    hasLiked \n    authorName\n      }\n    }\n            "): (typeof documents)["#graphql\n      query GetUserTracks($payload: GetUserTracksPayload!) {\n      getUserTracks(payload: $payload) {\n        \n    id                  \n    title           \n    artist \n    duration           \n    coverImageUrl     \n    audioFileUrl            \n    hasLiked \n    authorName\n      }\n    }\n            "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;