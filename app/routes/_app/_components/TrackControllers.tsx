import React from 'react'
import { useTrackStore } from '~/store/useTrackStore'

function TrackControllers() {
    const { trackDetails, togglePlay } = useTrackStore()
    const isPlaying = trackDetails.isPlaying

    return (
        <div className="px-8 py-12 lg:-mt-8">
            {/* Playback Controls */}
            <div className="flex items-center justify-center space-x-8 mb-12">
                <button className="text-zinc-400 hover:text-white transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-skip-back"><polygon points="19 20 9 12 19 4 19 20" /><line x1="5" x2="5" y1="19" y2="5" /></svg>
                </button>
                <button
                    className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-black hover:bg-white/80 transition-all duration-300 ease-out transform hover:scale-105"
                    onClick={togglePlay}
                >
                    {
                        isPlaying ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><path id="ic_playback_pause-a" d="M9,22 L6,22 C5.45,22 5,21.55 5,21 L5,3 C5,2.45 5.45,2 6,2 L9,2 C9.55,2 10,2.45 10,3 L10,21 C10,21.55 9.55,22 9,22 Z M19,21 L19,3 C19,2.45 18.55,2 18,2 L15,2 C14.45,2 14,2.45 14,3 L14,21 C14,21.55 14.45,22 15,22 L18,22 C18.55,22 19,21.55 19,21 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use fill-rule="nonzero" href="#ic_playback_pause-a" fill="currentColor"></use></g></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><path id="ic_playback_play-a" d="M21.54933,11.208 L7.32711083,2.131 C7.05155533,1.955 6.7155554,1.957 6.44177768,2.136 C6.16799996,2.315 6,2.644 6,3 L6,21 C6,21.354 6.16711108,21.683 6.43911102,21.862 C6.57777765,21.954 6.73333318,22 6.8888887,22 C7.038222,22 7.18666641,21.958 7.32177749,21.873 L21.5439967,12.951 C21.8239966,12.775 21.9991077,12.442 22,12.081 C22.0008855,11.72 21.8293299,11.386 21.54933,11.208 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use href="#ic_playback_play-a" fill="currentColor"></use></g></svg>
                        )
                    }
                </button>
                <button className="text-zinc-400 hover:text-white transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-skip-forward"><polygon points="5 4 15 12 5 20 5 4" /><line x1="19" x2="19" y1="5" y2="19" /></svg>
                </button>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between max-w-md mx-auto">
                <button className="text-zinc-400 hover:text-white transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-2"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" /><path d="M16 9a5 5 0 0 1 0 6" /><path d="M19.364 18.364a9 9 0 0 0 0-12.728" /></svg>
                </button>
                <button className="text-zinc-400 hover:text-white transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                </button>
            </div>
        </div>
    )
}

export default TrackControllers