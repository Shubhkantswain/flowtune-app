// ProfileDropDownMenu.tsx
import { Link } from '@remix-run/react'
import React, { useState, useEffect, useRef } from 'react'
import CreateTrackDialog from './CreateTrackDialog'
import MusicPreferencesModal from './MusicPreference';
import useMusicPreferenceStore from '~/store/useMusicPreferenceStore';
import { useCurrentUser } from '~/hooks/auth';

function ProfileDropDownMenu({
    isDropdownOpen,
    setIsDropdownOpen,
    triggerRef
}: {
    isDropdownOpen: boolean;
    setIsDropdownOpen: (isOpen: boolean) => void;
    triggerRef: React.RefObject<HTMLElement>;
}) {
    const [songDialogOpen, setSongDialogOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const { setMusicPreferencesOpen } = useMusicPreferenceStore()

    const [authenticated, setAuthenticated] = useState(true)
    const { data, isLoading } = useCurrentUser()

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
                className={`absolute right-4 top-16 w-64 transform transition-all duration-300 ease-in-out ${isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
            >
                <div className="bg-gradient-to-b from-neutral-950 to-neutral-900 rounded-md shadow-xl border border-[#2E3030]">
                    <div className="py-1">
                        {
                            authenticated ? (
                                <>
                                    {isLoading ? (
                                        <button
                                            className="block w-full text-left px-4 py-4 text-sm text-gray-200 hover:bg-[#1E1E1E] hover:text-white"
                                        >
                                            Fetching Your Profile...
                                        </button>
                                    ) : (
                                        // Actual content
                                        <Link to={`/${data?.username}`} className="block px-4 py-4 text-sm text-gray-200 hover:bg-[#1E1E1E] hover:text-white">
                                            My Profile
                                        </Link>
                                    )}

                                    <div className="border-b border-[#2E3030]"></div>

                                    <button
                                        className="block w-full text-left px-4 py-4 text-sm text-gray-200 hover:bg-[#1E1E1E] hover:text-white"
                                        onClick={() => setSongDialogOpen(true)}
                                    >
                                        Create Track
                                    </button>
                                    <div className="border-b border-[#2E3030]"></div>

                                    <button
                                        className="block w-full text-left px-4 py-4 text-sm text-gray-200 hover:bg-[#1E1E1E] hover:text-white"
                                        onClick={() => {/* Add logout logic */ }}
                                    >
                                        Create Playlist
                                    </button>
                                    <div className="border-b border-[#2E3030]"></div>

                                    <Link to="/collection/tracks" className="block px-4 py-4 text-sm text-gray-200 hover:bg-[#1E1E1E] hover:text-white">
                                        Liked Tracks
                                    </Link>
                                    <div className="border-b border-[#2E3030]"></div>

                                    <button
                                        className="block w-full text-left px-4 py-4 text-sm text-gray-200 hover:bg-[#1E1E1E] hover:text-white"
                                        onClick={() => setMusicPreferencesOpen(true)}
                                    >
                                        Music Preferences
                                    </button>

                                    <div className="border-b border-[#2E3030]"></div>

                                    <Link to="/settings" className="block px-4 py-4 text-sm text-gray-200 hover:bg-[#1E1E1E] hover:text-white">
                                        Change Display Language
                                    </Link>
                                    <div className="border-b border-[#2E3030]"></div>
                                    <Link to="/settings" className="block px-4 py-4 text-sm text-gray-200 hover:bg-[#1E1E1E] hover:text-white">
                                        Settings
                                    </Link>
                                    <div className="border-b border-[#2E3030]"></div>
                                    <button
                                        className="block w-full text-left px-4 py-4 text-sm text-gray-200 hover:bg-[#2E3030] hover:text-white"
                                        onClick={() => {/* Add logout logic */ }}
                                    >
                                        Sign out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/ft/signin"
                                        className="block px-6 py-3 text-sm text-white bg-[#fa586a] rounded-full hover:bg-[#fa586a]/60 transition mx-4 mt-4 text-center"
                                    >
                                        Sign in
                                    </Link>


                                    <button
                                        className="block w-full text-left px-4 py-4 text-sm text-gray-200 hover:bg-[#1E1E1E] hover:text-white"
                                        onClick={() => setMusicPreferencesOpen(true)}
                                    >
                                        Music Preferences
                                    </button>
                                </>
                            )
                        }
                    </div>
                </div>

                <CreateTrackDialog songDialogOpen={songDialogOpen} setSongDialogOpen={setSongDialogOpen} />
            </div>

        </>
    )
}

export default ProfileDropDownMenu