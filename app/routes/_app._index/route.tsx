import { useLoaderData } from "@remix-run/react";
import { useCurrentUser } from "~/hooks/auth";
import TrackSection from "./_components/TrackSection";
import { Track } from "gql/graphql";
import { createGraphqlClient } from "~/clients/api";
import { getFeedTracksQuery } from "~/graphql/queries/track";

export async function loader(): Promise<Track[]> {
  try {
    const graphqlClient = createGraphqlClient();
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
