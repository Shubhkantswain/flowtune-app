import { useLoaderData } from "@remix-run/react";
import { useCurrentUser } from "~/hooks/auth";
import { Track } from "gql/graphql";
import { createGraphqlClient } from "~/clients/api";
import { getExploreTracksQuery, getFeedTracksQuery } from "~/graphql/queries/track";
import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { MetaFunction } from "@remix-run/cloudflare";
import TrackSection from "../../components/TrackSection";
import { useEffect, useState } from "react";
import usePlaylistStore from "~/store/usePlaylistStore";
import { useGetExploreTracks } from "~/hooks/track";
import { getTitle } from "~/utils";
import { SECTION_SIZE } from "~/constants";
import Footer from "../../components/Footer";
import { LoadingSpinnerIcon } from "~/Svgs";
import { useLikedTracksStore } from "~/store/useLikedTracksStore";
import { useCurrentActivePageStore } from "~/store/useCurrentActivePageStore";

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

  const { setCurrentPage, flag, setFlag } = useCurrentActivePageStore()
  const [exploreTracks, setExploreTracks] = useState<Track[][]>([]);

  const { setLikedTrackIds, likedTrackMap } = useLikedTracksStore()

  // Internal Hooks
  const { setActiveSectionIndex } = usePlaylistStore();
  const { data, isLoading } = useGetExploreTracks(page);

  // Derived dataactiveSectionIndex
  const trackSections = [
    exploreTracksData.tracks.slice(0, SECTION_SIZE),
    exploreTracksData.tracks.slice(SECTION_SIZE, SECTION_SIZE * 2),
    exploreTracksData.tracks.slice(SECTION_SIZE * 2, SECTION_SIZE * 3),
  ];

  //for active page and perform queryclient
  useEffect(() => {
    setCurrentPage(page)
    setFlag(true)
  }, [])

  useEffect(() => {
    if (data?.length) {
      setExploreTracks(prev => {
        if (flag) {
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
        }

        return prev
      });
    }
  }, [data])

  // useEffect(() => {
  //   const isFirstPage = page === 1;
  //   const sourceData = isFirstPage ? exploreTracksData.tracks : data ?? [];

  //   // Proper filter that returns boolean
  //   const newTracks = sourceData
  //     .filter(item => item.hasLiked)
  //     .map(item => item.id); // Convert to IDs if needed

  //   const existingLikedIds = Object.keys(likedTrackMap);

  //   setLikedTrackIds(isFirstPage ? newTracks : [...existingLikedIds, ...newTracks]);
  // }, [data]); // Added all dependencies

 // like store only store track that i recently like 
 // 
  useEffect(() => {
    setActiveSectionIndex(-1)
  }, [])

  useEffect(() => {
    if (!exploreTracksData.isAuthenticated) {
      localStorage.setItem("__FlowTune_Token", "")
    }
  }, [exploreTracksData.isAuthenticated])

  console.log("data----", data);

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
        onClick={() => {
          setPage(page + 1)
          setFlag(true)
        }}
        aria-label="Load more tracks"
        className="mx-auto block px-4 py-2 mt-5 text-white bg-[#292a2a] hover:bg-[#5D5E5E] text-sm font-medium rounded-full disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow transition-all duration-200 w-fit"
        disabled={isLoading}
      >
        {isLoading && page != 1 ? (
          <span className="flex items-center justify-center gap-1.5 text-white">
            <LoadingSpinnerIcon width="18" height="18" />
            Loading...
          </span>
        ) : (
          'Load More'
        )}
      </button>

      {/* <Footer /> */}
    </>
  );
};

export default AppleMusicHomepage;
