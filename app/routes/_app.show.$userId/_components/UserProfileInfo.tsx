import { useNavigate, useParams } from '@remix-run/react'
import { GetUserProfileResponse, Track } from 'gql/graphql'
import React, { useState, useRef, useEffect } from 'react'
import { useCurrentUser } from '~/hooks/auth'
import { useFollowUser } from '~/hooks/user'

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
                src={user?.profileImageURL || "https://www.shutterstock.com/image-vector/male-default-avatar-profile-icon-600nw-1725062341.jpg"}
                alt={user?.username}
                className="w-56 h-56 md:w-64 md:h-64 rounded-none shadow-xl object-cover"
            />
            <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
                {/* Username with Instagram-Like Verified Badge */}
                <div className="flex items-center gap-2">
                    <h1 className="text-4xl md:text-5xl font-bold">{user?.username}</h1>
                    {user?.username === "flowtune" && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#25d1da"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-6 h-6"
                        >
                            <circle cx="12" cy="12" r="10" fill="#25d1da" />
                            <path d="M8 12l2 2 4-4" stroke="white" strokeWidth="2" />
                        </svg>
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
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="17"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M16,3 C14.499,3 13.092,3.552 12,4.544 C10.908,3.552 9.501,3 8,3 C4.691,3 2,5.691 2,9 C2,14.535 8.379,18.788 11.445,20.832 C11.613,20.944 11.807,21 12,21 C12.193,21 12.387,20.944 12.555,20.832 C15.62,18.788 22,14.535 22,9 C22,5.691 19.309,3 16,3 Z"
                            />
                        </svg>
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
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M19,14 C17.895,14 17,13.105 17,12 C17,10.895 17.895,10 19,10 C20.105,10 21,10.895 21,12 C21,13.105 20.105,14 19,14 Z M14,12 C14,10.895 13.105,10 12,10 C10.895,10 10,10.895 10,12 C10,13.105 10.895,14 12,14 C13.105,14 14,13.105 14,12 Z M7,12 C7,10.895 6.105,10 5,10 C3.895,10 3,10.895 3,12 C3,13.105 3.895,14 5,14 C6.105,14 7,13.105 7,12 Z"
                                />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {showDropdown && (
                            <div className="absolute z-10 -translate-x-1/2 left-1/2 bottom-full mb-2 w-48 rounded-md bg-gradient-to-b from-neutral-950 to-neutral-900 border border-[#2E3030] shadow-lg overflow-hidden">
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
                                    <button
                                        key={index}
                                        className="flex items-center w-full px-4 py-3 text-sm text-white hover:bg-[#1E1E1E] border-b border-[#2E3030] last:border-b-0"
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

                                            // Add logic for other actions if needed (e.g., follow/unfollow, edit)
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

export default UserProfileInfo