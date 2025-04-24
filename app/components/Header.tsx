import React, { useState } from 'react'
import { ScrollDirection } from '~/types'
import ShowTrackDialog from './ShowTrackDialog'
import { Track } from 'gql/graphql'
import { LeftArrowIcon, RightArrowIcon } from '~/Svgs'

interface HeaderProps {
    scroll: (direction: ScrollDirection) => void
    tracks: Track[]
    initialized: boolean;
    setInitialized: React.Dispatch<React.SetStateAction<boolean>>;
    index: number
    title: string
    canScrollLeft: boolean
    canScrollRight: boolean
}

const Header: React.FC<HeaderProps> = ({ scroll, tracks, initialized, setInitialized, index, title, canScrollLeft, canScrollRight }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <header className="mb-4 md:mb-6">
                <div className="flex flex-row justify-between items-center gap-4 mb-4">
                    <div>
                        <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-1">
                            {title}
                        </h1>
                    </div>

                    <div className="flex items-center gap-5">
                        <div className='gap-8 flex'>
                            {/* Left Arrow Button */}
                            <button
                                className={`${!canScrollLeft ? "cursor-not-allowed opacity-30" : "cursor-pointer opacity-100"} text-white rounded-full flex items-center justify-center transition-colors`}
                                onClick={() => scroll("left")}
                                disabled={!canScrollLeft}
                            >
                                <LeftArrowIcon width="20" height="20"/>
                            </button>

                            {/* Right Arrow Button */}
                            <button
                                className={`${!canScrollRight ? "cursor-not-allowed opacity-30" : "cursor-pointer opacity-100"} text-white rounded-full flex items-center justify-center transition-colors`}
                                onClick={() => scroll("right")}
                                disabled={!canScrollRight}
                            >
                                <RightArrowIcon width="20" height="20"/>
                            </button>
                        </div>

                        {/* See All Button */}
                        <button className="px-3 py-1.5 md:px-4 md:py-2 bg-[#292a2a] hover:bg-[#5D5E5E] text-white rounded-full transition-colors text-xs font-medium"
                            onClick={() => setIsOpen(true)}
                        >
                            SEE ALL
                        </button>
                    </div>
                </div>
            </header>

            {
                isOpen && <ShowTrackDialog isOpen={isOpen} onClose={() => setIsOpen(false)} tracks={tracks} initialized={initialized} setInitialized={setInitialized} index={index} />
            }
        </>
    )
}

export default Header