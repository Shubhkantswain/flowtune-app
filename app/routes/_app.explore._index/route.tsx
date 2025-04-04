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
    if(!exploreTracksData.isAuthenticated){
      localStorage.setItem("__FlowTune_Token", "")
    }
  }, [exploreTracksData.isAuthenticated])

  console.log("exploreTracksData", exploreTracksData);
  
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

      <footer className="text-white py-6 px-4 text- mt-10">
        <div className="container mx-auto grid grid-cols-4 gap-4">
          {/* Company Column */}
          <div>
            <h3 className="font-bold mb-3 text-xs">Company</h3>
            <ul className="space-y-1 text-gray-300">
              <li><a href="#" className="hover:underline text-xs">About</a></li>
              <li><a href="#" className="hover:underline text-xs">Jobs</a></li>
              <li><a href="#" className="hover:underline text-xs">For the Record</a></li>
            </ul>
          </div>

          {/* Communities Column */}
          <div>
            <h3 className="font-bold mb-3 text-xs">Communities</h3>
            <ul className="space-y-1 text-gray-300">
              <li><a href="#" className="hover:underline text-xs">For Artists</a></li>
              <li><a href="#" className="hover:underline text-xs">Developers</a></li>
              <li><a href="#" className="hover:underline text-xs">Advertising</a></li>
              <li><a href="#" className="hover:underline text-xs">Investors</a></li>
              <li><a href="#" className="hover:underline text-xs">Vendors</a></li>
            </ul>
          </div>

          {/* Useful Links Column */}
          <div>
            <h3 className="font-bold mb-3 text-xs">Useful links</h3>
            <ul className="space-y-1 text-gray-300">
              <li><a href="#" className="hover:underline text-xs">Support</a></li>
              <li><a href="#" className="hover:underline text-xs">Free Mobile App</a></li>
            </ul>
          </div>

          {/* Spotify Plans Column */}
          <div>
            <h3 className="font-bold mb-3 text-xs">Spotify Plans</h3>
            <ul className="space-y-1 text-gray-300">
              <li><a href="#" className="hover:underline text-xs">Premium Individual</a></li>
              <li><a href="#" className="hover:underline text-xs">Premium Duo</a></li>
              <li><a href="#" className="hover:underline text-xs">Premium Family</a></li>
              <li><a href="#" className="hover:underline text-xs">Premium Student</a></li>
              <li><a href="#" className="hover:underline text-xs">Spotify Free</a></li>
            </ul>
          </div>
        </div>

        {/* Social Icons and Legal Links */}
        <div className="container mx-auto mt-6 flex justify-between items-center border-t border-gray-700 pt-4">
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162S8.597 18.163 12 18.163s6.162-2.759 6.162-6.162S15.403 5.838 12 5.838zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
          </div>
          <div className="text-xs text-gray-400 space-x-2">
            <a href="#" className="hover:underline">Legal</a>
            <a href="#" className="hover:underline">Safety & Privacy Center</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Cookies</a>
            <a href="#" className="hover:underline">About Ads</a>
            <a href="#" className="hover:underline">Accessibility</a>
            <span>© 2025 Spotify AB</span>
          </div>
        </div>
      </footer>

    </>
  );
};

export default AppleMusicHomepage;
