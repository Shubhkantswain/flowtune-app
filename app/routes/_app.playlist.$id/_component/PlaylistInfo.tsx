import { useNavigate } from '@remix-run/react'
import { GetPlaylistTracksResponse, Track } from 'gql/graphql'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useDeletePlaylist } from '~/hooks/playlist'
import { formatTotalDuration } from '~/utils'

interface PlaylistInfoProps {
    res: GetPlaylistTracksResponse;
    handleControll: (track: Track) => void
}

function PlaylistInfo({ res, handleControll }: PlaylistInfoProps) {
    const dropdownRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const { mutateAsync: deletePlaylist } = useDeletePlaylist()

    const [showDropdown, setShowDropdown] = useState(false)
    const [imgSize, setImgSize] = useState({ width: 224, height: 224 }) // 56 * 4 = 224 (56rem)

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown)
    }

    // Handle outside click to close dropdown
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

    // Reduce image size only on small screens
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth < 768) {
                const scrollY = window.scrollY
                const newWidth = Math.max(134, 224 - scrollY / 2) // Minimum 134px (about 60% of original)
                const newHeight = Math.max(134, 224 - scrollY / 2)
                setImgSize({ width: newWidth, height: newHeight })
            } else {
                setImgSize({ width: 224, height: 224 }) // Reset size on large screens
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const arr = res?.tracks?.map((track) => track.duration)

    return (
        <div className="py-8 md:py-12 flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Wrapper with dynamic size based on scroll */}
            <div 
                className="flex-shrink-0 relative transition-all duration-75 ease-out"
                style={{ 
                    width: `${imgSize.width}px`,
                    height: `${imgSize.height}px`
                }}
            >
                <img
                    src={res.coverImageUrl}
                    alt={res.title}
                    className="w-full h-full rounded-sm shadow-xl object-cover"
                />
            </div>

            <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
                <span className="text-[#25d1da] text-sm">PRIVATE</span>
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
                        className="flex items-center gap-2 bg-[#25d1da] hover:bg-[#25d1da]/70 text-black font-semibold px-8 py-3 rounded-full"
                    >
                        Play
                    </button>

                    <div className="relative group" ref={dropdownRef}>
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                            More
                        </div>

                        <button
                            onClick={toggleDropdown}
                            className="p-2 rounded-full transition-colors focus:outline-none hover:scale-110"
                            aria-label="More options"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
                        </button>

                        {showDropdown && (
                            <div className="absolute z-10 -translate-x-1/2 left-1/2 bottom-full mb-2 w-48 rounded-md bg-gradient-to-b from-neutral-950 to-neutral-900 border border-[#2E3030] shadow-lg overflow-hidden">
                                {["Delete this playlist", "Share"].map((item, index) => (
                                    <button
                                        key={index}
                                        className="flex items-center w-full px-4 py-3 text-sm text-white hover:bg-[#1E1E1E] border-b border-[#2E3030] last:border-b-0"
                                        onClick={async () => {
                                            if (index === 0) {
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