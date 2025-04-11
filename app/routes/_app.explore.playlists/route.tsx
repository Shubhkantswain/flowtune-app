import { useLoaderData } from "@remix-run/react";
import { useCurrentUser } from "~/hooks/auth";
import { Playlist, Track } from "gql/graphql";
import { createGraphqlClient } from "~/clients/api";
import { getFeedTracksQuery } from "~/graphql/queries/track";
import { LoaderFunctionArgs, redirect } from "@remix-run/cloudflare";
import { MetaFunction } from "@remix-run/cloudflare";
import { useEffect } from "react";
import usePlaylistStore from "~/store/usePlaylistStore";
import { getTitle } from "~/utils";
import { getExplorePlaylistsQuery } from "~/graphql/queries/playlist";
import PlaylistSection from "./_components/PlaylistSection";
import Footer from "../../components/Footer";

export const meta: MetaFunction = () => {
    return [
        { title: "FlowTune - Explore | Playlists" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

export async function loader({ request }: LoaderFunctionArgs) {
    try {
        const cookieHeader = request.headers.get("Cookie");

        // Parse the cookie manually
        const cookies = Object.fromEntries(
            (cookieHeader || "")
                .split("; ")
                .map((c) => c.split("="))
                .map(([key, ...value]) => [key, value.join("=")])
        );

        // Extract the `__FlowTune_Token_server` cookie
        const token = cookies["__FlowTune_Token_server"];

        const graphqlClient = createGraphqlClient(token);
        const { getExplorePlaylists } = await graphqlClient.request(getExplorePlaylistsQuery, { page: 1 });

        return getExplorePlaylists || [];
    } catch (error) {
        console.error("Error fetching tracks:", error);
        return []; // Return an empty array to match the expected type
    }
}

const AppleMusicHomepage: React.FC = () => {
    const playlists = useLoaderData<Playlist[]>(); // Ensure type safety

    const sectionSize = 8;
    const playlistSections = [
        playlists.slice(0, sectionSize),
        playlists.slice(sectionSize, sectionSize * 2),
        playlists.slice(sectionSize * 2, sectionSize * 3),
    ];

    return (
        <>
            <div className="-mt-5 md:-mt-10 lg:-mt-10">
                {/* TRACK SECTIONS */}
                {playlistSections.map((section, index) => (
                    <PlaylistSection playlists={section} title={index == 0 ? " Classic & Clear": index == 1 ? "Discovery-Focused": "Music Lover’s Vibe"} />
                ))}
            </div>

            <Footer/>
        </>
    );
};

export default AppleMusicHomepage;