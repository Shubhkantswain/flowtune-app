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

export const getExplorePlaylistsQuery = graphql(`#graphql
  query GetExplorePlaylists($page: Int!) {
    getExplorePlaylists(page: $page) {
      id
      name
      coverImageUrl
      Visibility
      totalTracks
      authorId
    }
  }
`);


export const getSearchPlaylistsQuery = graphql(`#graphql
  query GetSearchPlaylists($input: SearchInput!) {
    getSearchPlaylists(input: $input) {
      id
      name
      coverImageUrl
      Visibility
      totalTracks
      authorId
    }
  }
`);

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
