// ProfileDropDownMenu.tsx
import { Link, useNavigate } from '@remix-run/react'
import React, { useState, useEffect, useRef } from 'react'
import CreateTrackDialog from './CreateTrackDialog'
import { useCurrentUser } from '~/hooks/auth';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '~/store/useAuthStore';
import CreatePlaylistDialog from '~/components/CreatePlaylistDialog';

interface ProfileDropDownMenuProps {
    isDropdownOpen: boolean;
    setIsDropdownOpen: (isOpen: boolean) => void;
    triggerRef: React.RefObject<HTMLElement>;
}

const ProfileDropDownMenu: React.FC<ProfileDropDownMenuProps> = ({
    isDropdownOpen,
    setIsDropdownOpen,
    triggerRef,
}) => {
    const navigate = useNavigate()

    const { data, isLoading } = useCurrentUser()

    const { authenticated, setAuthenticated } = useAuthStore()

    const [songDialogOpen, setSongDialogOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            // Don't close if clicking on the trigger button
            if (triggerRef.current && triggerRef.current.contains(event.target as Node)) {
                return;
            }

            // Close if clicking outside the dropdown
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && isDropdownOpen) {
                setIsDropdownOpen(false)
            }
        }

        // Add event listener when dropdown is open
        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        // Cleanup function to remove event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isDropdownOpen, setIsDropdownOpen, triggerRef])

    useEffect(() => {
        const auth =
            typeof window !== "undefined" && localStorage.getItem("__FlowTune_Token")
                ? true
                : false;
        setAuthenticated(auth);
    }, []);


    return (
        <>
            <div
                ref={dropdownRef}
                className={`absolute right-4 top-16 mt-2.5  md:mt-4 w-64 transform transition-all duration-300 ease-in-out ${isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
            >
                <div className="bg-gradient-to-b from-neutral-950 to-neutral-900 rounded-md shadow-xl border border-[#2E3030]">
                    <div className="py-1">
                        {
                            authenticated ? (
                                <>
                                    {isLoading ? (
                                        <button
                                            className="block w-full text-left px-4 py-4 text-sm text-gray-200 hover:bg-[#29292A] hover:text-white"
                                        >
                                            Fetching Your Profile...
                                        </button>
                                    ) : (
                                        // Actual content
                                        <Link to={`/show/${data?.id}`} className="block px-4 py-4 text-sm text-gray-200 hover:bg-[#29292A] hover:text-white">
                                            My Profile
                                        </Link>
                                    )}

                                    <div className="border-b border-[#2E3030]"></div>

                                    <button
                                        className="flex items-center justify-between w-full text-left px-4 py-4 text-sm text-gray-200 hover:bg-[#29292A] hover:text-white"
                                        onClick={() => {
                                            if (isLoading) {
                                                return
                                            }

                                            if (!data?.isPro) {
                                                navigate("/pro-plan")
                                                return
                                            }

                                            setSongDialogOpen(true)
                                        }}
                                    >
                                        Create Track
                                        {
                                            !data?.isPro && (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    className="ml-2 text-gray-400"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M12 2C9.79 2 8 3.79 8 6V9H6C4.9 9 4 9.9 4 11V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V11C20 9.9 19.1 9 18 9H16V6C16 3.79 14.21 2 12 2ZM10 6C10 4.9 10.9 4 12 4C13.1 4 14 4.9 14 6V9H10V6ZM12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17Z"
                                                    />
                                                </svg>
                                            )
                                        }
                                    </button>

                                    <div className="border-b border-[#2E3030]"></div>

                                    <button
                                        className="flex items-center justify-between w-full text-left px-4 py-4 text-sm text-gray-200 hover:bg-[#29292A] hover:text-white"
                                        onClick={() => {
                                            if (isLoading) {
                                                return
                                            }

                                            if (!data?.isPro) {
                                                navigate("/pro-plan")
                                                return
                                            }

                                            setIsOpen(true)
                                        }}
                                    >
                                        Create Playlist
                                        {
                                            !data?.isPro && (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    className="ml-2 text-gray-400"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M12 2C9.79 2 8 3.79 8 6V9H6C4.9 9 4 9.9 4 11V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V11C20 9.9 19.1 9 18 9H16V6C16 3.79 14.21 2 12 2ZM10 6C10 4.9 10.9 4 12 4C13.1 4 14 4.9 14 6V9H10V6ZM12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17Z"
                                                    />
                                                </svg>
                                            )
                                        }
                                    </button>

                                    <div className="border-b border-[#2E3030]"></div>

                                    <Link to="/collection/tracks" className="block px-4 py-4 text-sm text-gray-200 hover:bg-[#29292A] hover:text-white">
                                        Liked Tracks
                                    </Link>
                                    <div className="border-b border-[#2E3030]"></div>

                                    <Link
                                        to={"/music-preference"}
                                        className="block w-full text-left px-4 py-4 text-sm text-gray-200 hover:bg-[#29292A] hover:text-white"
                                    >
                                        Music Preferences
                                    </Link>

                                    <div className="border-b border-[#2E3030]"></div>

                                    <Link to="/settings" className="block px-4 py-4 text-sm text-gray-200 hover:bg-[#29292A] hover:text-white">
                                        Change Display Language
                                    </Link>
                                    <div className="border-b border-[#2E3030]"></div>
                                    <Link to="/settings" className="block px-4 py-4 text-sm text-gray-200 hover:bg-[#29292A] hover:text-white">
                                        Settings
                                    </Link>
                                    <div className="border-b border-[#2E3030]"></div>

                                    <Link to="/ft/sign-out" className="block px-4 py-4 text-sm text-gray-200 hover:bg-[#29292A] hover:text-white">
                                        Sign out
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/ft/signin"
                                        className="block px-6 py-3 text-sm text-white bg-[#25d1da] rounded-full hover:bg-[#25d1da]/60 transition mx-4 mt-4 text-center"
                                    >
                                        Sign in
                                    </Link>


                                    <Link
                                        to={"/music-preference"}
                                        className="block w-full text-left px-4 py-4 text-sm text-gray-200 hover:bg-[#29292A] hover:text-white"
                                    >
                                        Music Preferences
                                    </Link>
                                </>
                            )
                        }
                    </div>
                </div>

                <CreateTrackDialog songDialogOpen={songDialogOpen} setSongDialogOpen={setSongDialogOpen} />
                <CreatePlaylistDialog songDialogOpen={isOpen} setSongDialogOpen={setIsOpen} trackId='' />
            </div>

        </>
    )
}

export default ProfileDropDownMenu