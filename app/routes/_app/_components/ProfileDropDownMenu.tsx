import { Link } from '@remix-run/react'
import React, { useState } from 'react'
import CreateTrackDialog from './CreateTrackDialog'

function ProfileDropDownMenu({ isDropdownOpen }: { isDropdownOpen: boolean }) {
    const [songDialogOpen, setSongDialogOpen] = useState(false)

    return (
        <div className={`absolute right-4 top-16 w-64 transform transition-all duration-300 ease-in-out ${isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
            <div className="bg-gradient-to-b from-neutral-950 to-neutral-900 rounded-md shadow-xl border border-[#2E3030]">
                <div className="py-1">
                    <Link to="/profile" className="block px-4 py-4 text-sm text-gray-200 hover:bg-[#1E1E1E] hover:text-white">
                        My Profile
                    </Link>
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

                    <Link to="/settings" className="block px-4 py-4 text-sm text-gray-200 hover:bg-[#1E1E1E] hover:text-white">
                        Music Preferences
                    </Link>
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
                </div>
            </div>

            <CreateTrackDialog songDialogOpen={songDialogOpen} setSongDialogOpen={setSongDialogOpen} />

        </div>
    )
}

export default ProfileDropDownMenu