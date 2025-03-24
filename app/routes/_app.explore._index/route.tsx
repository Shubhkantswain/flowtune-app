import { useLoaderData } from "@remix-run/react";
import { useCurrentUser } from "~/hooks/auth";
import { Track } from "gql/graphql";
import { createGraphqlClient } from "~/clients/api";
import { getExploreTracksQuery, getFeedTracksQuery } from "~/graphql/queries/track";
import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { MetaFunction } from "@remix-run/cloudflare";
import TrackSection from "../_app._index/_components/TrackSection";
import { useEffect } from "react";
import usePlaylistStore from "~/store/usePlaylistStore";

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
    const { getExploreTracks } = await graphqlClient.request(getExploreTracksQuery, { page: 1 });

    return getExploreTracks || []; // Expecting an array of `Track`
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return []; // Return an empty array to match the expected type
  }
}

const AppleMusicHomepage: React.FC = () => {
  const tracks = useLoaderData<Track[]>(); // Properly typed loader data
  const { setActiveSectionIndex } = usePlaylistStore()

  // Ensure tracks are divided into 3 sections with 8 tracks each
  const sectionSize = 8;
  const trackSections = [
    tracks.slice(0, sectionSize),
    tracks.slice(sectionSize, sectionSize * 2),
    tracks.slice(sectionSize * 2, sectionSize * 3),
  ];

  useEffect(() => {
    setActiveSectionIndex(-1)
  }, [])

  return (
    <>
      {trackSections.map((section, index) => (
        <TrackSection key={index} tracks={section} index={index} />
      ))}
    </>
  );
};

export default AppleMusicHomepage;
