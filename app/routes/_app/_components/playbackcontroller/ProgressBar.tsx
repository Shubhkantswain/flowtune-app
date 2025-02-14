import React from 'react';
import { Slider } from '~/components/ui/slider';
import { useTrackStore } from '~/store/useTrackStore';
import { formatTime } from '~/utils';

function ProgressBar({
    progress,
    currentTime,
    duration
}: {
    progress: number;
    currentTime: number;
    duration: number;
}) {
    const {handleSeek} = useTrackStore()
    
    return (
        <div className="relative w-full h-0.5 bg-zinc-800/50 cursor-pointer group">
            <div className="absolute top-[-20px] left-0 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                {formatTime(currentTime)}
            </div>
            <div className="absolute top-[-20px] right-0 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                {formatTime(duration)}
            </div>
            <Slider
                value={[currentTime]}
                max={duration || 100}
                step={1}
                className="w-full hover:cursor-grab active:cursor-grabbing"
                onValueChange={handleSeek}
                nowPlaying={false}
            />
        </div>
    );
}

export default ProgressBar;
