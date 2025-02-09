import { useMutation, useQuery } from "@tanstack/react-query";
import { createGraphqlClient } from "~/clients/api";
import { setCookieMutation } from "~/graphql/mutations/auth";
import { getCurrentUserQuery } from "~/graphql/queries/auth";

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: async () => {
            let token = ""
            if (typeof window !== "undefined") { 
                token = localStorage.getItem("__FlowTune_Token") || ""
            }
            
            const graphqlClient = createGraphqlClient(token)
            const { getCurrentUser } = await graphqlClient.request(getCurrentUserQuery)
            return getCurrentUser
        },
    });
};

export const useSetCookie = () => {
    return useMutation({
        mutationFn: async (authToken: string) => {
            const graphqlClient = createGraphqlClient()
            const { setCookie } = await graphqlClient.request(setCookieMutation, { authToken })
            return setCookie
        },
        onError: () => {

        }
    }
    )
}