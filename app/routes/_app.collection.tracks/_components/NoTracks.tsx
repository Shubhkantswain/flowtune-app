import React from 'react'

function NoTracks() {
    return (
        <div className="flex items-center justify-center min-h-[200px] text-gray-500 font-medium text-lg">
            <div className="flex flex-col items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <span>No liked tracks found</span>
            </div>
        </div>
    )
}

export default NoTracks