import { graphql } from "gql";

//i hopew

export const getCurrentUserPlaylistsQuery = graphql(`#graphql
  query GetCurrentUserPlaylists($input: getCurrentUserPlaylistsInput!) {
    getCurrentUserPlaylists(input: $input) {
      id
      name
      coverImageUrl
      Visibility
      totalTracks
      authorId
    }
  }
`);


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
      visibility
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
        createdAt
      }
      authorId
    }
  }
`);
