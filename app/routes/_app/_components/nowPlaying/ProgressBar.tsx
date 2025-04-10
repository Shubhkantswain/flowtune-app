import React from 'react'
import { Slider } from '~/components/ui/slider'
import { useTrackStore } from '~/store/useTrackStore'
import { formatDuration, formatTime } from '~/utils'

function ProgressBar({ currentTime, duration }: { currentTime: number, duration: number }) {
    const { handleSeek } = useTrackStore();

    return (
        <div className="px-8 mt-8">
            <Slider
                value={[currentTime]}
                max={duration || 100}
                step={1}
                className="w-full hover:cursor-grab active:cursor-grabbing"
                onValueChange={handleSeek}
                nowPlaying={true}
            />
            <div className="flex justify-between mt-2 text-xs text-zinc-400">
            <span>{formatDuration(currentTime.toString())}</span>
            <span>{formatDuration(duration.toString())}</span>
            </div>
        </div>
    )
}

export default ProgressBar