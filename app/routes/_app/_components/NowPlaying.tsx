import React, { useEffect, useState } from 'react';
import Header from './Header';
import ProgressBar from './ProgressBar';
import { useTrackStore } from '~/store/useTrackStore';
import TrackInfo from './TrackInfo';
import TrackControllers from './TrackControllers';
import { useLikeTrack } from '~/hooks/track';
import ProfileDropDownMenu from './ProfileDropDownMenu';
import TrackMenu from '~/components/TrackMenuDialog';

interface NowPlayingProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  progress: number;
  currentTime: string;
  duration: string;
  handleSeek: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleSkip: (direction: 'forward' | 'backward') => void;
}

const NowPlaying: React.FC<NowPlayingProps> = ({ isOpen, setIsOpen, progress, currentTime, duration, handleSeek, handleSkip }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { trackDetails, setTrackDetails } = useTrackStore()
  const { mutateAsync: likeTrack, isPending } = useLikeTrack()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    if (isOpen || isDropdownOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen, isDropdownOpen]);
  
  return (
    <>
      <div
        className={`[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] fixed inset-0 bg-black overflow-y-auto will-change-transform transform-gpu transition-transform duration-200 ease-in-out z-50 ${isOpen ? 'translate-y-0' : 'translate-y-full'
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

            {/* more icon */}
            <button className="text-zinc-400 hover:text-white transition-colors duration-300" onClick={() => setIsDropdownOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
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

            <div className="flex justify-between items-center">
              <div className="space-y-1 text-left">
                <h2 className="text-2xl md:text-3xl font-semibold transition-all duration-300">
                  {trackDetails.title}
                </h2>
                <p className="text-zinc-400 transition-all duration-300">
                  {trackDetails.artist}
                </p>
              </div>
              {/* <Heart className="w-6 h-6 text-zinc-400 hover:text-white transition-colors" /> */}

              <button
                className={`hover:text-white transition-colors duration-300 ${trackDetails.hasLiked ? "text-[#fa586a]" : "text-zinc-400"
                  }`}
                onClick={async () => {
                  await likeTrack(trackDetails.id)
                  setTrackDetails({ hasLiked: !trackDetails.hasLiked })
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={trackDetails.hasLiked ? "#fa586a" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-heart"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </button>
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
      <TrackMenu isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)} />
    </>
  );
};

export default NowPlaying;