/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n    #graphql\n    mutation SignupUser($input: SignupUserInput!) {\n        signupUser(input: $input)\n    }\n": typeof types.SignupUserDocument,
    "\n    #graphql\n    mutation VerifyEmail($input: VerifyEmailInput!) {\n        verifyEmail(input: $input) {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n            authToken\n        }\n    }\n": typeof types.VerifyEmailDocument,
    "\n    #graphql\n    mutation SetCookie($authToken: String!) {\n        setCookie(authToken: $authToken)\n    }\n": typeof types.SetCookieDocument,
    "\n    #graphql\n    mutation LoginUser($input: LoginUserInput!) {\n        loginUser(input: $input) {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n            authToken\n        }\n    }\n": typeof types.LoginUserDocument,
    "\n    #graphql\n    query GetCurrentUser {\n        getCurrentUser {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n        }\n    }\n": typeof types.GetCurrentUserDocument,
};
const documents: Documents = {
    "\n    #graphql\n    mutation SignupUser($input: SignupUserInput!) {\n        signupUser(input: $input)\n    }\n": types.SignupUserDocument,
    "\n    #graphql\n    mutation VerifyEmail($input: VerifyEmailInput!) {\n        verifyEmail(input: $input) {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n            authToken\n        }\n    }\n": types.VerifyEmailDocument,
    "\n    #graphql\n    mutation SetCookie($authToken: String!) {\n        setCookie(authToken: $authToken)\n    }\n": types.SetCookieDocument,
    "\n    #graphql\n    mutation LoginUser($input: LoginUserInput!) {\n        loginUser(input: $input) {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n            authToken\n        }\n    }\n": types.LoginUserDocument,
    "\n    #graphql\n    query GetCurrentUser {\n        getCurrentUser {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n        }\n    }\n": types.GetCurrentUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    mutation SignupUser($input: SignupUserInput!) {\n        signupUser(input: $input)\n    }\n"): (typeof documents)["\n    #graphql\n    mutation SignupUser($input: SignupUserInput!) {\n        signupUser(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    mutation VerifyEmail($input: VerifyEmailInput!) {\n        verifyEmail(input: $input) {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n            authToken\n        }\n    }\n"): (typeof documents)["\n    #graphql\n    mutation VerifyEmail($input: VerifyEmailInput!) {\n        verifyEmail(input: $input) {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n            authToken\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    mutation SetCookie($authToken: String!) {\n        setCookie(authToken: $authToken)\n    }\n"): (typeof documents)["\n    #graphql\n    mutation SetCookie($authToken: String!) {\n        setCookie(authToken: $authToken)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    mutation LoginUser($input: LoginUserInput!) {\n        loginUser(input: $input) {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n            authToken\n        }\n    }\n"): (typeof documents)["\n    #graphql\n    mutation LoginUser($input: LoginUserInput!) {\n        loginUser(input: $input) {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n            authToken\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    query GetCurrentUser {\n        getCurrentUser {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n        }\n    }\n"): (typeof documents)["\n    #graphql\n    query GetCurrentUser {\n        getCurrentUser {\n            id\n            email\n            username\n            fullName\n            bio\n            profileImageURL\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;