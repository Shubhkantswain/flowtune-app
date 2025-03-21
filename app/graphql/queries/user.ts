import { graphql } from "gql"

export const getUserProfileQuery = graphql(`#graphql
    query GetUserProfile($userId: String!) {
      getUserProfile(userId: $userId) {
            id
            username
            fullName
            profileImageURL
            bio
            totalTracks
            followedByMe
      }
    }
        `)
    
export const getUserTracksQuery = graphql(`#graphql
    query GetUserTracks($payload: GetUserTracksPayload!) {
      getUserTracks(payload: $payload) {
        id   
        title            
        singer          
        starCast
        duration             
        coverImageUrl    
        videoUrl
        audioFileUrl 
        hasLiked
        authorId
      }
    }
`)
