import { GraphQLClient } from "graphql-request";

export const createGraphqlClient = (token?: string) => {
    const Token = token || ""

    return new GraphQLClient('http://localhost:4000/graphql', {
        // credentials: "include",
        headers: {
            Authorization: `Bearer ${Token}`
        },
    });

}