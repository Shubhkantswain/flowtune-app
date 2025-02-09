import { GraphQLClient } from "graphql-request";

export const createGraphqlClient = (token?: string) => {
    const Token = token || ""

    return new GraphQLClient('https://remix-project-server.onrender.com/graphql', {
        credentials: "same-origin",
        headers: {
            Authorization: `Bearer ${Token}`
        },
    });

}