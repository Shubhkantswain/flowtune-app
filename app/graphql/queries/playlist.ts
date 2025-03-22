import { graphql } from "gql";

export const getCurrentUserPlaylistsQuery = graphql(`#graphql
  query GetCurrentUserPlaylists {
    getCurrentUserPlaylists {
  playlists {
    id
    name
    coverImageUrl
    totalTracks
    author
  }
      
    }
  }
    `)

    export const getPlaylistTracksQuery = graphql(`
      #graphql
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