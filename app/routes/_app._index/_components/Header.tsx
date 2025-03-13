import React, { useState } from 'react'
import { ScrollDirection } from '~/types'
import ShowTrackDialog from './ShowTrackDialog'
import { Track } from 'gql/graphql'

interface HeaderProps {
    scroll: (direction: ScrollDirection) => void
    tracks: Track[]
}

const Header: React.FC<HeaderProps> = ({ scroll, tracks }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <header className="mb-4 md:mb-6">
                <div className="flex flex-row justify-between items-center gap-4 mb-4">
                    <div>
                        <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-1">New Year, New You</h1>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="flex gap-1 sm:gap-2">
                            <button
                                onClick={() => scroll('left')}
                                className="p-1 sm:p-2 rounded-full transition-colors active:scale-95"
                                aria-label="Scroll left"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><path id="ic_chevron_caretleft-a" d="M14,18 C13.744,18 13.488,17.902 13.293,17.707 L8.293,12.707 C7.902,12.316 7.902,11.684 8.293,11.293 L13.293,6.293 C13.684,5.902 14.316,5.902 14.707,6.293 C15.098,6.684 15.098,7.316 14.707,7.707 L10.414,12 L14.707,16.293 C15.098,16.684 15.098,17.316 14.707,17.707 C14.512,17.902 14.256,18 14,18 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use href="#ic_chevron_caretleft-a" fill="currentColor"></use></g></svg>
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                className="p-1 sm:p-2 rounded-full transition-colors active:scale-95"
                                aria-label="Scroll right"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><path id="ic_chevron_caretright-a" d="M10,18 C9.744,18 9.488,17.902 9.293,17.707 C8.902,17.316 8.902,16.684 9.293,16.293 L13.586,12 L9.293,7.707 C8.902,7.316 8.902,6.684 9.293,6.293 C9.684,5.902 10.316,5.902 10.707,6.293 L15.707,11.293 C16.098,11.684 16.098,12.316 15.707,12.707 L10.707,17.707 C10.512,17.902 10.256,18 10,18 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use href="#ic_chevron_caretright-a" fill="currentColor"></use></g></svg>

                            </button>
                        </div>
                        <button
                            className="w-full font-bold sm:w-auto py-1 px-3 text-xs sm:text-sm hover:bg-[#727171] bg-[#313232] text-white rounded-full transition-transform transform hover:scale-105 duration-300 ease-in-out"
                            aria-label="Show all songs"

                            onClick={() => setIsOpen(true)}
                        >
                            Show All
                        </button>
                    </div>
                </div>
            </header>

            {
                isOpen && <ShowTrackDialog isOpen={isOpen} onClose={() => setIsOpen(false)} tracks={tracks} />
            }
        </>
    )
}

export default Header