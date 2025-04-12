import React, { useState } from 'react'
import { ScrollDirection } from '~/types'
import { Playlist, Track } from 'gql/graphql'
import ShowPlaylistDialog from './ShowPlaylistDialog'

interface HeaderProps {
    scroll: (direction: ScrollDirection) => void
    title: string
    playlists: Playlist[]
    canScrollLeft: boolean
    canScrollRight: boolean
}

const Header: React.FC<HeaderProps> = ({ scroll, title, playlists, canScrollLeft, canScrollRight }) => {
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
                                className={`${!canScrollLeft ? "cursor-not-allowed" : ""} rounded-full flex items-center justify-center transition-colors`}
                                onClick={() => scroll("left")}
                                disabled={!canScrollLeft}
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-white"
                                >
                                    <path
                                        d="M15 18L9 12L15 6"
                                        stroke="currentColor"
                                        strokeWidth={`${canScrollLeft ? "2" : ".5"}`}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>

                            {/* Right Arrow Button */}
                            <button
                                className={`${!canScrollRight ? "cursor-not-allowed" : ""} rounded-full flex items-center justify-center transition-colors`}
                                onClick={() => scroll("right")}
                                disabled={!canScrollRight}
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-white"
                                >
                                    <path
                                        d="M9 6L15 12L9 18"
                                        stroke="currentColor"
                                        strokeWidth={`${canScrollRight ? "2" : ".5"}`}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* See All Button */}
                        <button className="px-3 py-1.5 md:px-4 md:py-2 bg-[#292a2a] text-white rounded-full hover:bg-[#5D5E5E] transition-colors text-xs font-medium"
                            onClick={() => setIsOpen(true)}
                        >
                            SEE ALL
                        </button>
                    </div>
                </div>
            </header>
            {isOpen && <ShowPlaylistDialog isOpen={isOpen} onClose={() => setIsOpen(false)} playlists={playlists} />}
        </>
    )
}

export default Header