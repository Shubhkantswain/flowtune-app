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

  const tracks = [
    {
      id: 1,
      title: 'Uyi Amma',
      artist: 'Amit Trivedi',
      coverImage: '/path/to/uyi-amma-cover.jpg'
    },
    {
      id: 2,
      title: 'Aajkal Tere Mere Pyar Ke Charche',
      artist: 'Suman Kalyanpur',
      coverImage: '/path/to/aajkal-cover.jpg'
    },
    {
      id: 3,
      title: 'Tauba Tauba',
      artist: 'Karan Aujla',
      coverImage: '/path/to/tauba-tauba-cover.jpg'
    }
  ];

  useEffect(() => {
    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    return () => window.removeEventListener('resize', checkScrollability);
  }, [activeTab]);

  return (
    <div className="text-white min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Header activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

        <div className="mb-6">
          {/* Scroll Controls */}
          <ScrollControls canScroll={canScroll} scroll={scroll} />

          {/* Scrollable Container for playlists - combined for both mobile and desktop */}
          <PlaylistItems playlists={playlists.playlists || []} handleScroll={handleScroll} scrollContainerRef={scrollContainerRef} activeTab={activeTab} />
        </div>
      </div>

      <div className="w-full md:w-1/2 md:mr-auto md:ml-0 mx-auto">
        <h2 className="text-xl font-bold mb-4">Recently Liked</h2>
        <div className="space-y-4">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="flex items-center justify-between rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={'https://m.media-amazon.com/images/I/71IfBU88RbL._SX472_SY472_BL0_QL100__UX56_FMwebp_QL85_.jpg'}
                  alt={track.title}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div>
                  <p className="font-semibold">{track.title}</p>
                  <p className="text-neutral-400 text-sm">{track.artist}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
               
                <button>
                  <Plus size={24} className="text-neutral-400" />
                </button>
              </div>
            </div>
          ))}
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