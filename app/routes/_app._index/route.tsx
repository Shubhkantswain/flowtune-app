import { useLoaderData } from "@remix-run/react";
import { useCurrentUser } from "~/hooks/auth";
import TrackSection from "./_components/TrackSection";
import { Track } from "gql/graphql";
import { createGraphqlClient } from "~/clients/api";
import { getFeedTracksQuery } from "~/graphql/queries/track";
import { LoaderFunctionArgs, redirect } from "@remix-run/cloudflare";
import { MetaFunction } from "@remix-run/cloudflare";
import { useEffect } from "react";
import usePlaylistStore from "~/store/usePlaylistStore";

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

    if (!token) {
      redirect("/explore")
    }

    const graphqlClient = createGraphqlClient(token);
    const { getFeedTracks } = await graphqlClient.request(getFeedTracksQuery);

    return getFeedTracks || []; // Expecting an array of `Track`
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return []; // Return an empty array to match the expected type
  }
}

// Function to get the greeting message dynamically
const getGreeting = (): string => {
  const hours = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }).split(", ")[1].split(":")[0];
  const hourNum = parseInt(hours, 10);

  if (hourNum >= 5 && hourNum < 12) return "Good Morning";
  if (hourNum >= 12 && hourNum < 17) return "Good Afternoon";
  if (hourNum >= 17 && hourNum < 20) return "Good Evening";
  return "Good Night";
};

// Function to determine section titles
const getTitle = (index: number): string => {
  const titles = ["Welcome back", getGreeting(), "Discover more"];
  return titles[index] || "More Tracks";
};

const AppleMusicHomepage: React.FC = () => {
  const tracks = useLoaderData<Track[]>(); // Ensure type safety
  const { setActiveSectionIndex } = usePlaylistStore();


  const sectionSize = 8;
  const trackSections = [
    tracks.slice(0, sectionSize),
    tracks.slice(sectionSize, sectionSize * 2),
    tracks.slice(sectionSize * 2, sectionSize * 3),
  ];

  useEffect(() => {
    setActiveSectionIndex(-1);
  }, []);

  return (
    <>
      {/* TRACK SECTIONS */}
      {trackSections.map((section, index) => (
        <TrackSection key={index} tracks={section} index={index} title={getTitle(index)} />
      ))}
    </>
  );
};

export default AppleMusicHomepage;