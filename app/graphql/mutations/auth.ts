import { graphql } from "gql"

export const SignupUserMutation = graphql(`#graphql
    mutation SignupUser($input: SignupUserInput!) {
        signupUser(input: $input)
    }
`)

export const VerifyEmailMutation = graphql(`#graphql
    mutation VerifyEmail($input: VerifyEmailInput!) {
        verifyEmail(input: $input) {
            id
            email
            username
            fullName
            bio
            profileImageURL
            language
            isPro
            authToken
        }
    }
`)

export const LoginUserMutation = graphql(`#graphql
    mutation LoginUser($input: LoginUserInput!) {
        loginUser(input: $input) {
            id
            email
            username
            fullName
            bio
            profileImageURL
            language
            isPro
            authToken
        }
    }
`)

export const ForgotPasswordMutation = graphql(`#graphql
    mutation ForgotPassword($usernameOrEmail: String!) {
        forgotPassword(usernameOrEmail: $usernameOrEmail)
    }
`)

export const ResetPasswordMutation = graphql(`#graphql
    mutation ResetPassword($input: ResetPasswordInput!) {
        resetPassword(input: $input)
    }
`)