import { GraphQLClient } from "graphql-request";

export const createGraphqlClient = (token?: string) => {
    const Token = token || ""

    return new GraphQLClient('https://flowtune-app-server.onrender.com/graphql', {
        // credentials: "include",
        headers: {
            Authorization: `Bearer ${Token}`
        },
    });

}


// https://flowtune-app-server.onrender.com/graphql
// http://localhost:4000/graphql