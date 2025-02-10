import { graphql } from "gql";

export const createTrackMutation = graphql(`
    #graphql
    mutation CreateTrack($payload: createTrackPayload!) {
        createTrack(payload: $payload) {
            id
            title
            artist
            duration
            coverImageUrl
            audioFileUrl
            hasLiked
            authorName
        }
    }
`)