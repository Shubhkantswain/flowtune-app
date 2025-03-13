import { useLoaderData } from "@remix-run/react";
import { useCurrentUser } from "~/hooks/auth";
import TrackSection from "./_components/TrackSection";
import { Track } from "gql/graphql";
import { createGraphqlClient } from "~/clients/api";
import { getFeedTracksQuery } from "~/graphql/queries/track";
import { LoaderFunctionArgs } from "@remix-run/cloudflare";

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

  console.log(tracks, "tracks");

  return (
    <>
      <TrackSection tracks={tracks} />
      <TrackSection tracks={tracks}/>
      <TrackSection tracks={tracks}/>
      <TrackSection tracks={tracks}/>
      <TrackSection tracks={tracks}/>
      <TrackSection tracks={tracks}/>
      <TrackSection tracks={tracks}/>
      <TrackSection tracks={tracks}/>
    </>
  );
};

export default AppleMusicHomepage;
