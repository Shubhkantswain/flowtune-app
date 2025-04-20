import { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { useLoaderData, useLocation, useParams } from '@remix-run/react';
import { Track } from 'gql/graphql';
import React, { useEffect, useState } from 'react'
import { createGraphqlClient } from '~/clients/api';
import { getTracksByGenreIdQuery } from '~/graphql/queries/track';
import TrackSection from '../../components/TrackSection';
import usePlaylistStore from '~/store/usePlaylistStore';
import { genreIds, genreIdsSwap } from '~/searchData';
import { getTitle } from '~/utils';
import { SECTION_SIZE } from '~/constants';
import { useGetTracksByGenreId } from '~/hooks/track';
import Footer from '~/components/Footer';
import { useLikedTrackStore } from '~/store/useLikedTrackStore';

interface genreTracksData {
  tracks: Track[],
  isAuthenticated: boolean
}

export async function loader({ request, params }: LoaderFunctionArgs) {
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
    const { getTracksByGenreId } = await graphqlClient.request(getTracksByGenreIdQuery, { input: { genreId: params.genreId || "", page: 1 } });

    return {
      tracks: getTracksByGenreId || [],
      isAuthenticated: token ? true : false
    };
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return []; // Return an empty array to match the expected type
  }
}




const AppleMusicHomepage: React.FC = () => {
  // Fetching data
  const tracksByGenreIdData = useLoaderData<genreTracksData>();

  const { likedTracks, setLikedTracks } = useLikedTrackStore()

  const params = useParams()

  // State management
  const [page, setPage] = useState(1);
  const [tracksByGenreId, setTracksByGenreId] = useState<Track[][]>([]);

  // Internal Hooks
  const { setActiveSectionIndex } = usePlaylistStore();
  const { data, isLoading } = useGetTracksByGenreId({ genreId: params.genreId || "", page });

  // Derived data
  const trackSections = [
    tracksByGenreIdData.tracks.slice(0, SECTION_SIZE),
    tracksByGenreIdData.tracks.slice(SECTION_SIZE, SECTION_SIZE * 2),
    tracksByGenreIdData.tracks.slice(SECTION_SIZE * 2, SECTION_SIZE * 3),
  ];

  useEffect(() => {
    if (data?.length) {
      setTracksByGenreId(prev => {
        const newSections = [
          data.slice(0, SECTION_SIZE),
          data.slice(SECTION_SIZE, SECTION_SIZE * 2),
        ];

        // If page is 2, include both the initial trackSections and new data
        if (page === 2) {
          const initialSections = [
            tracksByGenreIdData.tracks.slice(0, SECTION_SIZE),
            tracksByGenreIdData.tracks.slice(SECTION_SIZE, SECTION_SIZE * 2),
            tracksByGenreIdData.tracks.slice(SECTION_SIZE * 2, SECTION_SIZE * 3),
          ];
          return [...initialSections, ...newSections];

        }

        // For other pages, just append new sections
        return [...prev, ...newSections];
      });
    }
  }, [data])

  useEffect(() => {
    const isFirstPage = page === 1;
    const sourceData = isFirstPage ? tracksByGenreIdData.tracks : data ?? [];
    const newTracks = sourceData.filter((item) => item.hasLiked);

    setLikedTracks(
      isFirstPage ? newTracks : [...likedTracks, ...newTracks]
    );
  }, [data]);

  console.log("likedtracks", likedTracks);

  useEffect(() => {
    setActiveSectionIndex(-1)
  }, [])

  useEffect(() => {
    if (!tracksByGenreIdData.isAuthenticated) {
      localStorage.setItem("__FlowTune_Token", "")
    }
  }, [tracksByGenreIdData.isAuthenticated])

  type GenreKey = keyof typeof genreIdsSwap;

  return (
    <>
      {/* HEADER */}
      <h1 className="text-5xl font-bold p-4 sm:p-6 md:p-8 mt-5 -mb-2">{genreIdsSwap[params.genreId as GenreKey][0]}</h1>

      {tracksByGenreId.length > 0
        ? tracksByGenreId.map((section, index) => (
          <TrackSection key={index} tracks={section} index={index} title={getTitle(index)} />
        ))
        : trackSections.map((section, index) => (
          <TrackSection key={index} tracks={section} index={index} title={getTitle(index)} />
        ))}

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