import { useMutation } from "@tanstack/react-query";
import { CreateTrackPayload } from "gql/graphql";
import { toast } from "sonner";
import { createGraphqlClient } from "~/clients/api";
import { createTrackMutation, likeTrackMutation } from "~/graphql/mutations/track";

export const useCreateTrack = () => {
    return useMutation({
        mutationFn: async (trackData: CreateTrackPayload) => {
            if (!trackData.audioFileUrl) {
                throw new Error("Please select an audio file.");
            }

            if (!trackData.title) {
                throw new Error("Title is required!");
            }

            // Convert duration string to a number for comparison
            const durationInSeconds = parseFloat(trackData.duration);
            if (isNaN(durationInSeconds) || durationInSeconds <= 10) {
                throw new Error("Audio must be longer than 10 seconds!");
            }
            let token = ""
            if (typeof window !== "undefined") {
                token = localStorage.getItem("__FlowTune_Token") || ""
            }
            const graphqlClient = createGraphqlClient(token);
            try {
                const { createTrack } = await graphqlClient.request(createTrackMutation, {
                    payload: trackData,
                });
                return createTrack;
            } catch (error: any) {
                throw new Error(error?.response?.errors?.[0]?.message || "Something went wrong");
            }
        },
        onSuccess: () => {
            toast.success('Track created successfully', { position: "top-center" })
        },
        onError: (error) => {
            const errorMessage = error.message.split(":").pop()?.trim() || "Something went wrong";
            toast.success(errorMessage)
        },
    });
};

export const useLikeTrack = () => {
    return useMutation({
        mutationFn: async (trackId: string) => {
            try {
                let token = ""
                if (typeof window !== "undefined") {
                    token = localStorage.getItem("__FlowTune_Token") || ""
                }
                const graphqlClient = createGraphqlClient(token);
                const { likeTrack } = await graphqlClient.request(likeTrackMutation, { trackId });
                return likeTrack;
            } catch (error: any) {
                throw new Error(error?.response?.errors?.[0]?.message || "Something went wrong");
            }
        },
        onSuccess: (data) => {
            if(data){
                toast.success('Track Added To Your Favourite')
            } else {
                toast.success('Track Remove From Your Favourite')
            }

        },
        onError: (error: any) => {
            const errorMessage = error.message.split(':').pop()?.trim() || "Something went wrong";
            toast.error(errorMessage);
        },
    });
};