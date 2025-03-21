import { useLoaderData } from "@remix-run/react";
import { useCurrentUser } from "~/hooks/auth";
import TrackSection from "./_components/TrackSection";
import { Track } from "gql/graphql";
import { createGraphqlClient } from "~/clients/api";
import { getFeedTracksQuery } from "~/graphql/queries/track";
import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [
    { title: "FlowTune" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs): Promise<Track[]> {
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
    const { getFeedTracks } = await graphqlClient.request(getFeedTracksQuery);

    return getFeedTracks || []; // Expecting an array of `Track`
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return []; // Return an empty array to match the expected type
  }
}

const AppleMusicHomepage: React.FC = () => {
  const { data } = useCurrentUser();
  const tracks = useLoaderData<Track[]>(); // Properly typed loader data

  // Ensure tracks are divided into 3 sections with 8 tracks each
  const sectionSize = 8;
  const trackSections = [
    tracks.slice(0, sectionSize),
    tracks.slice(sectionSize, sectionSize * 2),
    tracks.slice(sectionSize * 2, sectionSize * 3),
  ];

  return (
    <>
      {trackSections.map((section, index) => (
        <TrackSection key={index} tracks={section} />
      ))}
       {/* Load More Button */}
       <div className="flex justify-center mt-6">
                <button
                    // onClick={handleLoadMore}
                    className="bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-800 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300 flex items-center gap-2"
                    // disabled={loading}
                >
                    {false ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                            Loading...
                        </>
                    ) : (
                        "Load More"
                    )}
                </button>
            </div>
    </>
  );
};


export default AppleMusicHomepage;
