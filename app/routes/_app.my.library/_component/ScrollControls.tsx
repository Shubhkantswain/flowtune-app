import { useNavigate } from '@remix-run/react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import React, { useState } from 'react'
import CreatePlaylistDialog from '~/components/CreatePlaylistDialog';
import Tooltip from '~/components/Tooltip';
import { useCurrentUser } from '~/hooks/auth';

interface ScrollState {
    left: boolean;
    right: boolean;
}

interface ScrollControlsProps {
    canScroll: ScrollState;
    scroll: (direction: 'left' | 'right') => void;
    activeTab: string
}

const ScrollControls: React.FC<ScrollControlsProps> = ({ canScroll, scroll, activeTab }) => {
    const [isOpen, setIsOpen] = useState(false)
    const { data, isLoading } = useCurrentUser()
    const navigate = useNavigate()

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl md:text-2xl font-bold">{activeTab}</h2>
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

                    <div className='relative group rounded-full'>

                        <Tooltip text='Create New Playlist' className='-top-10' />

                        <button className="bg-[#292a2a] hover:bg-[#5D5E5E] text-white px-2 py-1 md:px-3 md:py-1.5 rounded-full flex items-center gap-1 transition-colors duration-200 text-xs md:text-sm"
                            onClick={() => {
                                if (isLoading) return

                                if (data?.isPro) {
                                    setIsOpen(true)
                                } else {
                                    navigate("/pro-plan")
                                }
                            }
                            }>
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