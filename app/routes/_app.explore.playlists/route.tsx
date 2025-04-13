import { useLoaderData } from "@remix-run/react";
import { useCurrentUser } from "~/hooks/auth";
import { createGraphqlClient } from "~/clients/api";
import { LoaderFunctionArgs, redirect } from "@remix-run/cloudflare";
import { MetaFunction } from "@remix-run/cloudflare";
import { useEffect, useState } from "react";
import usePlaylistStore from "~/store/usePlaylistStore";
import { getTitle } from "~/utils";
import { getExplorePlaylistsQuery } from "~/graphql/queries/playlist";
import PlaylistSection from "./_components/PlaylistSection";
import Footer from "../../components/Footer";
import { useGetExplorePlaylists } from "~/hooks/playlist";
import { SECTION_SIZE } from "~/constants";
import { Playlist } from "gql/graphql";

export const meta: MetaFunction = () => {
    return [
        { title: "FlowTune - Explore | Playlists" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

interface explorePlaylistData {
    playlists: Playlist[],
    isAuthenticated: boolean
}

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

        return {
            playlists: getExplorePlaylists || [],
            isAuthenticated: token ? true : false,
        };
    } catch (error) {
        console.error("Error fetching playlists:", error);
        return {
            playlists: [],
            isAuthenticated: false
        };
    }
}

const AppleMusicHomepage: React.FC = () => {
    // Fetching data
    const explorePlaylistsData = useLoaderData<explorePlaylistData>();

    // State management
    const [page, setPage] = useState(1);
    const [explorePlaylists, setExplorePlaylists] = useState<Playlist[][]>([]);

    // Internal Hooks
    const { setActiveSectionIndex } = usePlaylistStore();
    const { data, isLoading } = useGetExplorePlaylists(page);

    // Derived data
    const playlistSections = [
        explorePlaylistsData.playlists.slice(0, SECTION_SIZE),
        explorePlaylistsData.playlists.slice(SECTION_SIZE, SECTION_SIZE * 2),
        explorePlaylistsData.playlists.slice(SECTION_SIZE * 2, SECTION_SIZE * 3),
    ];

    useEffect(() => {
        if (data?.length) {
            setExplorePlaylists(prev => {
                const newSections = [
                    data.slice(0, SECTION_SIZE),
                    data.slice(SECTION_SIZE, SECTION_SIZE * 2),
                ];

                // If page is 2, include both the initial playlistSections and new data
                if (page === 2) {
                    const initialSections = [
                        explorePlaylistsData.playlists.slice(0, SECTION_SIZE),
                        explorePlaylistsData.playlists.slice(SECTION_SIZE, SECTION_SIZE * 2),
                        explorePlaylistsData.playlists.slice(SECTION_SIZE * 2, SECTION_SIZE * 3),
                    ];
                    return [...initialSections, ...newSections];

                }

                // For other pages, just append new sections
                return [...prev, ...newSections];
            });
        }
    }, [data])

    useEffect(() => {
        setActiveSectionIndex(-1)
    }, [])

    useEffect(() => {
        if (!explorePlaylistsData.isAuthenticated) {
            localStorage.setItem("__FlowTune_Token", "")
        }
    }, [explorePlaylistsData.isAuthenticated])

    return (
        <>
            <div className="-mt-5 md:-mt-10 lg:-mt-10">
                {explorePlaylists.length > 0
                    ? explorePlaylists.map((section, index) => (
                        <PlaylistSection key={index} playlists={section} title={getTitle(index)} />
                    ))
                    : playlistSections.map((section, index) => (
                        <PlaylistSection key={index} playlists={section} title={getTitle(index)} />
                    ))}
            </div>

            <button
                onClick={() => setPage(page + 1)}
                aria-label="Load more Playlist"
                className="mx-auto block px-4 py-2 mt-5 bg-white text-gray-800 text-sm font-medium rounded-full border border-gray-200 hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow transition-all duration-200 w-fit"
                disabled={isLoading}
            >
                {isLoading && page != 1 ? (
                    <span className="flex items-center justify-center gap-1.5">
                        <svg className="animate-spin h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                    </span>
                ) : (
                    'Load More'
                )}
            </button>

            <Footer />
        </>
    );
};

export default AppleMusicHomepage;