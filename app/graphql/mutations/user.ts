import { graphql } from "gql";

export const ChangeMusicPreferenceMutation = graphql(`#graphql
mutation ChangeMusicPreference($language: String!) {
  changeMusicPreference(language: $language)
}
`)

export const followUserMutation = graphql(`#graphql
mutation FollowUser($userId: String!) {
  followUser(userId: $userId)
}
  `)

export const UpdateUserProfileMutation = graphql(`#graphql
  mutation UpdateUserProfile($payload: UpdateUserProfilePayload!) {
    updateUserProfile(payload: $payload)
  }
`)