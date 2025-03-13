import React from 'react'
import { useTrackStore } from '~/store/useTrackStore'

function TrackInfoSection() {
    const { trackDetails } = useTrackStore()
    return (
        <div className="flex items-center space-x-4 p-4">
            <div className="w-16 h-16 bg-gray-700 rounded-md overflow-hidden flex-shrink-0">
                <img
                    src={trackDetails.coverImageUrl || ""}
                    alt="Track artwork"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="space-y-3">
                <h2 className="text-xl font-bold">{trackDetails.title}</h2>
                <p className="text-gray-400">{trackDetails.artist}</p>
            </div>
        </div>

    )
}

export default TrackInfoSection