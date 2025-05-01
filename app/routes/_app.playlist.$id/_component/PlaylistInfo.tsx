import { useNavigate } from '@remix-run/react'
import { GetPlaylistTracksResponse, Track } from 'gql/graphql'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import Tooltip from '~/components/Tooltip'
import { useCurrentUser } from '~/hooks/auth'
import { useDeletePlaylist } from '~/hooks/playlist'
import usePlaylistStore from '~/store/usePlaylistStore'
import { MoreIcon, PlayIcon } from '~/Svgs'
import { formatTotalDuration } from '~/utils'

interface PlaylistInfoProps {
    res: GetPlaylistTracksResponse;
    handleControll: (track: Track) => void
}

function PlaylistInfo({ res, handleControll }: PlaylistInfoProps) {
    const dropdownRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const { mutateAsync: deletePlaylist } = useDeletePlaylist()
    const { setIsPlaylistRepeat, isPlaylistRepeat } = usePlaylistStore()

    const [showDropdown, setShowDropdown] = useState(false)
    const [imgSize, setImgSize] = useState({ width: 224, height: 224 }) // 56 * 4 = 224 (56rem)
    const { data } = useCurrentUser()

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
                className="w-56 h-56 md:w-64 md:h-64 rounded-none shadow-xl object-cover"
            >
                <img
                    src={res.coverImageUrl}
                    alt={res.title}
                    className="w-full h-full rounded-none shadow-2xl object-cover"
                />
            </div>

            <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
                <span className="text-[#25d1da] text-sm">{res.visibility}</span>
                <h1 className="text-4xl md:text-5xl font-bold">{res.title}</h1>

                <div className="text-md text-zinc-300">
                    Curated by FlowTune's Music Experts
                </div>

                <div className="text-xs text-gray-400 font-sans">
                    {`${formatTotalDuration(arr || [])} . ${res?.tracks?.length} TRACKS`}
                </div>

                <div className="flex items-center gap-7 mt-4">
                    <button
                        onClick={() => {
                            if (res.tracks?.length) {
                                handleControll(res.tracks[0]);
                            }
                        }}
                        className="flex items-center gap-2 bg-[#25d1da] hover:scale-105 hover:bg-[#93D0D5] text-black  font-normal px-4 py-2 rounded-full transition-transform"
                    >
                        <PlayIcon width='16' height='16' />
                        Play
                    </button>

                    <div className='relative'>
                        <button
                            className="mt-1.5 hover:text-[#93D0D5] rounded-full transition-colors focus:outline-none group"
                            aria-label="More options"
                            onClick={async () => {
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
                            }}
                        >
                            {/* Tooltip inside the button */}
                            <Tooltip text='Share' className='-top-8' />
                            

                            {/* <MoreIcon width="2/4" height="24" /> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><defs><path id="ic_action_shareandroid-a" d="M18,15 C16.798,15 15.732,15.542 14.999,16.381 L7.91,12.836 C7.967,12.566 8,12.287 8,12 C8,11.713 7.967,11.434 7.909,11.164 L14.998,7.619 C15.732,8.458 16.798,9 18,9 C20.209,9 22,7.209 22,5 C22,2.791 20.209,1 18,1 C15.791,1 14,2.791 14,5 C14,5.287 14.033,5.566 14.091,5.836 L7.001,9.381 C6.268,8.542 5.202,8 4,8 C1.791,8 0,9.791 0,12 C0,14.209 1.791,16 4,16 C5.202,16 6.268,15.458 7.001,14.619 L14.09,18.164 C14.033,18.434 14,18.713 14,19 C14,21.209 15.791,23 18,23 C20.209,23 22,21.209 22,19 C22,16.791 20.209,15 18,15 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use href="#ic_action_shareandroid-a" fill="currentColor"></use></g></svg>


                        </button>
                    </div>

                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={toggleDropdown}
                            className="mt-1.5  hover:text-[#93D0D5] rounded-full transition-colors focus:outline-none group"
                            aria-label="More options"
                        >
                            {/* Tooltip inside the button */}
                          
                            <Tooltip text='More' className='-top-7' />

                            
                            <MoreIcon width="24" height="24" />
                        </button>

                        {showDropdown && (
                            <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 w-64 z-50 transform transition-all duration-300 ease-in-out ${showDropdown ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                                <div className="bg-gradient-to-b from-neutral-950 to-neutral-900 rounded-md shadow-xl border border-[#2E3030]">
                                    <div className="py-1">


                                        <button
                                            className="flex items-center justify-between w-full text-left px-4 py-4 text-sm text-gray-200 hover:bg-[#29292A] hover:text-white"
                                            onClick={() => {
                                                if (res.tracks?.length) {
                                                    handleControll(res.tracks[0]);
                                                }
                                            }}
                                        >
                                            Play
                                        </button>
                                        <div className="border-b border-[#2E3030]"></div>


                                        <button
                                            className="flex items-center justify-between w-full text-left px-4 py-4 text-sm text-gray-200 hover:bg-[#29292A] hover:text-white"
                                            onClick={async () => {
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
                                            }}
                                        >
                                            Share
                                        </button>
                                        <div className="border-b border-[#2E3030]"></div>

                                        <button
                                            className="flex items-center justify-between w-full text-left px-4 py-4 text-sm text-gray-200 hover:bg-[#29292A] hover:text-white"
                                            onClick={() => {
                                                setIsPlaylistRepeat(!isPlaylistRepeat)
                                                toast.success(
                                                    isPlaylistRepeat
                                                        ? "Repeat mode disabled for this playlist."
                                                        : "Repeat mode enabled! The playlist will loop automatically."
                                                )
                                                setShowDropdown(false)
                                            }}
                                        >
                                            {isPlaylistRepeat ? "Disable Repeat" : "Enable Repeat"}
                                        </button>
                                        <div className="border-b border-[#2E3030]"></div>

                                        {res.authorId == data?.id && (
                                            <>
                                                <button
                                                    className="flex items-center justify-between w-full text-left px-4 py-4 text-sm text-gray-200 hover:bg-[#29292A] hover:text-white"
                                                    onClick={async () => {
                                                        await deletePlaylist(res.id)
                                                        navigate(-1)
                                                    }}
                                                >
                                                    Delete This Playlist
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaylistInfo