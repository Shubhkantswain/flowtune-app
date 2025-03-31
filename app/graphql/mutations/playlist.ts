import { graphql } from "gql"

export const AddSongToPlaylistMutation = graphql(`#graphql
mutation AddSongToPlaylist($payload: AddSongToPlaylistInput!) {
  addSongToPlaylist(payload: $payload) {
    id
    name
    coverImageUrl
    Visibility
    totalTracks
    authorId
  }
}
`)

export const CreatePlaylistMutation = graphql(`#graphql
  mutation CreatePlaylist($payload: CreatePlaylistInput!) {
    createPlaylist(payload: $payload) {
      id
      name
      coverImageUrl
      Visibility
      totalTracks
      authorId
    }
  }
`);

export const RemoveSongFromPlaylistMutation = graphql(`#graphql
mutation RemoveSongFromPlaylist($payload: RemoveSongFromPlaylistInput!) {
  removeSongFromPlaylist(payload: $payload)
}
`)

export const DeletePlaylistMutation = graphql(`#graphql
  mutation DeletePlaylist($playlistId: String!) {
  deletePlaylist(playlistId: $playlistId)
}
`)

