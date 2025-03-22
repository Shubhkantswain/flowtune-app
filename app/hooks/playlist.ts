import { useMutation, useQuery } from "@tanstack/react-query";
import { AddSongToPlaylistInput } from "gql/graphql";
import { toast } from "sonner";
import { createGraphqlClient } from "~/clients/api";
import { AddSongToPlaylistMutation } from "~/graphql/mutations/playlist";
import { getCurrentUserPlaylistsQuery } from "~/graphql/queries/playlist";

export const useAddSongToPlaylist = () => {
    return useMutation({
        mutationFn: async (payload: AddSongToPlaylistInput) => {
            try {
                let token = ""
                if (typeof window !== "undefined") {
                    token = localStorage.getItem("__FlowTune_Token") || ""
                }
                const graphqlClient = createGraphqlClient(token);
                const { addSongToPlaylist } = await graphqlClient.request(AddSongToPlaylistMutation, {
                    payload,
                });
                return addSongToPlaylist;
            } catch (error: any) {
                throw new Error(
                    error?.response?.errors?.[0]?.message || "Something went wrong"
                );
            }
        },
        onSuccess: () => {
            toast.success("Playlist created successfully");
        },
        onError: (error: any) => {
            const errorMessage = error.message.split(":").pop()?.trim() || "Something went wrong";
            toast.error(errorMessage);
        },
    });
};


export const useGetCurrentUserPlaylists = () => {
    return useQuery({
        queryKey: ['CurrentUserPlaylists'],
        queryFn: async () => {
            let token = ""
            if (typeof window !== "undefined") {
                token = localStorage.getItem("__FlowTune_Token") || ""
            }
            const graphqlClient = createGraphqlClient(token)
            const { getCurrentUserPlaylists } = await graphqlClient.request(getCurrentUserPlaylistsQuery)
            return getCurrentUserPlaylists
        }
    })
}