import { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { useLoaderData, useLocation, useParams } from '@remix-run/react';
import { Track } from 'gql/graphql';
import React, { useEffect } from 'react'
import { createGraphqlClient } from '~/clients/api';
import { getTracksByGenreIdQuery } from '~/graphql/queries/track';
import TrackSection from '../_app._index/_components/TrackSection';
import usePlaylistStore from '~/store/usePlaylistStore';
import { genreIds, genreIdsSwap } from '~/searchData';

export async function loader({ request, params }: LoaderFunctionArgs): Promise<Track[]> {
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
    const { getTracksByGenreId } = await graphqlClient.request(getTracksByGenreIdQuery, { genreId: params.genreId || "" });

    return getTracksByGenreId || []; // Expecting an array of `Track`
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

  const params = useParams()

  const sectionSize = 8;
  const trackSections = [
    tracks.slice(0, sectionSize),
    tracks.slice(sectionSize, sectionSize * 2),
    tracks.slice(sectionSize * 2, sectionSize * 3),
  ];

  useEffect(() => {
    setActiveSectionIndex(-1);
  }, []);

  type GenreKey = keyof typeof genreIdsSwap;

  return (
    <>
      {/* HEADER */}
      <h1 className="text-5xl font-bold p-4 sm:p-6 md:p-8 mt-5 -mb-2">{genreIdsSwap[params.genreId as GenreKey][0]}</h1>

      {/* TRACK SECTIONS */}
      {trackSections.map((section, index) => (
        <TrackSection key={index} tracks={section} index={index} title={getTitle(index)} />
      ))}
    </>
  );
};

export default AppleMusicHomepage;