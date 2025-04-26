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
import { LoadingSpinnerIcon } from '~/Svgs';
import { useLikedTracksStore } from '~/store/useLikedTracksStore';
import { useCurrentActivePageStore } from '~/store/useCurrentActivePageStore';

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

  const params = useParams()

  // State management
  const [page, setPage] = useState(1);

  const { setCurrentPage, flag, setFlag } = useCurrentActivePageStore()
  const [tracksByGenreId, setTracksByGenreId] = useState<Track[][]>([]);

  // Internal Hooks
  const { setActiveSectionIndex } = usePlaylistStore();

  const { data, isLoading } = useGetTracksByGenreId({page, genreId:params.genreId || ""}, tracksByGenreIdData.tracks);

  // Derived dataactiveSectionIndex
  const trackSections = [
    tracksByGenreIdData.tracks.slice(0, SECTION_SIZE),
    tracksByGenreIdData.tracks.slice(SECTION_SIZE, SECTION_SIZE * 2),
    tracksByGenreIdData.tracks.slice(SECTION_SIZE * 2, SECTION_SIZE * 3),
  ];

  //for active page and perform queryclient
  useEffect(() => {
    setCurrentPage(page)
    setFlag(true)
  }, [])

  useEffect(() => {
    if (!data?.length) return;

    setTracksByGenreId(prev => {
      if (!flag) return prev;

      const createSections = (startIndex: number, count: number) => {
        const sections = [];
        for (let i = 0; i < count; i++) {
          const start = startIndex + i * SECTION_SIZE;
          sections.push(data.slice(start, start + SECTION_SIZE));
        }
        return sections;
      };

      return page === 1
        ? createSections(0, 3)  // Initial load: 3 sections
        : [...prev, ...createSections(0, 2)]; // Pagination: append 2 sections
    });
  }, [data]);

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

      <Footer />

    </>
  );
};

export default AppleMusicHomepage;