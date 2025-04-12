import React from 'react'
import { useTrackStore } from '~/store/useTrackStore'

const TrackInfoSection = () => {
    const { trackDetails } = useTrackStore()
    return (
        <div className="flex items-center space-x-4 p-4">
            <div className="w-16 h-16 bg-gray-700 rounded-sm overflow-hidden flex-shrink-0">
                <img
                    src={trackDetails.coverImageUrl || ""}
                    alt="Track artwork"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="space-y-3">
                <h2 className="text-xl font-medium">{trackDetails.title}</h2>
                <p className="text-gray-400">{trackDetails.singer}</p>
            </div>
        </div>

    )
}

export default TrackInfoSection