import { graphql } from "gql"

export const getUserProfileQuery = graphql(`#graphql
    query GetUserProfile($username: String!) {
      getUserProfile(username: $username) {
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
    artist 
    duration           
    coverImageUrl     
    audioFileUrl            
    hasLiked 
    authorName
      }
    }
            `)
