import React, { useEffect, useState } from 'react';
import Header from './Header';
import ProgressBar from './ProgressBar';
import { useTrackStore } from '~/store/useTrackStore';
import TrackInfo from './TrackInfo';
import TrackControllers from './TrackControllers';

interface NowPlayingProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  progress: number;
  currentTime: string;
  duration: string;
  handleSeek: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleSkip: (direction: 'forward' | 'backward') => void
}


const NowPlaying: React.FC<NowPlayingProps> = ({ isOpen, setIsOpen, progress, currentTime, duration, handleSeek, handleSkip }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { trackDetails } = useTrackStore()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 bg-black overflow-y-auto will-change-transform transform-gpu transition-transform duration-200 ease-in-out z-50 ${isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
    >
      {/* Background Image */}
      <div
        className="fixed inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `url(${trackDetails.coverImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(10px)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto min-h-full">
        {/* Header */}
        <div className="p-4 flex items-center justify-between backdrop-blur-sm">
            <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors duration-300"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6" /></svg>
            </button>
            <button className="text-zinc-400 hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-music"><path d="M21 15V6" /><path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" /><path d="M12 12H3" /><path d="M16 6H3" /><path d="M12 18H3" /></svg>
            </button>
        </div>

        {/* Album Art and Info */}
        <div className="px-8 pt-8 -mt-10">
            <div
                className={`aspect-square w-full max-w-sm lg:max-w-[300px] lg:ml-0 mx-auto bg-zinc-800 rounded-lg mb-8 will-change-transform transition-transform duration-500 ease-out transform ${trackDetails.isPlaying ? 'scale-100' : 'scale-95'
                    }`}
            >
                <img
                    src={trackDetails.coverImageUrl || ""}
                    alt="Album art"
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>

            <div className="space-y-1 text-center lg:text-left">
                <h2 className="text-2xl md:text-3xl font-semibold transition-all duration-300">{trackDetails.title}</h2>
                <p className="text-zinc-400 transition-all duration-300">{trackDetails.artist}</p>
            </div>
        </div>

        {/* Progress Bar */}
        <div className="px-8 mt-8">
            <div className="h-1 bg-zinc-800/50 backdrop-blur-sm rounded-full overflow-hidden cursor-pointer" onClick={(e) => handleSeek(e)}>
                <div className="h-full w-1/3 bg-white/90 rounded-full transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-zinc-400">
                <span>{currentTime}</span>
                <span>{duration}</span>
            </div>
        </div>
        
        {/* Controls */}
        <TrackControllers handleSkip={handleSkip} />
      </div>
    </div>
  );
};

export default NowPlaying;