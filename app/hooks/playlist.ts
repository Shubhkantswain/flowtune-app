import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddSongToPlaylistInput, CreatePlaylistInput, Playlist, RemoveSongFromPlaylistInput } from "gql/graphql";
import { toast } from "sonner";
import { createGraphqlClient } from "~/clients/api";
import { AddSongToPlaylistMutation, CreatePlaylistMutation, DeletePlaylistMutation, RemoveSongFromPlaylistMutation } from "~/graphql/mutations/playlist";
import { getCurrentUserPlaylistsQuery } from "~/graphql/queries/playlist";

export const useAddSongToPlaylist = () => {
    const queryClient = useQueryClient()

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
                console.log("i hope error", error);
                
                throw new Error(
                    error?.response?.errors?.[0]?.message || "Something went wrong"
                );
            }
        },
        onSuccess: (data: Playlist | null | undefined) => {
            if (data) {
                queryClient.setQueryData(["CurrentUserPlaylists"], (prev: Playlist[]) => {
                    return [...prev, data]
                })
            }
            toast.success("Playlist created successfully");

        },
        onError: (error: any) => {
            const errorMessage = error.message.split(":").pop()?.trim() || "Something went wrong";
            console.log("error msg", error);
            
            toast.error(errorMessage);
        },
    });
};

export const useCreatePlaylist = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (payload: CreatePlaylistInput) => {
            try {
                let token = ""
                if (typeof window !== "undefined") {
                    token = localStorage.getItem("__FlowTune_Token") || ""
                }
                const graphqlClient = createGraphqlClient(token);
                const { createPlaylist } = await graphqlClient.request(CreatePlaylistMutation, {
                    payload,
                });
                return createPlaylist;
            } catch (error: any) {
                console.log("i hope error", error);
                
                throw new Error(
                    error?.response?.errors?.[0]?.message || "Something went wrong"
                );
            }
        },
        onSuccess: (data: Playlist) => {
            if (data) {
                queryClient.setQueryData(["CurrentUserPlaylists"], (prev: Playlist[]) => {
                    if(prev){
                        return [...prev, data]
                    }
                })
            }
            toast.success("Playlist created successfully");

        },
        onError: (error: any) => {
            const errorMessage = error.message.split(":").pop()?.trim() || "Something went wrong";
            console.log("error msg", error);
            
            toast.error(errorMessage);
        },
    });
};

export const useRemoveSongFromPlaylist = () => {
    return useMutation({
        mutationFn: async (payload: RemoveSongFromPlaylistInput) => {
            try {
                let token = ""
                if (typeof window !== "undefined") {
                    token = localStorage.getItem("__FlowTune_Token") || ""
                }
                const graphqlClient = createGraphqlClient(token);
                const { removeSongFromPlaylist } = await graphqlClient.request(RemoveSongFromPlaylistMutation, {
                    payload,
                });
                return removeSongFromPlaylist;
            } catch (error: any) {
                throw new Error(
                    error?.response?.errors?.[0]?.message || "Something went wrong"
                );
            }
        },
        onSuccess: () => {
            toast.success("Track Remove from playlist");
        },
        onError: (error: any) => {
            const errorMessage = error.message.split(":").pop()?.trim() || "Something went wrong";
            toast.error(errorMessage);
        },
    });
};

export const useDeletePlaylist = () => {
    return useMutation({
        mutationFn: async (playlistId: string) => {
            try {
                let token = ""
                if (typeof window !== "undefined") {
                    token = localStorage.getItem("__FlowTune_Token") || ""
                }
                const graphqlClient = createGraphqlClient(token);
                const { deletePlaylist } = await graphqlClient.request(DeletePlaylistMutation, { playlistId });
                return deletePlaylist;
            } catch (error: any) {
                throw new Error(error?.response?.errors?.[0]?.message || "Something went wrong");
            }
        },
        onSuccess: (data) => {
            if (data) {
                toast.success('Playlist Delete Successfully')
            }
        },
        onError: (error: any) => {
            const errorMessage = error.message.split(':').pop()?.trim() || "Something went wrong";
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