import { useNavigate, useParams } from '@remix-run/react'
import { GetUserProfileResponse, Track } from 'gql/graphql'
import React, { useState, useRef, useEffect } from 'react'
import Tooltip from '~/components/Tooltip'
import { useCurrentUser } from '~/hooks/auth'
import { useFollowUser } from '~/hooks/user'
import { BadgeIcon, HeartIconFilled, MoreIcon } from '~/Svgs'

interface UserProfileInfo {
    user: GetUserProfileResponse | null
}

function UserProfileInfo({ user }: UserProfileInfo) {
    const navigate = useNavigate()
    const { userId } = useParams()

    const { data: currentUser, isLoading } = useCurrentUser()
    const { mutateAsync: followUser } = useFollowUser()

    const [follow, setFollow] = useState<boolean>(user?.followedByMe || false)
    const [showDropdown, setShowDropdown] = useState<boolean>(false)

    const dropdownRef = useRef<HTMLDivElement>(null)

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


    return (
        <div className="py-8 md:py-12 flex flex-col md:flex-row items-center md:items-start gap-8">
            <img
                src={user?.profileImageURL || "https://m.media-amazon.com/images/X/l6Hv/M/Wl6HvhcrtVmM8aW._UX250_FMwebp_QL85_.jpg"}
                alt={user?.username}
                className="w-56 h-56 md:w-64 md:h-64 rounded-none shadow-2xl object-cover"
            />
            <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
                {/* Username with Instagram-Like Verified Badge */}
                <div className="flex items-center gap-2">
                    <h1 className="text-4xl md:text-5xl font-bold">{user?.username}</h1>
                    {user?.username === "flowtune" && (
                        <div className='text-[#25d1da]'>
                            <BadgeIcon />
                        </div>
                    )}
                </div>

                {/* Bio */}
                <p className="text-white -mt-3">{user?.bio || "No Bio Provided"}</p>

                {/* Track Count */}
                <div className="text-sm text-white -mt-3">{user?.totalTracks} Tracks</div>

                {/* Buttons Section */}
                <div className="flex items-center gap-4 mt-4">
                    <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-2 rounded-full"
                        onClick={async () => {
                            if (currentUser?.id === userId) {
                                navigate('/account/edit');
                            } else {
                                // Otherwise handle follow/unfollow logic
                                await followUser(user?.id || "");
                                setFollow(!follow);
                            }
                        }}
                        disabled={isLoading}
                    >
                        <div className='text-white'>
                            <HeartIconFilled width="17" height="17" />
                        </div>
                        {isLoading
                            ? "Loading..."
                            : currentUser?.id === userId
                                ? "Edit Profile"
                                : follow
                                    ? "Unfollow"
                                    : "Follow"
                        }
                    </button>

                    <div className="relative" ref={dropdownRef}>
                        <button
                            className="p-2 relative group hover:text-[#93D0D5] rounded-full transition-colors"
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            <Tooltip text='More' className='-top-7' />

                            <MoreIcon width="24" height="24" />
                        </button>

                        {showDropdown && (
                            <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 w-64 z-50 transform transition-all duration-300 ease-in-out ${showDropdown ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                                <div className="bg-gradient-to-b from-neutral-950 to-neutral-900 rounded-md shadow-xl border border-[#2E3030]">
                                    <div className="py-1">
                                        {[
                                            isLoading
                                                ? "Loading..."
                                                : currentUser?.id === userId
                                                    ? "Edit Profile"
                                                    : follow
                                                        ? "Unfollow"
                                                        : "Follow",
                                            "Rate this page",
                                            "Share",
                                        ].map((item, index) => (
                                            <>
                                                <button
                                                    key={index}
                                                    className="flex items-center justify-between w-full text-left px-4 py-4 text-sm text-gray-200 hover:bg-[#29292A] hover:text-white"

                                                    onClick={async () => {
                                                        if (item == "Edit Profile") {
                                                            return navigate("/account/edit")
                                                        }
                                                        if (item == "Follow") {
                                                            await followUser(user?.id || "");
                                                            setFollow(!follow);
                                                        }

                                                        if (item === "Share") {
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
                                                {
                                                    index != 2 && (
                                                        <div className="border-b border-[#2E3030]"></div>
                                                    )
                                                }

                                            </>

                                        ))}
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

export default UserProfileInfo