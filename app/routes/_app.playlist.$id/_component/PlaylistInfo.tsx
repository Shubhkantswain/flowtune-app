import { useNavigate } from '@remix-run/react'
import { GetPlaylistTracksResponse, Track } from 'gql/graphql'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useDeletePlaylist } from '~/hooks/playlist'

interface PlaylistInfoProps {
    res: GetPlaylistTracksResponse;
    handleControll: (track: Track) => void
}

function formatTotalDuration(durations: string[]) {
    // Convert all to numbers and sum total seconds
    const totalSeconds = durations.reduce((sum, val) => {
        return sum + Math.floor(parseFloat(val));
    }, 0);

    const totalMinutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const hourPart = hours > 0 ? `${hours} HOUR${hours > 1 ? 'S' : ''}` : '';
    const minutePart = minutes > 0 ? `${minutes} MINUTE${minutes > 1 ? 'S' : ''}` : '';

    if (hourPart && minutePart) return `${hourPart} AND ${minutePart}`;
    if (hourPart) return hourPart;
    if (minutePart) return minutePart;

    return '0 MINUTES';
}


function PlaylistInfo({ res, handleControll }: PlaylistInfoProps) {
    const dropdownRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const { mutateAsync: deletePlaylist } = useDeletePlaylist()

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const arr = res?.tracks?.map((track) => {
        return track.duration
    })
    return (
        <div className="py-8 md:py-12 flex flex-col md:flex-row items-center md:items-start gap-8">
            <img
                src={res.coverImageUrl}
                alt={res.title}
                className="w-56 h-56 md:w-64 md:h-64 rounded-lg shadow-xl object-cover"
            />
            <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
                <span className="text-[#02fad5] text-sm">PRIVATE</span>
                <h1 className="text-4xl md:text-5xl font-bold">{res.title}</h1>

                <div className="text-sm text-gray-400">
                    {`${formatTotalDuration(arr || [])} . ${res?.tracks?.length} TRACKS`}
                </div>
                <div className="flex items-center gap-4 mt-4">
                    <button
                        onClick={() => {
                            if (res.tracks?.length) {
                                handleControll(res.tracks[0])
                            }
                        }}
                        className="flex items-center gap-2 bg-[#02fad5] hover:bg-[#02fad5]/70 text-black font-semibold px-8 py-3 rounded-full"
                    >
                        Play
                    </button>

                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={toggleDropdown}
                            className="p-2 rounded-full transition-colors focus:outline-none hover:scale-110"
                            aria-label="More options"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
                        </button>

                        {showDropdown && (
                            <div className="absolute z-10 -translate-x-1/2 left-1/2 bottom-full mb-2 w-48 rounded-md bg-gradient-to-b from-neutral-950 to-neutral-900 border border-[#2E3030] shadow-lg overflow-hidden">
                                {[
                                    "Delete this playlist",
                                    "Share",
                                ].map((item, index) => (
                                    <button
                                        key={index}
                                        className="flex items-center w-full px-4 py-3 text-sm text-white hover:bg-[#1E1E1E] border-b border-[#2E3030] last:border-b-0"
                                        onClick={async () => {
                                            if (index == 0) {
                                                await deletePlaylist(res.id)
                                                navigate(-1)
                                            } else {
                                                const shareUrl = window.location.href;

                                                if (navigator.share) {
                                                    try {
                                                        await navigator.share({
                                                            title: document.title,
                                                            url: shareUrl,
                                                        });
                                                    } catch (error) {
                                                        console.error("Error sharing:", error);
                                                    }
                                                } else {
                                                    try {
                                                        await navigator.clipboard.writeText(shareUrl);
                                                        alert("Link copied to clipboard!");
                                                    } catch (error) {
                                                        console.error("Failed to copy link:", error);
                                                    }
                                                }
                                            }
                                        }}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaylistInfo