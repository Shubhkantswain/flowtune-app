import { graphql } from "gql";

export const getFeedTracksQuery = graphql(`
    #graphql
    query GetFeedTracks {
        getFeedTracks {
            id
            title
            artist
            duration
            coverImageUrl
            audioFileUrl
            hasLiked
            videoUrl
            authorName
        }
    }
`)

export const getLikedTracksQuery = graphql(`
  #graphql
  query GetLikedTracks {
    getLikedTracks {
      id
      title
      artist
      duration
      coverImageUrl
      audioFileUrl
      hasLiked
      videoUrl
      authorName
    }
  }
`)