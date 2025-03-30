import { MetaFunction } from '@remix-run/cloudflare';
import React, { useRef, useState } from 'react'
// import SpotifyMenu from '~/components/SpotifyMenu';

export const meta: MetaFunction = () => {
   return [
      { title : "FlowTune - Explore | Playlists"},
      { name: "description", content: "Welcome to Remix!" },
   ];
};

function ExplorePlaylistsPage() {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [currentIdx, setCurrentIndex] = useState(-1)

    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const dropdownRef = useRef(null);

    console.log("openDropdownIndex", openDropdownIndex);

    const handleDropdownClick = (index, e) => {
        e.stopPropagation(); // Prevent event bubbling
        setOpenDropdownIndex(openDropdownIndex === index ? null : index);
    };

    // Fixed click outside handler
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            // Don't close if clicking inside the dropdown
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdownIndex(null);
            }
        };

        if (openDropdownIndex !== null) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [openDropdownIndex]);

    const dropdownItems = [
        { label: "Add to Queue", action: () => console.log("Added to queue") },
        { label: "Add to Playlist", action: () => console.log("Add to playlist") },
        { label: "Share", action: () => console.log("Share") },
        { label: "Add to Liked Songs", action: () => console.log("Added to liked songs") },
        { label: "Add to Liked Songs", action: () => console.log("Added to liked songs") },
        { label: "Add to Liked Songs", action: () => console.log("Added to liked songs") },

    ];

    const playlist = {
        title: "Today's Top Hits",
        coverImage: 'https://m.media-amazon.com/images/S/dmp-catalog-images-prod/images/4731f943-5683-4832-b200-145fe1dc6172/4731f943-5683-4832-b200-145fe1dc6172--1619766509._SX576_SY576_BL0_QL100__UX250_FMwebp_QL85_.jpg',
        description: "The most popular tracks right now",
        totalSongs: 50,
        duration: "2 hr 45 min",
        tracks: [
            {
                title: "Song One Artist NameArtist NameArtist Name",
                artist: "Artist Name Artist Name Artist Name",
                album: "Album Name Artist NameArtist NameArtist Name",
                duration: "3:24",
                image: "https://m.media-amazon.com/images/I/41Z7Z9uYlEL._SX354_SY354_BL0_QL100__UX358_FMwebp_QL85_.jpg",
                dateAdded: "2 days ago"
            },
            {
                title: "Song Two",
                artist: "Artist Name",
                album: "Album Name",
                duration: "4:12",
                image: "https://m.media-amazon.com/images/I/51Ls+9riaXL._SX354_SY354_BL0_QL100__UX358_FMwebp_QL85_.jpg",
                dateAdded: "3 days ago"
            },
            {
                title: "Song Three",
                artist: "Artist Name",
                album: "Album Name",
                duration: "3:18",
                image: "https://m.media-amazon.com/images/I/51PndTwTN1L._SX354_SY354_BL0_QL100__UX358_FMwebp_QL85_.jpg",
                dateAdded: "5 days ago"
            },
            {
                title: "Song Four",
                artist: "Artist Name",
                album: "Album Name",
                duration: "3:55",
                image: "https://m.media-amazon.com/images/I/41-Ia7Xl3vL._SX354_SY354_BL0_QL100__UX358_FMwebp_QL85_.jpg",
                dateAdded: "1 week ago"
            },
            {
                title: "Song Five",
                artist: "Artist Name",
                album: "Album Name",
                duration: "3:30",
                image: "https://m.media-amazon.com/images/I/51iq1zWdgwL._SX354_SY354_BL0_QL100__UX358_FMwebp_QL85_.jpg",
                dateAdded: "1 week ago"
            },

            {
                title: "Song Six",
                artist: "Artist Name",
                album: "Album Name",
                duration: "3:30",
                image: "https://m.media-amazon.com/images/S/dmp-catalog-images-prod/images/4731f943-5683-4832-b200-145fe1dc6172/4731f943-5683-4832-b200-145fe1dc6172--1619766509._UX358_FMwebp_QL85_.jpg",
                dateAdded: "1 week ago"
            },
            {
                title: "Song Six",
                artist: "Artist Name",
                album: "Album Name",
                duration: "3:30",
                image: "https://m.media-amazon.com/images/S/dmp-catalog-images-prod/images/4731f943-5683-4832-b200-145fe1dc6172/4731f943-5683-4832-b200-145fe1dc6172--1619766509._UX358_FMwebp_QL85_.jpg",
                dateAdded: "1 week ago"
            },
            {
                title: "Song Six",
                artist: "Artist Name",
                album: "Album Name",
                duration: "3:30",
                image: "https://m.media-amazon.com/images/S/dmp-catalog-images-prod/images/4731f943-5683-4832-b200-145fe1dc6172/4731f943-5683-4832-b200-145fe1dc6172--1619766509._UX358_FMwebp_QL85_.jpg",
                dateAdded: "1 week ago"
            },
            {
                title: "Song Six",
                artist: "Artist Name",
                album: "Album Name",
                duration: "3:30",
                image: "https://m.media-amazon.com/images/S/dmp-catalog-images-prod/images/4731f943-5683-4832-b200-145fe1dc6172/4731f943-5683-4832-b200-145fe1dc6172--1619766509._UX358_FMwebp_QL85_.jpg",
                dateAdded: "1 week ago"
            },
            {
                title: "Song Six",
                artist: "Artist Name",
                album: "Album Name",
                duration: "3:30",
                image: "https://m.media-amazon.com/images/S/dmp-catalog-images-prod/images/4731f943-5683-4832-b200-145fe1dc6172/4731f943-5683-4832-b200-145fe1dc6172--1619766509._UX358_FMwebp_QL85_.jpg",
                dateAdded: "1 week ago"
            },
            {
                title: "Song Six",
                artist: "Artist Name",
                album: "Album Name",
                duration: "3:30",
                image: "https://m.media-amazon.com/images/S/dmp-catalog-images-prod/images/4731f943-5683-4832-b200-145fe1dc6172/4731f943-5683-4832-b200-145fe1dc6172--1619766509._UX358_FMwebp_QL85_.jpg",
                dateAdded: "1 week ago"
            },
            {
                title: "Song Six",
                artist: "Artist Name",
                album: "Album Name",
                duration: "3:30",
                image: "https://m.media-amazon.com/images/S/dmp-catalog-images-prod/images/4731f943-5683-4832-b200-145fe1dc6172/4731f943-5683-4832-b200-145fe1dc6172--1619766509._UX358_FMwebp_QL85_.jpg",
                dateAdded: "1 week ago"
            }
        ]
    };

    return (
        <div className="text-white relative min-h-screen">
            <div
                className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-0"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,1) 100%), url(${playlist.coverImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                    filter: 'blur(20px)',
                    opacity: '0.6',
                }}
            />

            <div className="relative z-10">
                <div className="p-4 sm:p-6 md:p-8">
                    <div className="py-8 md:py-12 flex flex-col md:flex-row items-center md:items-start gap-8">
                        <img
                            src={playlist.coverImage}
                            alt={playlist.title}
                            className="w-56 h-56 md:w-64 md:h-64 rounded-lg shadow-xl"
                        />
                        <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-bold">{playlist.title}</h1>
                            <p className="text-gray-400">{playlist.description}</p>
                            <div className="text-sm text-gray-400">
                                {playlist.totalSongs} songs • {playlist.duration}
                            </div>
                            <div className="flex items-center gap-4 mt-4">
                                <button
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3 rounded-full"
                                >
                                    {/* {isPlaying ? <Pause size={20} /> : <Play size={20} />} */}
                                    {isPlaying ? 'Pause' : 'Play'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="pb-8">
                        <table className="w-full">
                            <thead>
                                <tr className="text-gray-400 border-b border-[#2a2b2c]">
                                    <th className="text-left py-4 w-12 pl-4">#</th>
                                    <th className="text-left">Title</th>
                                    <th className="text-left hidden md:table-cell">Album</th>
                                    <th className="text-left hidden md:table-cell">Date Added</th>
                                    <th className="text-right hidden md:table-cell w-24">
                                        {/* <Clock3 size={16} className="ml-auto mr-8" /> */}
                                        <div className="ml-auto mr-8">clock</div>
                                    </th>
                                    <th className="text-right w-16">More</th>
                                </tr>
                            </thead>
                            <tbody>
                                {playlist.tracks.map((track, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-[#2a2b2c] group rounded-lg border-b border-[#2a2b2c] mt-4"
                                    >
                                        <td className="py-7 pl-4">
                                            {index === currentIdx ? (
                                                <div>
                                                    <div className="w-[2px] h-2 bg-[#fa586a] animate-[bounce_1s_infinite]"></div>
                                                    <div className="w-[2px] h-2 bg-[#fa586a] animate-[bounce_1s_infinite_0.2s]"></div>
                                                    <div className="w-[2px] h-2 bg-[#fa586a] animate-[bounce_1s_infinite_0.3s]"></div>
                                                </div>
                                            ) : (
                                                <span>{index + 1}</span>
                                            )}
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-4">
                                                <div className="relative group/image" onClick={() => setCurrentIndex(index)}>
                                                    <img
                                                        src={track.image}
                                                        alt={track.title}
                                                        className="w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 rounded"
                                                    />
                                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover/image:bg-opacity-50 transition-all duration-200 rounded flex items-center justify-center">
                                                        <button className="text-white opacity-0 group-hover/image:opacity-100 transition-opacity duration-200">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <polygon points="5 3 19 12 5 21 5 3" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className={`font-medium ${index == currentIdx ? "text-[#fa586a]" : ""}`}>{track.title}</div>
                                                    <div className="text-sm text-gray-400 hover:text-[#fa586a] cursor-pointer">{track.artist}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={`hidden md:table-cell  ${index == currentIdx ? "text-[#fa586a]" : "text-gray-400"}`}>{track.album}</td>
                                        <td className={`hidden md:table-cell  ${index == currentIdx ? "text-[#fa586a]" : "text-gray-400"}`}>{track.dateAdded}</td>
                                        <td className={`text-right hidden md:table-cell  pr-8 ${index == currentIdx ? "text-[#fa586a]" : "text-gray-400"}`}>{track.duration}</td>
                                        <td className="text-right pr-4">
                                            <button className="cursor-pointer text-gray-400 hover:text-white ml-auto" onClick={(e) => handleDropdownClick(index, e)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><defs><path id="ic_action_more-a" d="M19,14 C17.895,14 17,13.105 17,12 C17,10.895 17.895,10 19,10 C20.105,10 21,10.895 21,12 C21,13.105 20.105,14 19,14 Z M14,12 C14,10.895 13.105,10 12,10 C10.895,10 10,10.895 10,12 C10,13.105 10.895,14 12,14 C13.105,14 14,13.105 14,12 Z M7,12 C7,10.895 6.105,10 5,10 C3.895,10 3,10.895 3,12 C3,13.105 3.895,14 5,14 C6.105,14 7,13.105 7,12 Z"></path></defs><g fillRule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use fill-rule="nonzero" href="#ic_action_more-a" fill="currentColor"></use></g></svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}



                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExplorePlaylistsPage