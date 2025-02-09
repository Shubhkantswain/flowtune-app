import React from 'react'
import { ScrollDirection } from '~/types'

interface HeaderProps {
    scroll: (direction: ScrollDirection) => void
}

const Header: React.FC<HeaderProps> = ({ scroll }) => {
    return (
        <header className="mb-4 md:mb-6">
            <div className="flex flex-row justify-between items-center gap-4 mb-4">
                <div>
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-1">New Year, New You</h1>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                    <div className="flex gap-1 sm:gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="p-1 sm:p-2 rounded-full hover:bg-gray-800 transition-colors active:scale-95"
                            aria-label="Scroll left"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left">
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-1 sm:p-2 rounded-full hover:bg-gray-800 transition-colors active:scale-95"
                            aria-label="Scroll right"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                    <button
                        className="w-full font-bold sm:w-auto py-1 px-3 text-xs sm:text-sm hover:bg-[#727171] bg-[#313232] text-white rounded-full transition-transform transform hover:scale-105 duration-300 ease-in-out"
                        aria-label="Show all songs"
                    >
                        Show All
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header