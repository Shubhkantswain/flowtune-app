import { GraphQLClient } from "graphql-request";

export const createGraphqlClient = (token?: string) => {
    return new GraphQLClient('https://remix-project-server.onrender.com/graphql', {
        headers: {
            Authorization: `Bearer ${token || ""}`,
            "Content-Type": "application/json",  // Ensure JSON format
        },
    });
};
