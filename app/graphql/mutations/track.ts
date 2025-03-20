import { graphql } from "gql";

export const createTrackMutation = graphql(`#graphql
    mutation CreateTrack($payload: createTrackPayload!) {
        createTrack(payload: $payload) 
    }
`)

export const likeTrackMutation = graphql(`#graphql
    mutation LikeTrack($trackId: String!) {
        likeTrack(trackId: $trackId)
    }
`)