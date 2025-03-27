import { graphql } from "gql";

export const ChangeMusicPreferenceMutation = graphql(`#graphql
mutation ChangeMusicPreference($language: String!) {
  changeMusicPreference(language: $language)
}
`)