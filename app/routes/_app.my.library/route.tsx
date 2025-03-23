import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, Play } from 'lucide-react';
import { Link, useLoaderData } from '@remix-run/react';
import { UserPlaylistsResponse, UserPlaylistsResponseItem } from 'gql/graphql';
import { createGraphqlClient } from '~/clients/api';
import { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { getCurrentUserPlaylistsQuery } from '~/graphql/queries/playlist';
import Header from './_component/Header';
import PlaylistItems from './_component/PlaylistItems';
import ScrollControls from './_component/ScrollControls';

export async function loader({ request }: LoaderFunctionArgs) {
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
    const { getCurrentUserPlaylists } = await graphqlClient.request(getCurrentUserPlaylistsQuery);

    return getCurrentUserPlaylists; // Expecting an array of `Track`
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return []; // Return an empty array to match the expected type
  }
}

const MusicApp = () => {
  const playlists = useLoaderData<UserPlaylistsResponse>(); // Properly typed loader data

  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Playlists', 'Likes', 'Podcast'];


  const scrollContainerRef = useRef(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });

  const checkScrollability = (): void => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current as HTMLDivElement;
      const hasHorizontalScroll: boolean = container.scrollWidth > container.clientWidth;
      const atStart: boolean = container.scrollLeft <= 0;
      const atEnd: boolean = container.scrollLeft + container.clientWidth >= container.scrollWidth - 5;

      setCanScroll({
        left: hasHorizontalScroll && !atStart,
        right: hasHorizontalScroll && !atEnd,
      });
    }
  };


  const scroll = (direction: 'left' | 'right'): void => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current as HTMLDivElement;
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });

      // Update scroll buttons after scrolling
      setTimeout(checkScrollability, 300);
    }
  };

  const handleScroll = () => {
    checkScrollability();
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    return () => window.removeEventListener('resize', checkScrollability);
  }, []);

  return (
    <div className="text-white min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Header activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs}/>

        <div className="mb-6">
          {/* Scroll Controls */}
          <ScrollControls canScroll={canScroll} scroll={scroll} />

          {/* Scrollable Container for playlists - combined for both mobile and desktop */}
          <PlaylistItems playlists={playlists.playlists || []} handleScroll={handleScroll} scrollContainerRef={scrollContainerRef} activeTab={activeTab}/>
        </div>
      </div>

      {/* CSS for hiding scrollbar */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default MusicApp;