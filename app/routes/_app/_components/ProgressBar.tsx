import React from 'react';
import { Slider } from '~/components/ui/slider';

// Format time helper function
const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

function ProgressBar({
    progress,
    handleSeek,
    currentTime,
    duration
}: {
    progress: number;
    handleSeek: (value: number[]) => void;
    currentTime: number;
    duration: number;
}) {
    return (
        <div className="relative w-full h-1 bg-zinc-800/50 cursor-pointer group">
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
            />
        </div>
    );
}

export default ProgressBar;
