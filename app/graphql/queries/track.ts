import { graphql } from "gql";

export const getFeedTracksQuery = graphql(`#graphql
  query GetFeedTracks {
    getFeedTracks {
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

export const getExploreTracksQuery = graphql(`#graphql
  query GetExploreTracks($page: Int!) {
    getExploreTracks(page: $page) {
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

export const getLikedTracksQuery = graphql(`#graphql
  query GetLikedTracks {
    getLikedTracks {
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