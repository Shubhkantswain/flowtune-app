import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import React, { useState } from 'react'
import CreatePlaylistDialog from '~/components/CreatePlaylistDialog';

interface ScrollState {
    left: boolean;
    right: boolean;
}

interface ScrollControlsProps {
    canScroll: ScrollState;
    scroll: (direction: 'left' | 'right') => void;
}

const ScrollControls: React.FC<ScrollControlsProps> = ({ canScroll, scroll }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl md:text-2xl font-bold">Playlists</h2>
                <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                        {(canScroll.left || canScroll.right) && (
                            <>
                                <button
                                    onClick={() => scroll('left')}
                                    className={`bg-[#1A1A1A] ${canScroll.left ? "hover:bg-[#2A2A2A]" : ""} text-white p-2 rounded-full transition-colors duration-200 flex items-center justify-center ${!canScroll.left && 'opacity-50 cursor-not-allowed'}`}
                                    aria-label="Scroll left"
                                    disabled={!canScroll.left}
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <button
                                    onClick={() => scroll('right')}
                                    className={`bg-[#1A1A1A] ${canScroll.right ? "hover:bg-[#2A2A2A]" : ""} text-white p-2 rounded-full transition-colors duration-200 flex items-center justify-center ${!canScroll.right && 'opacity-50 cursor-not-allowed'}`}
                                    aria-label="Scroll right"
                                    disabled={!canScroll.right}
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </>
                        )}
                    </div>

                    <div className='relative group'>

                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                            Create New Playlist
                        </div>
                        <button className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white px-2 py-1 md:px-3 md:py-1.5 rounded-full flex items-center gap-1 transition-colors duration-200 text-xs md:text-sm"
                            onClick={() => setIsOpen(true)}
                        >
                            <Plus size={16} /> NEW PLAYLIST
                        </button>
                    </div>

                </div>
            </div>

            <CreatePlaylistDialog songDialogOpen={isOpen} setSongDialogOpen={setIsOpen} trackId='' />
        </>
    )
}

export default ScrollControls