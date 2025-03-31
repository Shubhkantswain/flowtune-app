import { graphql } from "gql";

export const getCurrentUserPlaylistsQuery = graphql(`#graphql
  query GetCurrentUserPlaylists {
    getCurrentUserPlaylists {
      id
      name
      coverImageUrl
      Visibility
      totalTracks
      authorId
    }
  }
`)

export const getPlaylistTracksQuery = graphql(`#graphql
  query GetPlaylistTracks($playlistId: String!) {
    getPlaylistTracks(playlistId: $playlistId) {
      id
      title
      coverImageUrl
      tracks {
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
  }
`);
