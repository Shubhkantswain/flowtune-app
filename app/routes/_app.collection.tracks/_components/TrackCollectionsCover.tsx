import React from 'react'
import { HeartIconFilled } from '~/Svgs'

function TrackCollectionsCover() {
    return (
        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shrink-0">
            {/* Gradient background with blur */}
            <div className="absolute inset-0">
                <div className="absolute -inset-4 bg-gradient-to-br from-purple-600 to-cyan-400 opacity-50 blur-2xl" />
            </div>

            {/* Heart icon with its own gradient */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                    <HeartIconFilled width="100" height="100" />

                    <div className="absolute inset-0 blur-md text-[#25d1da]">
                        <HeartIconFilled width="100" height="100" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrackCollectionsCover