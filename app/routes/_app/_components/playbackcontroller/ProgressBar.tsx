import React from 'react';
import { Slider } from '~/components/ui/slider';
import { useTrackStore } from '~/store/useTrackStore';
import { formatDuration, formatTime } from '~/utils';

interface ProgressBarProps {
    progress: number;
    currentTime: number;
    duration: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, currentTime, duration }) => {
    const { handleSeek } = useTrackStore()
    const { trackDetails } = useTrackStore()

    return (
        <div className="relative w-full h-0.5 bg-zinc-800/50 group">
            <div className={`${trackDetails.id ? "group-hover:opacity-100" : ""} absolute top-[-20px] left-0 text-white text-xs opacity-0 transition-opacity`}>
                {formatDuration(currentTime.toString())}
            </div>
            <div className={`${trackDetails.id ? "group-hover:opacity-100" : ""} absolute top-[-20px] right-0 text-white text-xs opacity-0 transition-opacity`}>
                {formatDuration(duration.toString())}
            </div>
            <Slider
                value={[currentTime]}
                max={duration || 100}
                step={1}
                className={`w-full ${trackDetails.id ? "hover:cursor-grab active:cursor-grabbing" : ""}`}
                onValueChange={handleSeek}
                nowPlaying={false}
            />
        </div>
    );
}

export default ProgressBar;
