import React from 'react'

function Header({ onClose, onShowQueueTrack }: {
    onClose: () => void;
    onShowQueueTrack: () => void
}) {

    return (
        <div className="p-4 flex items-center justify-between backdrop-blur-sm">
            <div className="relative group">
                <div
                    className="absolute top-7 px-2 py-1 text-xs bg-zinc-800 text-white rounded-md shadow-lg 
               opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white
               whitespace-nowrap left-0"
                >
                    Minimise Screen
                </div>


                <button
                    onClick={onClose}
                    className="text-zinc-400 hover:text-white transition-colors duration-300"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-down"
                    >
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </button>
            </div>


            {/* Show Queue */}
            <div className="relative group">
                <div
                    className="absolute top-6 px-2 py-1 text-xs bg-zinc-800 text-white rounded-md shadow-lg 
               opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white
               whitespace-nowrap right-0"
                >
                    Show Queue
                </div>

                <button className="text-zinc-400 hover:text-white transition-colors duration-300" onClick={onShowQueueTrack}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-list-music"
                    >
                        <path d="M21 15V6" />
                        <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                        <path d="M12 12H3" />
                        <path d="M16 6H3" />
                        <path d="M12 18H3" />
                    </svg>
                </button>
            </div>
        </div >
    )
}

export default Header