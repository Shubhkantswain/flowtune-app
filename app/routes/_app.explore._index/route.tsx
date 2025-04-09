import { useLoaderData } from "@remix-run/react";
import { useCurrentUser } from "~/hooks/auth";
import { Track } from "gql/graphql";
import { createGraphqlClient } from "~/clients/api";
import { getExploreTracksQuery, getFeedTracksQuery } from "~/graphql/queries/track";
import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { MetaFunction } from "@remix-run/cloudflare";
import TrackSection from "../_app._index/_components/TrackSection";
import { useEffect, useState } from "react";
import usePlaylistStore from "~/store/usePlaylistStore";
import { useGetExploreTracks } from "~/hooks/track";
import { getTitle } from "~/utils";
import { SECTION_SIZE } from "~/constants";
import Footer from "../_app/components/Footer";

export const meta: MetaFunction = () => {
  return [
    { title: "FlowTune - Explore" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

interface exploreTracksData {
  tracks: Track[],
  isAuthenticated: boolean
}

export async function loader({ request }: LoaderFunctionArgs): Promise<exploreTracksData> {
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
    const { getExploreTracks } = await graphqlClient.request(getExploreTracksQuery, { page: 1 });

    return {
      tracks: getExploreTracks || [],
      isAuthenticated: token ? true : false,
    }
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return {
      tracks: [],
      isAuthenticated: true,
    }
  }
}

const AppleMusicHomepage: React.FC = () => {
  // Fetching data
  const exploreTracksData = useLoaderData<exploreTracksData>();

  // State management
  const [page, setPage] = useState(1);
  const [exploreTracks, setExploreTracks] = useState<Track[][]>([]);

  // Internal Hooks
  const { setActiveSectionIndex } = usePlaylistStore();
  const { data, isLoading } = useGetExploreTracks(page);

  // Derived data
  const trackSections = [
    exploreTracksData.tracks.slice(0, SECTION_SIZE),
    exploreTracksData.tracks.slice(SECTION_SIZE, SECTION_SIZE * 2),
    exploreTracksData.tracks.slice(SECTION_SIZE * 2, SECTION_SIZE * 3),
  ];

  useEffect(() => {
    if (data?.length) {
      setExploreTracks(prev => {
        const newSections = [
          data.slice(0, SECTION_SIZE),
          data.slice(SECTION_SIZE, SECTION_SIZE * 2),
        ];

        // If page is 2, include both the initial trackSections and new data
        if (page === 2) {
          const initialSections = [
            exploreTracksData.tracks.slice(0, SECTION_SIZE),
            exploreTracksData.tracks.slice(SECTION_SIZE, SECTION_SIZE * 2),
            exploreTracksData.tracks.slice(SECTION_SIZE * 2, SECTION_SIZE * 3),
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
    if (!exploreTracksData.isAuthenticated) {
      localStorage.setItem("__FlowTune_Token", "")
    }
  }, [exploreTracksData.isAuthenticated])

  console.log("exploreTracksData", exploreTracks);

  return (
    <>
      <div className="-mt-5 md:-mt-10 lg:-mt-10">

        {exploreTracks.length > 0
          ? exploreTracks.map((section, index) => (
            <TrackSection key={index} tracks={section} index={index} title={getTitle(index)} />
          ))
          : trackSections.map((section, index) => (
            <TrackSection key={index} tracks={section} index={index} title={getTitle(index)} />
          ))}
      </div>

      <button
        onClick={() => setPage(page + 1)}
        aria-label="Load more tracks"
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
