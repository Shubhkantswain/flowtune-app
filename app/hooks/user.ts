import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { createGraphqlClient } from "~/clients/api"
import { followUserMutation } from "~/graphql/mutations/user"
import { getUserTracksQuery } from "~/graphql/queries/user"

export const useGetUserTracks = (userId: string, page: number) => {
    return useQuery({
        queryKey: ['userTracks', userId, page],
        queryFn: async () => {
            if (page != 1) {
                const graphqlClient = createGraphqlClient()
                const { getUserTracks } = await graphqlClient.request(getUserTracksQuery, { payload: { userId: userId, page } })
                return getUserTracks
            }
            return []
        }
    })
}

export const useFollowUser = () => {
    return useMutation({
        mutationFn: async (userId: string) => {
            if(userId == "cm8qvbud20000w2k0fuxn03me"){
                throw new Error("Sorry, but you can not follow this page")
            }
            let token = ""
            if (typeof window !== "undefined") {
                token = localStorage.getItem("__FlowTune_Token") || ""
            }
            const graphqlClient = createGraphqlClient(token);
            try {
                const { followUser } = await graphqlClient.request(followUserMutation, { userId });
                return followUser;
            } catch (error: any) {
                throw new Error(error?.response?.errors?.[0]?.message || "Something went wrong");
            }
        },
        onSuccess: (data: boolean) => {
            if (data) {
                toast.success('Follow User successfully', { position: "top-center" })
            } else {
                toast.success('Unfollow User successfully', { position: "top-center" })
            }
        },
        onError: (error) => {
            const errorMessage = error.message.split(":").pop()?.trim() || "Something went wrong";
            toast.success(errorMessage)
            console.log(error);

        },
    });
};