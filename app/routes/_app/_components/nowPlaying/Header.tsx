import React from 'react'
import { useTrackStore } from '~/store/useTrackStore';

function Header({ onClose, onShowQueueTrack, hide, setHide }: {
    onClose: () => void;
    onShowQueueTrack: () => void
    hide: boolean;
    setHide: React.Dispatch<React.SetStateAction<boolean>>;
}) {

    const { trackDetails } = useTrackStore()
    return (
        <div className="p-4 flex items-center justify-between relative">
            <div className="relative group">
                <div
                    className="absolute top-7 px-2 py-1 text-xs bg-zinc-800 text-white rounded-md shadow-lg 
               opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white
               whitespace-nowrap left-0"
                >
                    Minimise Screen
                </div>

                <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors duration-300">
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

            {
                trackDetails.videoUrl && (
                    <div className="relative group -mt-7">
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white rounded-md shadow-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                            {
                                hide ? "Show Controllers" : "Hide Controllers"
                            }
                        </div>

                        <div className="absolute left-1/2 transform -translate-x-1/2 sm:hidden cursor-pointer" onClick={() => setHide(!hide)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-expand"><path d="m15 15 6 6" /><path d="m15 9 6-6" /><path d="M21 16.2V21h-4.8" /><path d="M21 7.8V3h-4.8" /><path d="M3 16.2V21h4.8" /><path d="m3 21 6-6" /><path d="M3 7.8V3h4.8" /><path d="M9 9 3 3" /></svg>
                        </div>
                    </div>
                )
            }


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
        </div>
    )
}

export default Header