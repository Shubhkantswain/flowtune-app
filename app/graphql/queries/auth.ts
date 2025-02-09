import { graphql } from "gql";

export const getCurrentUserQuery = graphql(`
    #graphql
    query GetCurrentUser {
        getCurrentUser {
            id
            email
            username
            fullName
            bio
            profileImageURL
        }
    }
`)