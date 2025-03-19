import { useQuery } from "@tanstack/react-query"
import { createGraphqlClient } from "~/clients/api"
import { getUserTracksQuery } from "~/graphql/queries/user"

export const useGetUserTracks = (username: string, page: number) => {
    return useQuery({
        queryKey: ['userTracks', username, page],
        queryFn: async () => {
            if(page != 1){
                const graphqlClient = createGraphqlClient()
                const { getUserTracks } = await graphqlClient.request(getUserTracksQuery, { payload: { username, page } })
                return getUserTracks
            }
            return []
        }
    })
}
