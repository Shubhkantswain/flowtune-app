import React from 'react';

function ProgressBar({
    progress,
    handleSeek,
    currentTime,
    duration
}: {
    progress: number;
    handleSeek: (event: React.MouseEvent<HTMLDivElement>) => void;
    currentTime: string;
    duration: string;
}) {

    console.log(duration);
    
    return (
        <div className="relative w-full h-0.5 bg-[#313232] cursor-pointer group" onClick={handleSeek}>
            <div className="absolute top-[-20px] left-0 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                {currentTime}
            </div>
            <div className="absolute top-[-20px] right-0 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                {duration}
            </div>
            <div className="relative h-full bg-white" style={{ width: `${progress}%` }}>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
        </div>
    );
}

export default ProgressBar;
